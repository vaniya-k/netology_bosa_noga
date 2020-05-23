import React from 'react';
import {useState} from 'react';
import SearchContext from './SearchContext';

const SearchContextProvider = (props) => {
  const [searchVal, setSearchVal] = useState(``);

  const resetSearchVal = () => {
    setSearchVal(``)
  } 

  return (
    <SearchContext.Provider value={{ 
      searchVal,
      setSearchVal,
      resetSearchVal
    }}>
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider;