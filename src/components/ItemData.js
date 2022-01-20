import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemCharts from "./ItemCharts";
import ItemPriceTables from "./ItemPriceTables";

const ItemData = (props) => {
  const [itemProperties, setItemProperties] = useState(null);
  const { itemID, world } = useParams();
  const itemInfoURL = `https://xivapi.com/Item/${itemID}`;

  useEffect(() => {
    axios.get(itemInfoURL)
    .then((response) => {
      const properties = response.data; 
      setItemProperties({
        canBeHq: properties.CanBeHq,
        stackSize: properties.StackSize
      });
    })
    .catch((error) => {
      console.log('something went wrong: ' + error);
    });
  }, []);

  return (
    <div id="item-data" data-testid="item-data">
      {
        itemProperties ?
          <>
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
          <div className="loading">Loading...</div>
      }
    </div>
  );
};

export default ItemData;
