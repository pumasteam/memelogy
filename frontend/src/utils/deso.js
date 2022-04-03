import Deso from "deso-protocol";
import { isAuthenticated, login } from "./auth";

const deso = new Deso();

const createPost = async (title, img) => {
  new Promise(async (resolve, reject) => {
    try {
      const token = isAuthenticated() || login(4);

      await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          img,
          hash: token,
        }),
      });

      console.log(
        await deso.posts.submitPost({
          UpdaterPublicKeyBase58Check: token,
          BodyObj: {
            Body: title,
            ImageURLs: [img],
            VideoURLs: [],
          },
        })
      );

      resolve();
    } catch (error) {
      reject();
    }
  });
};

const getPosts = async () => {
  const request = await fetch("http://localhost:8000/");
  const posts = await request.json();

  return posts._items;
};

export { createPost, getPosts };
