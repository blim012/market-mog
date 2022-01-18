import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import ItemData from "../components/ItemData";
import NotFound from "../components/NotFound";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<SearchBar />} />
        <Route exact path="/item/:itemID/:world" element={<ItemData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;