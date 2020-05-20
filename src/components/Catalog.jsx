import React from 'react';
import {useState, useRef} from 'react';
import CatalogNavBar from './CatalogNavBar';
import ShopItemsList from './ShopItemsList';
import Preloader from './Preloader'
import ApiData from '../utils/constants';
import useJsonFetch from '../utils/hooks/useJsonFetch';

const SearchField = ({onSearchConfirm}) => {
  const handleEnterPress = (evt) => {
    if(evt.keyCode === 13) {
      evt.preventDefault();
      onSearchConfirm(inputRef.current.value);
    }
  };

  const inputRef = useRef();

  return (
    <form className="catalog-search-form form-inline">
      <input
        className="form-control"
        ref={inputRef}
        placeholder="Поиск (введите запрос по цвету или названию и нажмите Enter)" 
        onKeyDown={handleEnterPress}
      >
      </input>
    </form>
  )
};

//
//
//
//
//
//
//
//
//
//
//надо вынести управление текущей линкой, включая аппендикс, отдельным useState -- тогда можно порефачить и исправить баг с дозагрузкой при поиске

const Catalog = ({showingSearchField = true}) => {
  const [categoryUrl, setCategoryUrl] = useState({base: ApiData.ITEMS, appendix: ``}); 
  const [loadingCategories, categoriesList] = useJsonFetch(ApiData.CATEGORIES);
  const [currCatId, setCurrCatId] = useState(null); 
  const [loadingItems, rawItemsData, showingLoadMore, resetRawItemsData] = useJsonFetch(categoryUrl.base, categoryUrl.appendix);
  const [offsetCount, setOffsetCount] = useState(0);

  const handleCurrCatIdSwitch = (id) => {
    resetRawItemsData();
    setCurrCatId(id);
    setOffsetCount(0);

    if(id === null) {
      setCategoryUrl({base: ApiData.ITEMS, appendix: ``});
    } else {
      setCategoryUrl({base: ApiData.ITEMS + `?categoryId=${id}`, appendix: ``})
    };
  };

  const handleLoadMore = () => {
    if(currCatId === null) {
      setCategoryUrl(({base: ApiData.ITEMS, appendix: `?offset=${6 * (offsetCount + 1)}`}));
    } else {
      setCategoryUrl(({base: `${ApiData.ITEMS}?categoryId=${currCatId}`, appendix: `&offset=${6 * (offsetCount + 1)}`}));
    }

    setOffsetCount(offsetCount + 1);
  };

  const handleSearchRequest = (searchRequest) => {
    if(searchRequest.length === 0) {
      handleCurrCatIdSwitch(currCatId);
    } else if (currCatId === null) {
      resetRawItemsData();
      setCategoryUrl(({base: ApiData.ITEMS, appendix: `?q=${searchRequest}`}));
    } else {
      resetRawItemsData();
      setCategoryUrl(({base: `${ApiData.ITEMS}?categoryId=${currCatId}`, appendix: `?q=${searchRequest}`}));
    }
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {(loadingCategories === false && rawItemsData !== null)
        ?
          <div className="text-center">
            {showingSearchField && <SearchField onSearchConfirm={handleSearchRequest}/>}
            <CatalogNavBar currCatId={currCatId} categoriesList={categoriesList} onCurrCatIdSwitch={handleCurrCatIdSwitch}/>
            <ShopItemsList rawItemsData={rawItemsData}/>
            <button
              className="btn btn-outline-primary"
              onClick={handleLoadMore}
              disabled={(loadingItems !== false || showingLoadMore === false) ? true : false}
            >
              Загрузить еще
            </button>
          </div>
        :
          <Preloader/>
      }
    </section>
  );
};

export default Catalog;



