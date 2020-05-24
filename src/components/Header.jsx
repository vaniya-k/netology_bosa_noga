import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import SearchAndCartContext from '../utils/contexts/SearchAndCartContext';
import history from '../utils/history';

const HeaderControls = ({setIncomingSearchRequest, cartItemsCount}) => {
  const [showingSearchField, setShowingSearchField] = useState(false);
  const [cartIconNumber, setCartIconNumber] = useState(0);
  const inputRef = useRef();

  useEffect(() => {
    if(localStorage.length !== cartIconNumber) {
      setCartIconNumber(localStorage.length)
    }
  },[cartItemsCount])

  const handleSearchFieldToggle = () => {
    if(inputRef.current.value === ``) {
      setShowingSearchField(!showingSearchField)
    } else {
      setIncomingSearchRequest(inputRef.current.value);
      setShowingSearchField(!showingSearchField);
      inputRef.current.value = ``;
      if(history.location.pathname !== `/catalog`) {
        history.push(`/catalog`)
      }
    }
  };

  const handleEnterPress = (evt) => {
    if(evt.keyCode === 13) {
      evt.preventDefault();
      handleSearchFieldToggle();
    }
  };

  return (
    <div>
      <div className="header-controls-pics">
        <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleSearchFieldToggle}></div>
        <div onClick={() => history.push(`/cart`)} className="header-controls-pic header-controls-cart">
          {cartIconNumber !== 0 && <div className="header-controls-cart-full">{cartIconNumber}</div>}
          <div className="header-controls-cart-menu"></div>
        </div>
      </div>

      <form data-id="search-form" className={`header-controls-search-form form-inline ${showingSearchField === false && `invisible`}`}>
        <input className="form-control" placeholder="Поиск" ref={inputRef} onKeyDown={handleEnterPress}></input>
      </form>
    </div>
  )
};

const Header = ({currLink}) => {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src="/img/header-logo.png" alt="Bosa Noga"></img>
            </Link>

            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className={`nav-item ${currLink === `/` && `active`}`}>
                  <Link className="nav-link" to="/">Главная</Link>
                </li>
                <li className={`nav-item ${currLink === `/catalog` && `active`}`}>
                  <Link className="nav-link" to="/catalog">Каталог</Link>
                </li>
                <li className={`nav-item ${currLink === `/about` && `active`}`}>
                  <Link className="nav-link" to="/about">О магазине</Link>
                </li>
                <li className={`nav-item ${currLink === `/contacts` && `active`}`}>
                  <Link className="nav-link" to="/contacts">Контакты</Link>
                </li>
              </ul>

              <SearchAndCartContext.Consumer>
                {context => (
                  <HeaderControls cartItemsCount={context.cartItemsCount} setIncomingSearchRequest={context.setIncomingSearchRequest}/>
                )}
              </SearchAndCartContext.Consumer>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
};

export default Header;
