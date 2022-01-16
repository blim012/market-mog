import React from "react";
import { useState } from "react";
import SearchResult from "./SearchResult";

/*
document.addEventListener('click', (e) => {
  let searchResults = document.querySelector('.search-results');
  let searchFormInput = document.querySelector('.search-form-input');
  let clickedElement = e.target;

  if(searchFormInput && searchFormInput.contains(clickedElement)) {
    searchResults.classList.add('search-results-open');
  } else if(searchResults && !(searchResults.contains(clickedElement))) {
    searchResults.classList.remove('search-results-open');
  }
});
*/

const SearchBar = (props) => {
  const [queryURL, setQueryURL] = useState('');
  const url = 'https://xivapi.com/search?indexes=item&string=';

  const createQueryUrl = (e) => {
    e.preventDefault();
    const item = e.target.item.value;
    setQueryURL(url + item);
  };

  return (
    <div className="xiv-item-searchbar">
      <form className="search-form" onSubmit={createQueryUrl}>
        <input className="search-form-input" type="text" name="item"></input>
        <input className="search-form-submit" type="submit" value="Search" />
      </form>
      <SearchResult queryURL={queryURL} />
    </div>
  );
};

export default SearchBar;
