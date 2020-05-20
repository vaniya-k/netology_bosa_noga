import React from 'react';
import ShopItemsList from './ShopItemsList';
import Preloader from './Preloader';
import ApiData from '../utils/constants';
import useJsonFetch from '../utils/hooks/useJsonFetch';

const TopSales = () => {
  const [loadingItems, rawItemsData] = useJsonFetch(ApiData.TOP_SALES);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {(loadingItems === false) ? <ShopItemsList rawItemsData={rawItemsData}/> : <Preloader/>}
    </section>
  )
};

export default TopSales;