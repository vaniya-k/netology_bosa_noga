import React, {useState, useEffect} from 'react';
import prepareItemDetailsData from '../utils/adapters/prepareItemDetailsData';
import Preloader from './Preloader';
import useJsonFetch from '../utils/hooks/useJsonFetch';
import ApiData from '../utils/constants';
import SearchAndCartContext from '../utils/contexts/SearchAndCartContext';

const ItemDetailsLoaded = ({details, setCartItemsCount}) => {
  const {id, title, imgUrl, sku, price, color, season, reason, manufacturer, material, sizes} = prepareItemDetailsData(details);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [cartSize, setCartSize] = useState(``);
  
  useEffect(() => {
    if(sizes.length !== 0) {
      setCartSize(sizes[0])
    }
  },[]);

  const writeToLocalStorage = (id, title, size, price, quantity) => {
    const passedKey = `${id}#${title}#${size}#${price}`;
  
    if(!localStorage.hasOwnProperty(passedKey)) {
      localStorage.setItem(passedKey, quantity)
    } else {
      const oldQuantity = localStorage.getItem(passedKey);
      localStorage.removeItem(passedKey);
      localStorage.setItem(passedKey, (Number(quantity) + Number(oldQuantity)));
    };
  };

  const handleToCart = () => {
    writeToLocalStorage(id, title, cartSize, price, cartQuantity);
    setCartItemsCount(localStorage.length);
  };

  const handleCartQuantityDown = () => {
    if(cartQuantity !== 1) {
      setCartQuantity(cartQuantity - 1);
    }
  };

  const handleCartQuantityUp = () => {
      setCartQuantity(cartQuantity + 1);
  };

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
          {
            (sizes.length === 0)
            ?
              <div className="text-center">
                <p>На данный момент нет в наличии</p>
              </div>
            : 
              <>
                <div className="text-center">
                  <p>Размеры в наличии:&nbsp;&nbsp;
                    {sizes.map(size =>
                      <span key={size} onClick={() => setCartSize(size)} className={`catalog-item-size ${cartSize === size && `selected`}`}>{size}</span>
                    )}
                  </p>
                  <p>Количество: <span className="btn-group btn-group-sm pl-2">
                    <button className="btn btn-secondary" onClick={handleCartQuantityDown}>-</button>
                    <span className="btn">{cartQuantity}</span>
                    <button className="btn btn-secondary"  onClick={handleCartQuantityUp}>+</button>
                  </span>
                  </p>
                </div>
                <button onClick={handleToCart} className="btn btn-danger btn-block btn-lg">{`В корзину! ${cartQuantity} шт. за ${cartQuantity * price} руб.`}</button>
              </>
          }
        </div>
      </div>
    </>
  )
}

const ItemDetails = ({id}) => {
  const [loadingDetails, details] = useJsonFetch(`${ApiData.ITEMS}/${id}`);

  return (
    <section className="catalog-item">
      {
        (loadingDetails === false)
        ? 
          <SearchAndCartContext.Consumer>
            {context => <ItemDetailsLoaded details={details[0]} setCartItemsCount={context.setCartItemsCount}/>}
          </SearchAndCartContext.Consumer>
        : <Preloader/>
      }
    </section>
  )
};

export default ItemDetails;