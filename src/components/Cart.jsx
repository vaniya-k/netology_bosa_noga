import React, {useState, useEffect} from 'react';
import OrderForm from './OrderForm'
import {Link} from 'react-router-dom';
import SearchAndCartContext from '../utils/contexts/SearchAndCartContext';



const ItemLine = ({index, id, title, size, quantity, price, onProductRemove}) => {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td><Link to={`/items/${id}`}>{title}</Link></td>
      <td>{size}</td>
      <td>{quantity}</td>
      <td>{`${price} руб.`}</td>
      <td>{`${price * quantity} руб.`}</td>
      <td><button onClick={onProductRemove} className="btn btn-outline-danger btn-sm">Удалить</button></td>
    </tr>
  )
}

const ItemsTable = ({contents, setContents, cartItemsCount, setCartItemsCount}) => {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if(localStorage.length === 0) {
      setSum(0);
      setContents([]);
    } else {
      let newContents = [];
      let newSum = 0;
      let description, quantity, descriptionChunks, lineObj

      for(let i = 0; i < localStorage.length; ++i) {
        description = localStorage.key(i);
        quantity = localStorage.getItem(description);
        descriptionChunks = description.split(`#`);

        lineObj = {
          id: descriptionChunks[0],
          title: descriptionChunks[1],
          size: descriptionChunks[2],
          price: descriptionChunks[3],
          quantity
        }

        newSum = newSum + (lineObj.price * lineObj.quantity)

        newContents.push(lineObj);
      };

      setSum(newSum);
      setContents(newContents);
    }
  },[cartItemsCount])

  const handleProductRemove = (localStorageKey) => {
    localStorage.removeItem(localStorageKey);
    setCartItemsCount(localStorage.length);
  };

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {contents.length !== 0 && contents.map((lineObj, i) => 
            <ItemLine
              key={`${lineObj.id}#${lineObj.size}`}
              id={lineObj.id}
              index={(i + 1)}
              title={lineObj.title}
              size={lineObj.size}
              quantity={lineObj.quantity}
              price={lineObj.price}
              onProductRemove={() => handleProductRemove(`${lineObj.id}#${lineObj.title}#${lineObj.size}#${lineObj.price}`)}
            />
          )}
          <tr>
            <td colSpan="5" className="text-right">Общая стоимость</td>
            <td>{`${sum} руб.`}</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
};

const Cart = () => {
  const [contents, setContents] = useState([]);

  return (
    <>
      <SearchAndCartContext.Consumer>
        {context => (
          <>
            <ItemsTable contents={contents} setContents={setContents} cartItemsCount={context.cartItemsCount} setCartItemsCount={context.setCartItemsCount}/>
            <OrderForm contents={contents} setCartItemsCount={context.setCartItemsCount}/>
          </>
        )}
      </SearchAndCartContext.Consumer>
    </>
  )
};

export default Cart;
