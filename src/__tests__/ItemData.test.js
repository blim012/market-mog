import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { Router, Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import axios from 'axios';
import ItemData from '../components/ItemData';

jest.mock('axios');
afterEach(cleanup);

function renderWithRouterMatch({
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  }) {
  return {
    ...render(
      <Router history={history} location={history.location}>
        <Routes>
          <Route path={path} element={<ItemData />} />
        </Routes>
      </Router>
    )
  };
}

it('fetches item property data', async () => {
  axios.get.mockResolvedValue({
    data: { 
      CanBeHq: 1,
      StackSize: 99,
      Name: 'test',
      Description: 'desc',
      imageURL: ''
    }
  });

  const { queryByTestId } = renderWithRouterMatch({
    path: '/item/:itemID/:world',
    route: '/item/4815/faerie'
  });
  await waitFor(() => {
    expect(queryByTestId('item-data')).toBeInTheDocument();
  });
});
