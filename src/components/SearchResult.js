import React from "react";
import { useEffect, useState } from "react";
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import uniqid from 'uniqid';

const SearchResult = (props) => {
  const [data, setData] = useState([]);
  const url = props.queryURL;

  useEffect(() => {
    if(url !== '') {
      console.log('fetching...');
      console.log('queryURL: ' + url);
      trackPromise(
        axios.get(url, { mode: 'cors' })
        .then((response) => {
          setData(response.data.Results);
        })
        .catch((error) => {
          console.log('something went wrong');
        })
      , 'search-bar-area');
    }
  }, [url]);

  return (
    <ul className="search-results" data-testid="search-results">
    { 
      data.map((result, idx) => {
        return (
          <li key={uniqid('result-')} data-testid={`result-${idx}`}>
            <p>{result.Name}</p>
          </li>
        );
      })
    }
    </ul>
  );
};

export default SearchResult;
