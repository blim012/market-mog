import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SalesHistoryChart from "./SaleHistoryChart";
import PricePerUnit from "./PricePerUnitChart";
import secondsToDate from "../helpers/secondsToDate";

const ItemCharts = (props) => {
  const { world, itemID, itemProperties } = props;
  const [itemHistory, setItemHistory] = useState(null);
  const itemHistoryURL = `https://universalis.app/api/history/${world}/${itemID}?entries=500&statsWithin=604800000&entriesWithin=604800`;

  useEffect(() => {
    if(itemProperties) {
      axios.get(itemHistoryURL)
      .then((response) => {
        console.log('Response obtained');
        console.log(response);
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
    const reversedEntries = data.entries.reverse(); // Reverse to order it chronologically

    reversedEntries.forEach((entry) => {
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
  
    setItemHistory({
      nqHistory, hqHistory, nqHistoryPPU, hqHistoryPPU
    });
  };

  return (
    <section id="item-charts">
      {
        itemHistory ?
          <div id="sales-charts" data-testid="sales-charts">
            <div id="nq-sales">
              {
                itemProperties.stackSize > 1 &&
                  <div className="sales-history-chart" data-testid="nq-sales-history">
                    <SalesHistoryChart data={itemHistory.nqHistory} />
                  </div>
              }
              <div className="price-per-unit-chart" data-testid="nq-ppu-history">
                <PricePerUnit data={itemHistory.nqHistoryPPU} />
              </div>
            </div>
            {
              itemProperties.canBeHq &&
                <div id="hq-sales">
                  {
                    itemProperties.stackSize > 1 &&
                      <div className="sales-history-chart" data-testid="hq-sales-history">
                        <SalesHistoryChart data={itemHistory.hqHistory} />
                      </div>
                  }
                  <div className="price-per-unit-chart" data-testid="hq-ppu-history">
                    <PricePerUnit data={itemHistory.hqHistoryPPU} />
                  </div>
                </div>
            }
          </div>
        :
          <div>Loading...</div>
      }
    </section>
  );
};

export default ItemCharts;
