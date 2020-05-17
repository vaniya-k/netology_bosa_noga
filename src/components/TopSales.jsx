import React from 'react';
import ShopItem from './ShopItem';
import apiUrls from '../constants';
import prepareShopItemsData from '../adapter';
import useJsonFetch from '../hooks/useJsonFetch';

const TopSales = () => {
  const [loading, data] = useJsonFetch(apiUrls.TOP_SALES);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {(loading === false)
        ?
          <div className="row">
            {prepareShopItemsData(data).map(
              item => <ShopItem key={item.id} title={item.title} price={item.price} imgUrl={item.imgUrl}/>
            )}
          </div>
        :
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
      }
    </section>
  )
};

export default TopSales;