import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import uniqid from 'uniqid';
import secondsToDate from "../helpers/secondsToDate";

const ItemPriceTables = (props) => {
  const [itemPriceData, setItemPriceData] = useState(null);
  const { world, itemID, itemProperties } = props;
  const itemPricesURL = `https://universalis.app/api/${world}/${itemID}?entries=10&statsWithin=604800000&entriesWithin=604800`;

  useEffect(() => {
    axios.get(itemPricesURL)
    .then((response) => {
      parseData(response.data);
    })
    .catch((error) => {
      console.log('something went wrong: ' + error);
    });
  }, []);

  const parseData = (data) => {
    const listingData = [];
    const recentHistory = [];
    let nqAverage = data.currentAveragePriceNQ;
    let hqAverage = data.currentAveragePriceHQ;
    console.log(nqAverage);
    console.log(hqAverage);

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
    const diff = (((price - average) / average) * 100).toFixed(2);
    const sign = (diff >= 0 ? '+' : '');
    return `${sign}${diff}%`;
  };

  return (
    <section id="item-tables">
      {
        itemPriceData ?
          <>
            <table id="item-listings" data-testid="item-listings">
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
                    return (
                      <tr key={uniqid('listing-')} data-testid={`listing-${idx + 1}`}>
                        <td>{idx + 1}</td>
                        <td>{listing.isHq}</td>
                        <td>{listing.price}</td>
                        <td>{listing.quantity}</td>
                        <td>{listing.totalPrice}</td>
                        <td>{listing.diff}</td>
                        <td>{listing.retainer}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <table id="item-recent-history" data-testid="item-recent-history">
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
                    return (
                      <tr key={uniqid('soldListing-')} data-testid={`sold-listing-${idx + 1}`}>
                        <td>{idx + 1}</td>
                        <td>{soldListing.isHq}</td>
                        <td>{soldListing.price}</td>
                        <td>{soldListing.quantity}</td>
                        <td>{soldListing.total}</td>
                        <td>{soldListing.diff}</td>
                        <td>{soldListing.buyer}</td>
                        <td>{soldListing.timestamp}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </>
        :
          <div className="loading">Loading...</div>
      }
    </section>
  );
};

export default ItemPriceTables;
