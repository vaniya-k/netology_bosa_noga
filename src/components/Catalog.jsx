import React from 'react';
import {useState, useRef, useEffect} from 'react';
import CatalogNavBar from './CatalogNavBar';
import ItemsList from './ItemsList';
import Preloader from './Preloader'
import ApiData from '../utils/constants';
import useJsonFetch from '../utils/hooks/useJsonFetch';
import SearchContext from '../utils/contexts/SearchContext';

const CatalogSearchField = ({onSearchConfirm, catalogSearchFieldVal, incomingSearchRequest, resetIncomingSearchRequest}) => {
  const inputRef = useRef();
  
  const handleEnterPress = (evt) => {
    if(evt.keyCode === 13) {
      evt.preventDefault();
      
      if(inputRef.current.value !== catalogSearchFieldVal) {
        onSearchConfirm(inputRef.current.value);
      };
    }
  };

  useEffect(() => {
    if (incomingSearchRequest === catalogSearchFieldVal) {
      resetIncomingSearchRequest();
    } else if(incomingSearchRequest !== `` && incomingSearchRequest !== catalogSearchFieldVal) {
      inputRef.current.value = incomingSearchRequest;
      onSearchConfirm(inputRef.current.value);
      resetIncomingSearchRequest();
    }
  }, [incomingSearchRequest]);

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

const Catalog = ({showingSearchField = false}) => {
  const [searchVal, setSearchVal] = useState(``);
  const [dataUrl, setDataUrl] = useState({base: ApiData.ITEMS, appendix: ``}); 
  const [loadingCategories, categoriesList] = useJsonFetch(ApiData.CATEGORIES);
  const [currCatId, setCurrCatId] = useState(null); 
  const [loadingItems, rawItemsData, showingLoadMore, resetRawItemsData] = useJsonFetch(dataUrl.base, dataUrl.appendix);
  const [offsetCount, setOffsetCount] = useState(0);

  const buildDataUrl = (currCatId = null, offsetTriggered = false, searchRequest = ``) => {

    let appendix, url;

    if(offsetTriggered === false && searchRequest === ``) {
      appendix = ``
    } else if(searchRequest === ``) {
      appendix = `offset=${6 * (offsetCount + 1)}`
      setOffsetCount(offsetCount + 1);
    } else if(offsetTriggered === false) {
      appendix = `q=${searchRequest}`
    } else {
      appendix = `q=${searchRequest}&offset=${6 * (offsetCount + 1)}`
      setOffsetCount(offsetCount + 1);
    }

    if(currCatId === null && appendix === ``) {
      url = {base: ApiData.ITEMS, appendix: ``}
    } else if(currCatId === null) {
      url = {base: ApiData.ITEMS, appendix: `?${appendix}`}
    } else if(appendix === ``) {
      url = {base: `${ApiData.ITEMS}?categoryId=${currCatId}`, appendix: ``}
    } else {
      url = {base: `${ApiData.ITEMS}?categoryId=${currCatId}`, appendix: `&${appendix}`}
    }

    return url
  };

  const handleCurrCatIdSwitch = (id) => {
    if(id !== currCatId) {
      resetRawItemsData();
      setCurrCatId(id);
      setOffsetCount(0);

      if(id === null) {
        setDataUrl(buildDataUrl(null, false, searchVal));
      } else {
        setDataUrl(buildDataUrl(id, false, searchVal));
      };
    }
  };

  const handleLoadMore = () => {
    if(currCatId === null) {
      setDataUrl(buildDataUrl(null, true, searchVal));
    } else {
      setDataUrl(buildDataUrl(currCatId, true, searchVal));
    }
  };

  const handleSearchRequest = (searchRequest) => {
    if(searchRequest.length === 0) {
      resetRawItemsData();
      setSearchVal(``);
      setOffsetCount(0);
      setDataUrl(buildDataUrl(currCatId, false, ``));
    } else if (currCatId === null) {
      resetRawItemsData();
      setSearchVal(searchRequest);
      setDataUrl(buildDataUrl(null, false, searchRequest));
    } else {
      resetRawItemsData();
      setSearchVal(searchRequest);
      setDataUrl(buildDataUrl(currCatId, false, searchRequest));
    }
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {(loadingCategories === false && rawItemsData !== null)
        ?
          <div className="text-center">
            {
              showingSearchField && <SearchContext.Consumer>
                {
                  context => (<CatalogSearchField
                    onSearchConfirm={handleSearchRequest}
                    catalogSearchFieldVal={searchVal}
                    incomingSearchRequest={context.searchVal}
                    resetIncomingSearchRequest={context.resetSearchVal}
                  />)
                }
              </SearchContext.Consumer>
            }
            <CatalogNavBar currCatId={currCatId} categoriesList={categoriesList} onCurrCatIdSwitch={handleCurrCatIdSwitch}/>
            <ItemsList rawItemsData={rawItemsData}/>
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
