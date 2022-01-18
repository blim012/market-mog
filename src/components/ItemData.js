import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SalesHistoryChart from "./SaleHistoryChart";
import PricePerUnit from "./PricePerUnitChart";
import axios from "axios";

const convertSecondsToDate = (seconds) => {
  let date = new Date(null);
  date.setTime(seconds * 1000);
  return date.toLocaleString();
};

const ItemData = (props) => {
  const [itemData, setItemData] = useState(null);
  const { itemID, world } = useParams();
  const url = `https://universalis.app/api/history/${world}/${itemID}?entries=500&statsWithin=604800000&entriesWithin=604800`;

  useEffect(() => {
    axios.get(url)
    .then((response) => {
      parseData(response.data);
    })
    .catch((error) => {
      console.log('something went wrong: ' + error);
    });
  }, []);

  const parseData = (data) => {
    const nqHistory = { labels: [], quantitySold: [], pricePerQuantity: [] };
    const hqHistory = { labels: [], quantitySold: [], pricePerQuantity: [] };
    const nqHistoryPPU = { labels: [], pricePerUnit: [] };
    const hqHistoryPPU = { labels: [], pricePerUnit: [] };
  
    data.entries.forEach((entry) => {
      const date = convertSecondsToDate(entry.timestamp);
      if(entry.hq) {
        hqHistory.labels.push(date);
        hqHistory.quantitySold.push(entry.quantity);
        hqHistory.pricePerQuantity.push(entry.pricePerUnit);
        hqHistoryPPU.labels.push(date);
        hqHistoryPPU.pricePerUnit.push(entry.pricePerUnit / entry.quantity);
      }
      else {
        nqHistory.labels.push(date);
        nqHistory.quantitySold.push(entry.quantity);
        nqHistory.pricePerQuantity.push(entry.pricePerUnit);
        nqHistoryPPU.labels.push(date);
        nqHistoryPPU.pricePerUnit.push(entry.pricePerUnit / entry.quantity);
      }
    });
  
    setItemData({
      nqHistory, hqHistory, nqHistoryPPU, hqHistoryPPU
    });
  };

  return (
    <div id="item-data">
      {
        itemData ?
          <>
            <div>
              <SalesHistoryChart data={itemData.nqHistory} />
            </div>
            <div>
              <SalesHistoryChart data={itemData.hqHistory} />
            </div>
            <div>
              <PricePerUnit data={itemData.nqHistoryPPU} />
            </div>
            <div>
              <PricePerUnit data={itemData.hqHistoryPPU} />
            </div>
          </>
        :
          <div>Loading...</div>
      }
    </div>
  )
};

export default ItemData;
