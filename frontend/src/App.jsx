import React from "react";
import { Route } from "wouter";
import Hero from "./components/Hero";
import Memes from "./components/Memes";
import Upload from "./components/Upload";
import Search from "./components/Search";

const App = () => {
  return (
    <>
      <Route path="/">
        <Hero />
        <Memes />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
    </>
  );
};

export default App;
