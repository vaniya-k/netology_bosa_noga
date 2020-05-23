import React from 'react';
import prepareItemDetailsData from '../utils/adapters/prepareItemDetailsData';
import Preloader from './Preloader';
import useJsonFetch from '../utils/hooks/useJsonFetch';
import ApiData from '../utils/constants';

const ItemDetailsLoaded = ({details}) => {
  const {title, imgUrl, sku, price, color, season, reason, manufacturer, material, sizes} = prepareItemDetailsData(details);

  return (
    <>
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={imgUrl} className="img-fluid" alt=""></img>
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>Размеры в наличии: {sizes.map(size => <span key={size} className="catalog-item-size">{size}</span>)}</p>
            <p>Количество: <span className="btn-group btn-group-sm pl-2">
              <button className="btn btn-secondary">-</button>
              <span className="btn btn-outline-primary">1</span>
              <button className="btn btn-secondary">+</button>
            </span>
            </p>
          </div>
          {sizes.length !== 0 && <button className="btn btn-danger btn-block btn-lg">{`В корзину! 1 шт. за ${price} руб.`}</button>}
        </div>
      </div>
    </>
  )
}

const ItemDetails = ({id}) => {
  const [loadingDetails, details] = useJsonFetch(`${ApiData.ITEMS}/${id}`);

  return (
    <section className="catalog-item">
      {(loadingDetails === false) ? <ItemDetailsLoaded details={details[0]}/> : <Preloader/>}
    </section>
  )
};

export default ItemDetails;