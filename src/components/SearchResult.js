import React from "react";
import { useEffect, useState } from "react";
import { trackPromise } from 'react-promise-tracker';
import axios from "axios";
import uniqid from 'uniqid';

const SearchResult = (props) => {
  const [data, setData] = useState(null);
  const world = props.world;
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
    <>
      {
        data ?
          <ul 
          className="search-results search-results-show" 
          data-testid="search-results"
          >
            { 
              data.length > 0 ?
                data.map((result, idx) => {
                  return (
                    <li 
                      key={uniqid('result-')} 
                      data-testid={`result-${idx}`}
                      className="result"
                    >
                      <a href={`/item/${result.ID}/${world}`}>
                        <p>{result.Name}</p>
                      </a>
                    </li>
                  );
                })
              :
                <li 
                  key={uniqid('result-')}
                  className="result empty-result"
                >
                  <p>Nothing Found!</p>
                </li>
            }
          </ul>
        :
          null
      }
    </>
  );
};

export default SearchResult;
