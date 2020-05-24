import React from 'react';
import {useState} from 'react';
import SearchAndCartContext from './SearchAndCartContext';

const SearchAndCartContextProvider = (props) => {
  const [incomingSearchRequest, setIncomingSearchRequest] = useState(``);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const resetIncomingSearchRequest = () => {
    setIncomingSearchRequest(``)
  };

  return (
    <SearchAndCartContext.Provider value={{ 
      incomingSearchRequest,
      setIncomingSearchRequest,
      resetIncomingSearchRequest,
      cartItemsCount,
      setCartItemsCount
    }}>
      {props.children}
    </SearchAndCartContext.Provider>
  )
}

export default SearchAndCartContextProvider;