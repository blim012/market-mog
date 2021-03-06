import React from "react";
import Credits from "./Credits";
import SearchBar from "./SearchBar";
import Logo from "./Logo";

const Home = () => {
  return (
    <main id="home">
      <header className="home-header">
        <Logo />
        <h1 className="market-mog-header">Market Mog</h1>
      </header>
      <SearchBar />
      <div className="home-welcome">
        <p>
          Pick a world and search an item to get its sales data within the past week! <br />
          Check out the prices of a slice of (not so) tasty
          <a 
            className="sample-item" 
            href="/market-mog/item/36036/balmung"
          > Archon Loaf </a>
          to try it out!
        </p>
      </div>
      <Credits />
    </main>
  );
};

export default Home;
