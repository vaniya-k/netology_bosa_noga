import React from 'react';
import {useState} from 'react';
import SearchContext from './SearchContext';

const SearchContextProvider = (props) => {
  const [searchVal, setSearchVal] = useState(`белый`);

  return (
    <SearchContext.Provider value={{ 
      searchVal,
      setSearchVal
    }}>
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider;