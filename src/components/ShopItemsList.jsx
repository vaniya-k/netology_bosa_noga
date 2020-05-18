import React from 'react';
import prepareShopItemsData from '../adapter';

const ShopItem = ({title, price, imgUrl}) => {
  return (
    <div className="col-4">
      <div className="card">
        <img src={imgUrl} className="card-img-top img-fluid" alt={title}></img>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{`${price} руб.`}</p>
          <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
        </div>
      </div>
    </div>
  )
};

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
