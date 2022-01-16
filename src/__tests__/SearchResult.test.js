import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { toBeInTheDocument } from '@testing-library/jest-dom';
import axios from 'axios';
import SearchResult from '../components/SearchResult';

jest.mock('axios');
afterEach(cleanup);

it('fetches and displays the search query', async () => {
  axios.get.mockResolvedValue({
    data: { 
      Results: [
        {Icon: '', Name: 'test1', ID: 1},
        {Icon: '', Name: 'test2', ID: 2},
        {Icon: '', Name: 'test3', ID: 3}
      ]
    } 
  });

  const url = 'test/url';
  const { getByTestId } = render(<SearchResult queryURL={url} />);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(url, { "mode": "cors" });
  await waitFor(() => {
    expect(getByTestId('result-2')).toBeInTheDocument();
  });
  expect(getByTestId('search-results').childElementCount).toEqual(3);
});
