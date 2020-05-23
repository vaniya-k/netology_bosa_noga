import React from 'react';
import ItemsList from './ItemsList';
import Preloader from './Preloader';
import ApiData from '../utils/constants';
import useJsonFetch from '../utils/hooks/useJsonFetch';

const TopSales = () => {
  const [loadingItems, rawItemsData] = useJsonFetch(ApiData.TOP_SALES);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {(loadingItems === false) ? <ItemsList rawItemsData={rawItemsData}/> : <Preloader/>}
    </section>
  )
};

export default TopSales;