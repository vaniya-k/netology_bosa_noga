import React from 'react';
import {Link} from 'react-router-dom';
import prepareItemsListData from '../utils/adapters/prepareItemsListData';

const ItemCard = ({id, title, price, imgUrl}) => {
  return (
    <div className="col-4">
      <div className="card">
        <img src={imgUrl} className="card-img-top img-fluid" alt={title}></img>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{`${price} руб.`}</p>
          <Link to={`/items/${id}`} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  )
};

const ItemsList = ({rawItemsData}) => {
  return (
    <div className="row">
      {prepareItemsListData(rawItemsData).map(item => <ItemCard key={item.id} id={item.id} title={item.title} price={item.price} imgUrl={item.imgUrl}/>)}
    </div>
  )
};

export default ItemsList;
