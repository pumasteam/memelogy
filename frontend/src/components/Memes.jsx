import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Memes = () => {
  const { data } = useSWR("http://localhost:8000/", fetcher);

  return (
    <section className="bg-orange-600 flex flex-col items-center justify-center p-12">
      <h1 className="font-black text-yellow-200 text-6xl text-center m-2">
        🔥 Hottest memes 🔥
      </h1>
      <p className="font-bold text-2xl text-blue-600 text-center mb-4">
        The web's freshest memes in one place
      </p>
      {data && (
        <section className="flex items-center justify-around flex-wrap">
          {data._items.map((meme, key) => (
            <article key={key} className="m-2 flex flex-col items-center justify-center">
              <img src={meme.img} alt={meme.title} className="max-h-64" />
              <h3 className="font-bold text-3xl m-2">{meme.title}</h3>
              <p className="font-thin text-sm">{meme.hash}</p>
            </article>
          ))}
        </section>
      )}
    </section>
  );
};

export default Memes;
