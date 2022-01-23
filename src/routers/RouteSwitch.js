import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../components/Home";
import ItemData from "../components/ItemData";
import NotFound from "../components/NotFound";

const RouteSwitch = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route exact path="/item/:itemID/:world" element={<ItemData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
