import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { toBeInTheDocument } from '@testing-library/jest-dom';
import axios from 'axios';
import ItemData from '../components/ItemData';

jest.mock('axios');
afterEach(cleanup);

it('fetches item property data', async () => {
  axios.get.mockResolvedValue({
    data: { 
      CanBeHq: 1,
      StackSize: 99
    }
  });

  const { queryByTestId } = render(<ItemData />);
  await waitFor(() => {
    expect(queryByTestId('item-data')).toBeInTheDocument();
  });
});
