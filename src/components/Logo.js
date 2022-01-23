import React from "react";
import LogoImage from "../assets/logo512.png";

const Logo = () => {
  return (
    <a href="/market-mog">
      <img 
        className="market-mog-logo" 
        src={LogoImage} 
        alt="Market Mog Logo" 
      />
    </a>
  );
};

export default Logo;
