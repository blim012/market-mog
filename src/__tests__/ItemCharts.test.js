import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { toBeInTheDocument } from '@testing-library/jest-dom';
import axios from 'axios';
import ItemCharts from '../components/ItemCharts';

jest.mock('axios');

describe('fetching and loading item data into graphs', () => {
  afterEach(cleanup);

  it('fetches and displays the item sale data when item is hq-able and stackable', async () => {
    axios.get.mockResolvedValue({
      data: { 
        entries: [
          {
            quantity: 5,
            pricePerUnit: 1234,
            timestamp: 1642447903
          },
          {
            quantity: 93,
            pricePerUnit: 222,
            timestamp: 1642447800
          },
          {
            quantity: 34,
            pricePerUnit: 1,
            timestamp: 1642447111
          },
        ]
      }
    });
  
    const itemProperties = { canBeHq: 1, stackSize: 99 };
    const { queryByTestId } = render(
      <ItemCharts 
        world="faerie"
        itemID="4815"
        itemProperties={itemProperties} 
      />
    );
    await waitFor(() => {
      expect(queryByTestId('sales-charts')).toBeInTheDocument();
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(queryByTestId('nq-sales-history')).toBeInTheDocument();
    expect(queryByTestId('hq-sales-history')).toBeInTheDocument();
    expect(queryByTestId('nq-ppu-history')).toBeInTheDocument();
    expect(queryByTestId('hq-ppu-history')).toBeInTheDocument();
  });

  it('fetches and displays the item sale data when item is hq-able but not stackable', async () => {
    axios.get.mockResolvedValue({
      data: { 
        entries: [
          {
            quantity: 5,
            pricePerUnit: 1234,
            timestamp: 1642447903
          },
          {
            quantity: 93,
            pricePerUnit: 222,
            timestamp: 1642447800
          },
          {
            quantity: 34,
            pricePerUnit: 1,
            timestamp: 1642447111
          },
        ]
      }
    });
  
    const itemProperties = { canBeHq: 1, stackSize: 1 };
    const { queryByTestId } = render(
      <ItemCharts 
        world="faerie"
        itemID="4815"
        itemProperties={itemProperties} 
      />
    );
    await waitFor(() => {
      expect(queryByTestId('sales-charts')).toBeInTheDocument();
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(queryByTestId('nq-sales-history')).toBeNull();
    expect(queryByTestId('hq-sales-history')).toBeNull();
    expect(queryByTestId('nq-ppu-history')).toBeInTheDocument();
    expect(queryByTestId('hq-ppu-history')).toBeInTheDocument();
  });

  it('fetches and displays the item sale data when item is not hq-able and stackable', async () => {
    axios.get.mockResolvedValue({
      data: { 
        entries: [
          {
            quantity: 5,
            pricePerUnit: 1234,
            timestamp: 1642447903
          },
          {
            quantity: 93,
            pricePerUnit: 222,
            timestamp: 1642447800
          },
          {
            quantity: 34,
            pricePerUnit: 1,
            timestamp: 1642447111
          },
        ]
      }
    });
  
    const itemProperties = { canBeHq: 0, stackSize: 99 };
    const { queryByTestId } = render(
      <ItemCharts 
        world="faerie"
        itemID="4815"
        itemProperties={itemProperties} 
      />
    );
    await waitFor(() => {
      expect(queryByTestId('sales-charts')).toBeInTheDocument();
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(queryByTestId('nq-sales-history')).toBeInTheDocument();
    expect(queryByTestId('hq-sales-history')).toBeNull();
    expect(queryByTestId('nq-ppu-history')).toBeInTheDocument();
    expect(queryByTestId('hq-ppu-history')).toBeNull();
  });

  it('fetches and displays the item sale data when item is not hq-able and not stackable', async () => {
    axios.get.mockResolvedValue({
      data: { 
        entries: [
          {
            quantity: 5,
            pricePerUnit: 1234,
            timestamp: 1642447903
          },
          {
            quantity: 93,
            pricePerUnit: 222,
            timestamp: 1642447800
          },
          {
            quantity: 34,
            pricePerUnit: 1,
            timestamp: 1642447111
          },
        ]
      }
    });
  
    const itemProperties = { canBeHq: 0, stackSize: 1 };
    const { queryByTestId } = render(
      <ItemCharts 
        world="faerie"
        itemID="4815"
        itemProperties={itemProperties} 
      />
    );
    await waitFor(() => {
      expect(queryByTestId('sales-charts')).toBeInTheDocument();
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(queryByTestId('nq-sales-history')).toBeNull();
    expect(queryByTestId('hq-sales-history')).toBeNull();
    expect(queryByTestId('nq-ppu-history')).toBeInTheDocument();
    expect(queryByTestId('hq-ppu-history')).toBeNull();
  });
});
