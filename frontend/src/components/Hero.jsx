import React, { useState } from "react";
import logo from "../assets/logo.png";
import { isAuthenticated, login, logout } from "../utils/auth";
import { Link } from "wouter";

const Hero = () => {
  const [auth, setAuth] = useState(isAuthenticated());

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleAuth = async (accessLevel, isLogin) => {
    isLogin ? login(accessLevel) : logout();
    await sleep(5000);
    setAuth(isAuthenticated());
  };

  return (
    <section className="bg-yellow-200 flex flex-col items-center justify-center p-12">
      <img src={logo} className="h-96 object-cover" alt="Memelogy logo" />
      <h1 className="font-black text-orange-600 text-6xl text-center m-2">
        MEMELOGY
      </h1>
      <p className="font-bold text-2xl text-green-600 text-center">
        If memes are an art, why don't we know their creators?
      </p>
      {!auth && (
        <button className="button m-6" onClick={() => handleAuth(4, true)}>
          Log In
        </button>
      )}
      {auth && (
        <article className="flex items-center justify-evenly">
          <Link href="/upload">
            <button className="button">Upload your meme</button>
          </Link>
          <Link href="/search">
            <button className="button">Search a meme</button>
          </Link>
          <button onClick={() => handleAuth(4, false)} className="button">
            Log Out
          </button>
        </article>
      )}
    </section>
  );
};

export default Hero;
