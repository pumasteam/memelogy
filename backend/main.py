from dotenv import dotenv_values
from urllib.request import urlopen
from deta import Deta
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from pydantic import BaseModel
import uvicorn
import cv2
from sewar.full_ref import rmse

deta_key = dotenv_values(".env")["DETA_KEY"]
deta_base = dotenv_values(".env")["DETA_BASE"]

deta = Deta(deta_key)

db = deta.Base(deta_base)

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Meme(BaseModel):
    title: str
    img: str
    hash: str


class MemeToSearch(BaseModel):
    image: str


@app.post("/search")
async def search(meme: MemeToSearch):
    items = db.fetch()

    img = urlopen(meme.image)
    arr = np.asarray(bytearray(img.read()), dtype=np.uint8)
    source = cv2.imdecode(arr, cv2.IMREAD_COLOR)

    scale_percent = 100
    width = int(source.shape[1] * scale_percent / 100)
    height = int(source.shape[0] * scale_percent / 100)
    dim = (width, height)

    for i in items._items:
        try:
            img = urlopen(i["img"])
            arr = np.asarray(bytearray(img.read()), dtype=np.uint8)
            un_target = cv2.imdecode(arr, cv2.IMREAD_COLOR)
            target = cv2.resize(un_target, dim, interpolation=cv2.INTER_AREA)

            score = rmse(source, target)
            i["score"] = score
        except:
            i["score"] = 100

    return items._items


@app.get("/")
def get_memes():
    return db.fetch()


@app.get("/{key}")
def get_meme(key: str):
    meme = db.fetch(key)
    if meme:
        return meme._items[0]
    else:
        raise HTTPException(status_code=404, detail="Meme not found")


@app.post("/")
def create_meme(meme: Meme):
    return db.put({
        "title": meme.title,
        "img": meme.img,
        "hash": meme.hash
    })


@app.delete("/{key}")
def delete_meme(key: str):
    return db.delete(key)


@app.put("/{key}")
def update_meme(key: str, meme: Meme):
    return db.update(meme, key)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
