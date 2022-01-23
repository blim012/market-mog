import React from "react";
import { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import WorldSelect from "./WorldSelect";
import LoadingSpinner from "./LoadingSpinner";

const SearchBar = (props) => {
  const [queryURL, setQueryURL] = useState('');
  const [world, setWorld] = useState('adamantoise');
  const url = 
    'https://xivapi.com/search?filters=ItemSearchCategory.Category>=0,IsUntradable=0&indexes=item&string=';
  
  useEffect(() => {
    document.addEventListener('click', (e) => {
      let xivItemSearchbar = document.querySelector('.xiv-item-searchbar');
      let searchResults = document.querySelector('.search-results');
      let clickedElement = e.target;

      if(searchResults && xivItemSearchbar && xivItemSearchbar.contains(clickedElement)) {
        searchResults.classList.add('search-results-show');
      } else if(searchResults) {
        searchResults.classList.remove('search-results-show');
      }
    });
  }, []);

  const createQueryUrl = (e) => {
    e.preventDefault();
    const item = e.target.item.value;
    setQueryURL(url + item);
  };

  return (
    <div className="xiv-item-searchbar">
      <form className="search-form" onSubmit={createQueryUrl}>
        <WorldSelect setWorld={setWorld} />
        <div className="search-query-wrapper">
          <input 
            className="search-form-input" 
            type="text" 
            name="item"
            autoComplete="off"
          />
          <LoadingSpinner area="search-bar-area" />
          <SearchResult queryURL={queryURL} world={world} />
        </div>
        <input 
          className="search-form-submit" 
          type="submit" 
          value="Search" 
        />
      </form>
    </div>
  );
};

export default SearchBar;
