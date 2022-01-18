import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SalesHistoryChart from "./SaleHistoryChart";
import PricePerUnit from "./PricePerUnitChart";
import secondsToDate from "../helpers/secondsToDate";
import axios from "axios";

const ItemData = (props) => {
  const [itemData, setItemData] = useState(null);
  const [itemProperties, setItemProperties] = useState(null);
  const { itemID, world } = useParams();
  const itemMarketURL = `https://universalis.app/api/history/${world}/${itemID}?entries=500&statsWithin=604800000&entriesWithin=604800`;
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

  useEffect(() => {
    if(itemProperties) {
      axios.get(itemMarketURL)
      .then((response) => {
        console.log('Response obtained');
        parseData(response.data);
      })
      .catch((error) => {
        console.log('something went wrong: ' + error);
      });
    }
  }, [itemProperties]);

  const parseData = (data) => {
    const nqHistory = { labels: [], quantitySold: [], pricePerQuantity: [] };
    const hqHistory = { labels: [], quantitySold: [], pricePerQuantity: [] };
    const nqHistoryPPU = { labels: [], pricePerUnit: [] };
    const hqHistoryPPU = { labels: [], pricePerUnit: [] };

    data.entries.forEach((entry) => {
      const date = secondsToDate(entry.timestamp);
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
          <section id="sales-charts" data-testid="sales-charts">
            <div id="nq-sales">
              {
                itemProperties.stackSize > 1 &&
                  <div className="sales-history-chart" data-testid="nq-sales-history">
                    <SalesHistoryChart data={itemData.nqHistory} />
                  </div>
              }
              <div className="price-per-unit-chart" data-testid="nq-ppu-history">
                <PricePerUnit data={itemData.nqHistoryPPU} />
              </div>
            </div>
            {
              itemProperties.canBeHq &&
                <div id="hq-sales">
                  {
                    itemProperties.stackSize > 1 &&
                      <div className="sales-history-chart" data-testid="hq-sales-history">
                        <SalesHistoryChart data={itemData.hqHistory} />
                      </div>
                  }
                  <div className="price-per-unit-chart" data-testid="hq-ppu-history">
                    <PricePerUnit data={itemData.hqHistoryPPU} />
                  </div>
                </div>
            }
          </section>
        :
          <div>Loading...</div>
      }
    </div>
  )
};

export default ItemData;
