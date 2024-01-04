import React from 'react';

const CharacterSearch = ({ onSearch, onSearchButtonClick }) => (
  <div>
    <label htmlFor="search">Search Characters:</label>
    <input
      type="text"
      id="search"
      placeholder="Enter character name"
      onChange={(e) => onSearch(e.target.value)}
    />
    <button onClick={onSearchButtonClick}>Search</button>
  </div>
);

export default CharacterSearch;