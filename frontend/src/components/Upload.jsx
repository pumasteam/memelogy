import { Widget } from "@uploadcare/react-widget";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createPost } from "../utils/deso";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (image && text) {
      toast.promise(createPost(text, image), {
        success: "Post created successfully",
        error: "Error creating post",
        loading: "Creating post...",
      });
    }
  };

  return (
    <section className="bg-pink-300 min-h-screen flex flex-col items-center justify-center p-12">
      <h1 className="font-black text-orange-600 text-6xl text-center m-2">
        Upload Your meme
      </h1>
      <p className="font-bold text-2xl text-yellow-200 text-center mb-4">
        And keep it protected on the blockchain
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
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        className="border-none rounded-full px-6 py-2 font-black text-lg"
        placeholder="Your meme's name"
      />
      <button className="button" onClick={() => handleSubmit()}>
        Submit
      </button>
      <Toaster />
    </section>
  );
};

export default Upload;
