import React from 'react';
import ShopItem from './ShopItem';
import prepareShopItemsData from '../adapter';

const ShopItemsList = ({rawItemsData}) => {
  return (
    <div className="row">
      {prepareShopItemsData(rawItemsData).map(
        item => <ShopItem key={item.id} title={item.title} price={item.price} imgUrl={item.imgUrl}/>
      )}
    </div>
  )
};

export default ShopItemsList;
