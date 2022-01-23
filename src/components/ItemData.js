import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import worldIsValid from "../helpers/worldIsValid";
import ItemCharts from "./ItemCharts";
import ItemPriceTables from "./ItemPriceTables";
import ItemDescription from "./ItemDescription";
import SearchBar from "./SearchBar";
import Credits from "./Credits";
import Logo from "./Logo";

const ItemData = (props) => {
  const [itemProperties, setItemProperties] = useState(null);
  const [error, setError] = useState(null);
  const { itemID, world } = useParams();
  const itemInfoURL = `https://xivapi.com/Item/${itemID}`;

  useEffect(() => {
    if(worldIsValid(world)) {
      axios.get(itemInfoURL)
      .then((response) => {
        const properties = response.data; 
        setItemProperties({
          canBeHq: properties.CanBeHq,
          stackSize: properties.StackSize,
          name: properties.Name,
          description: properties.Description.split('<span')[0],
          imageURL: properties.IconHD
        });
      })
      .catch((error) => {
        setError(error.response.data.Message);
      });
    } else {
      setError('Invalid World');
    }
  }, []);

  return (
    <>
      {
        error ?
          <div className="error">
            <Logo />
            <p>Oops! Something went wrong. <br /></p>
            <p className="error-message">Error message: {error}</p>
          </div>

        :
          <div id="item-data" data-testid="item-data">
            {
              itemProperties ?
                <>
                  <div className="search-bar-logo-wrapper">
                    <Logo />
                    <SearchBar />
                  </div>
                  <header id="item-data-header">
                    <h1>Sales Data for {itemProperties.name} in <span className="world-name">{world}</span></h1>
                  </header>
                  <ItemDescription 
                    itemProperties={itemProperties} 
                  />
                  <ItemCharts 
                    world={world} 
                    itemID={itemID} 
                    itemProperties={itemProperties} 
                  />
                  <ItemPriceTables
                    world={world}
                    itemID={itemID} 
                    itemProperties={itemProperties}
                  />
                </>
              :
                <div className="status">
                  <div className="loader"></div>
                </div>
            }
          </div>
      }
      <Credits />
    </>
  );
};

export default ItemData;
