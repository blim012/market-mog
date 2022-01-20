import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { toBeInTheDocument } from '@testing-library/jest-dom';
import axios from 'axios';
import ItemPriceTables from '../components/ItemPriceTables';

jest.mock('axios');
afterEach(cleanup);

it('fetches item prices and displays them', async () => {
  axios.get.mockResolvedValue({
    data: { 
      currentAveragePriceNQ: 200,
      currentAveragePriceNQ: 1000,
      listings: [
        {
          pricePerUnit: 1,
          quantity: 2,
          total: 2,
          hq: false,
          retainer: 'bob'
        },
        {
          pricePerUnit: 10,
          quantity: 5,
          total: 50,
          hq: true,
          retainer: 'asdf'
        }
      ],
      recentHistory: [
        {
          pricePerUnit: 3,
          quantity: 3,
          total: 9,
          hq: false,
          buyer: 'zxcv',
          timestamp: 1642648473
        },
        {
          pricePerUnit: 4,
          quantity: 4,
          total: 16,
          hq: true,
          buyer: 'qwe',
          timestamp: 1642648222
        },
        {
          pricePerUnit: 5,
          quantity: 6,
          total: 30,
          hq: false,
          buyer: 'zxcv',
          timestamp: 1642648111
        }
      ]
    }
  });


  const { queryByTestId } = render(<ItemPriceTables />);
  await waitFor(() => {
    expect(queryByTestId('item-listings')).toBeInTheDocument();
    expect(queryByTestId('item-recent-history')).toBeInTheDocument();
  });
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(queryByTestId('listing-2')).toBeInTheDocument();
  expect(queryByTestId('sold-listing-3')).toBeInTheDocument();
});
