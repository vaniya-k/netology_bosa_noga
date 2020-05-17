import React from 'react';
import {useState} from 'react';
import CatalogNavBar from './CatalogNavBar';
import ShopItemsList from './ShopItemsList';
import Preloader from './Preloader'
import ApiData from '../constants';
import useJsonFetch from '../hooks/useJsonFetch';

const Catalog = () => {
  const [categoryUrl, setCategoryUrl] = useState(ApiData.ITEMS);
  const [currCatId, setCurrCatId] = useState(null);  
  const [loadingCategories, categoriesList] = useJsonFetch(ApiData.CATEGORIES);
  const [loadingItems, rawItemsData] = useJsonFetch(categoryUrl);

  const handleCurrCatIdSwitch = (id) => {
    setCurrCatId(id);

    if(id === null) {
      setCategoryUrl(ApiData.ITEMS)
    } else {
      setCategoryUrl(ApiData.ITEMS + `?categoryId=${id}`)
    };
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {(loadingCategories === false && loadingItems === false)
        ?
          <div className="text-center">
            <CatalogNavBar currCatId={currCatId} categoriesList={categoriesList} switchCurrCatId={handleCurrCatIdSwitch}/>
            <ShopItemsList rawItemsData={rawItemsData}/>
            <button className="btn btn-outline-primary" disabled={(loadingItems !== false) ? true : false}>Загрузить ещё</button>
          </div>
        :
          <Preloader/>
      }
    </section>
  );
};

export default Catalog;



