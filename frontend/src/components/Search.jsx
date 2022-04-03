import { Widget } from "@uploadcare/react-widget";
import React, { useState } from "react";

const Search = () => {
  const [image, setImage] = useState(null);
  const [hasResult, setHasResult] = useState(false);
  const [result, setResult] = useState({});

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
      }),
    });

    const data = await res.json();

    data.sort((a, b) => b.score - a.score);
    data.reverse();

    setResult(data[0]);

    setHasResult(true);
  };

  return (
    <>
      {!hasResult && (
        <section className="bg-blue-200 min-h-screen flex flex-col items-center justify-center p-12">
          <h1 className="font-black text-yellow-600 text-6xl text-center m-2">
            Search your meme
          </h1>
          <p className="font-bold text-2xl text-green-600 text-center mb-4">
            We have an extense list of memes to search
          </p>
          {!image && (
            <Widget
              publicKey="624de14caf2cf3c7f75c"
              tabs="file"
              previewStep="true"
              onChange={(e) => setImage(e.cdnUrl)}
            />
          )}
          {image && (
            <img src={image} alt="Uploaded meme" className="max-h-80 m-4" />
          )}
          <button className="button" onClick={() => handleSubmit()}>
            Submit
          </button>
        </section>
      )}
      {hasResult && (
        <section className="bg-blue-200 min-h-screen flex flex-col items-center justify-center p-12">
          <h1 className="font-black text-yellow-600 text-6xl text-center m-2">
            We have an result!
          </h1>
          <p className="font-bold text-2xl text-green-600 text-center mb-4">
            {`${result.title} by ${result.hash}`}
          </p>
          <img src={result.img} alt="Uploaded meme" className="max-h-80 m-4" />
        </section>
      )}
    </>
  );
};

export default Search;
