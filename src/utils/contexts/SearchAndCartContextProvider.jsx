import React from 'react';
import {useState} from 'react';
import SearchAndCartContext from './SearchAndCartContext';

const SearchAndCartContextProvider = (props) => {
  const [incomingSearchRequest, setIncomingSearchRequest] = useState(``);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const resetIncomingSearchRequest = () => {
    setIncomingSearchRequest(``)
  };

  const resetCartItemsCount = () => {
    setCartItemsCount(0);
  };

  const increaseCartItemsCount = () => {
    setCartItemsCount(cartItemsCount + 1);
  }

  const decreaseCartItemsCount = () => {
    setCartItemsCount(cartItemsCount - 1);
  }

  return (
    <SearchAndCartContext.Provider value={{ 
      incomingSearchRequest,
      setIncomingSearchRequest,
      resetIncomingSearchRequest,
      cartItemsCount,
      setCartItemsCount,
      increaseCartItemsCount,
      decreaseCartItemsCount,
      resetCartItemsCount
    }}>
      {props.children}
    </SearchAndCartContext.Provider>
  )
}

export default SearchAndCartContextProvider;