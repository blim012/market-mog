import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SalesHistoryChart from "./SaleHistoryChart";
import PricePerUnit from "./PricePerUnitChart";
import secondsToDate from "../helpers/secondsToDate";

const ItemCharts = (props) => {
  const { world, itemID, itemProperties } = props;
  const [itemHistory, setItemHistory] = useState(null);
  const [error, setError] = useState(false);
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
        setError(true);
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
                  <div className="chart sales-history-chart" data-testid="nq-sales-history">
                    <h2 className="chart-title">NQ Sale History <span>within 7 days</span></h2>
                    <SalesHistoryChart data={itemHistory.nqHistory} />
                  </div>
              }
              <div className="chart price-per-unit-chart" data-testid="nq-ppu-history">
                <h2 className="chart-title">NQ Price-Per-Unit Sale History <span>within 7 days</span></h2>
                <PricePerUnit data={itemHistory.nqHistoryPPU} />
              </div>
            </div>
            {
              itemProperties.canBeHq ?
                <div id="hq-sales">
                  {
                    itemProperties.stackSize > 1 &&
                      <div className="chart sales-history-chart" data-testid="hq-sales-history">
                        <h2 className="chart-title">HQ Sale History <span>within 7 days</span></h2>
                        <SalesHistoryChart data={itemHistory.hqHistory} />
                      </div>
                  }
                  <div className="chart price-per-unit-chart" data-testid="hq-ppu-history">
                    <h2 className="chart-title">HQ Price-Per-Unit Sale History <span>within 7 days</span></h2>
                    <PricePerUnit data={itemHistory.hqHistoryPPU} />
                  </div>
                </div>
              :
                  null
            }
          </div>
        :
          <div className="status">
            {
              error ?
                <p className="error-message">Error: Could not obtain sales data</p>
              :
                <div className="loader"></div>
            }
          </div>
      }
    </section>
  );
};

export default ItemCharts;
