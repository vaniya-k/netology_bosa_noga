import React from 'react';
import {useState} from 'react';
import CatalogNavBar from './CatalogNavBar';
import ShopItemsList from './ShopItemsList';
import Preloader from './Preloader'
import ApiData from '../constants';
import useJsonFetch from '../hooks/useJsonFetch';

const Catalog = () => {
  const [categoryUrl, setCategoryUrl] = useState({base: ApiData.ITEMS, offset: ``}); 
  const [loadingCategories, categoriesList] = useJsonFetch(ApiData.CATEGORIES);
  const [currCatId, setCurrCatId] = useState(null); 
  const [loadingItems, rawItemsData] = useJsonFetch(categoryUrl.base, categoryUrl.offset);
  const [offsetCount, setOffsetCount] = useState(0);

  const handleCurrCatIdSwitch = (id) => {
    setCurrCatId(id);
    setOffsetCount(0);

    if(id === null) {
      setCategoryUrl({base: ApiData.ITEMS, offset: ``});
    } else {
      setCategoryUrl({base: ApiData.ITEMS + `?categoryId=${id}`, offset: ``})
    };
  };

  const handleLoadMore = () => {
    if(currCatId === null) {
      setCategoryUrl(({base: ApiData.ITEMS, offset: `?offset=${6 * (offsetCount + 1)}`}));
    } else {
      setCategoryUrl(({base: `${ApiData.ITEMS}?categoryId=${currCatId}`, offset: `&offset=${6 * (offsetCount + 1)}`}));
    }

    setOffsetCount(offsetCount + 1);
  };

//   http://localhost:7070/api/items?offset=6
// http://localhost:7070/api/items?categoryId=X&offset=6

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {(loadingCategories === false && rawItemsData !== null)
        ?
          <div className="text-center">
            <CatalogNavBar currCatId={currCatId} categoriesList={categoriesList} onCurrCatIdSwitch={handleCurrCatIdSwitch}/>
            <ShopItemsList rawItemsData={rawItemsData}/>
            <button className="btn btn-outline-primary" onClick={handleLoadMore} disabled={(loadingItems !== false) ? true : false}>Загрузить ещё</button>
          </div>
        :
          <Preloader/>
      }
    </section>
  );
};

export default Catalog;



