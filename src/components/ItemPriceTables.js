import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import secondsToDate from "../helpers/secondsToDate";

const ItemPriceTables = (props) => {
  const [itemPriceData, setItemPriceData] = useState(null);
  const [error, setError] = useState(false);
  const { world, itemID, itemProperties } = props;
  const itemPricesURL = `https://universalis.app/api/${world}/${itemID}?entries=10&statsWithin=604800000&entriesWithin=604800`;

  useEffect(() => {
    axios.get(itemPricesURL)
    .then((response) => {
      parseData(response.data);
    })
    .catch((error) => {
      setError(true);
    });
  }, []);

  const parseData = (data) => {
    const listingData = [];
    const recentHistory = [];
    let nqAverage = data.averagePriceNQ;
    let hqAverage = data.averagePriceHQ;

    data.listings.forEach((listing) => {
      let price = listing.pricePerUnit;
      let isHq = listing.hq;
      let average = (isHq ? hqAverage : nqAverage);
      let formattedDiff = getDiffFromAverage(price, average);
      listingData.push({
        price: price,
        quantity: listing.quantity,
        totalPrice: listing.total,
        diff: formattedDiff,
        isHq: isHq,
        retainer: listing.retainerName
      });
    });

    data.recentHistory.forEach((soldListing) => {
      let timestamp = secondsToDate(soldListing.timestamp);
      let price = soldListing.pricePerUnit;
      let isHq = soldListing.hq;
      let average = (isHq ? hqAverage : nqAverage);
      let formattedDiff = getDiffFromAverage(price, average);
      recentHistory.push({
        price: price,
        quantity: soldListing.quantity,
        totalPrice: soldListing.total,
        diff: formattedDiff,
        isHq: isHq,
        buyer: soldListing.buyerName,
        timestamp: timestamp
      });
    });

    setItemPriceData({ listingData, recentHistory, nqAverage, hqAverage });
  };

  // Get percentage difference of a listed price from an average
  // Returns a string formatted to the positive or negative percentage difference
  const getDiffFromAverage = (price, average) => {
    if(average === 0) return '+0%';
    const diff = (((price - average) / average) * 100).toFixed(2);
    const sign = (diff >= 0 ? '+' : '');
    return `${sign}${diff}%`;
  };

  return (
    <section id="item-price-tables">
      {
        itemPriceData ?
          <>
            <div id="weekly-averages">
              <p>{`NQ Weekly Sale Average: ${Math.round(itemPriceData.nqAverage)} gil`}</p>
              {
                itemProperties.canBeHq ? 
                  <p>{`HQ Weekly Sale Average: ${Math.round(itemPriceData.hqAverage)} gil`}</p>
                :
                  null
              }
            </div>
            <div id="recent-item-tables">
              <div id="item-listings" data-testid="item-listings">
                <h2>Current Listing Prices</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Listing</th>
                      <th>HQ</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>%Diff</th>
                      <th>Retainer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      itemPriceData.listingData.map((listing, idx) => {
                        const hqClass = (listing.isHq ? 'green-text' : 'red-text');
                        const hqCell = (listing.isHq ? 'Yes' : 'No');
                        const diffClass = 
                          (parseFloat(listing.diff) <= 0.0 ? 'green-text' : 'red-text');

                        return (
                          <tr
                            className="item-row"
                            key={uniqid('listing-')} 
                            data-testid={`listing-${idx + 1}`}
                          >
                            <td>{idx + 1}</td>
                            <td className={hqClass}>{hqCell}</td>
                            <td>{listing.price}</td>
                            <td>{listing.quantity}</td>
                            <td>{listing.totalPrice}</td>
                            <td className={diffClass}>{listing.diff}</td>
                            <td>{listing.retainer}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div id="item-recent-history" data-testid="item-recent-history">
                <h2>Recently Sold History</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Listing</th>
                      <th>HQ</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>%Diff</th>
                      <th>Buyer</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      itemPriceData.recentHistory.map((soldListing, idx) => {
                        const hqClass = (soldListing.isHq ? 'green-text' : 'red-text');
                        const hqCell = (soldListing.isHq ? 'Yes' : 'No');
                        const diffClass = 
                          (parseFloat(soldListing.diff) <= 0.0 ? 'green-text' : 'red-text');

                        return (
                          <tr
                            className="item-row"
                            key={uniqid('soldListing-')}
                            data-testid={`sold-listing-${idx + 1}`}
                          >
                            <td>{idx + 1}</td>
                            <td className={hqClass}>{hqCell}</td>
                            <td>{soldListing.price}</td>
                            <td>{soldListing.quantity}</td>
                            <td>{soldListing.totalPrice}</td>
                            <td className={diffClass}>{soldListing.diff}</td>
                            <td>{soldListing.buyer}</td>
                            <td>{soldListing.timestamp}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </>
        :
          <div className="status">
            {
              error ?
                <p className="error-message">Error: Could not obtain listing data</p>
              :
                <div className="loader"></div>
            }
          </div>
      }
    </section>
  );
};

export default ItemPriceTables;
