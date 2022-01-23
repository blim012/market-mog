import React from "react";
import LogoImage from "../assets/logo512.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img 
        className="market-mog-logo" 
        src={LogoImage} 
        alt="Market Mog Logo" 
      />
    </Link>
  );
};

export default Logo;
