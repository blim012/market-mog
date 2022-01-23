import React from "react";
import Logo from "./Logo";

const NotFound = () => {
  return (
    <div className="status">
      <Logo />
      <p className="error-message">Page Not Found!</p>
    </div>
  );
};

export default NotFound;
