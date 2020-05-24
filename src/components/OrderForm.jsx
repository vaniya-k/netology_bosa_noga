import React, {useState, useEffect} from 'react';
import ApiData from '../utils/constants';

const OrderForm = ({contents, setCartItemsCount}) => {
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(null);
  const [phone, setPhone] = useState(``);
  const [address, setAddress] = useState(``);
  const [checkboxActive, setCheckboxActive] = useState(false);
  const [sendingOrder, setSendingOrder] = useState(null);
  const [orderSentSuccessfully, setOrderSentSuccessfully] = useState(null);
  const [componentTitle, setComponentTitle] = useState(``);

  const handlePhoneInputChange = (evt) => {
    setPhone(evt.target.value)
  };

  const handleAddressInputChange = (evt) => {
    setAddress(evt.target.value)
  };

  const handleCheckboxToggle = () => {
    setCheckboxActive(!checkboxActive)
  };

  useEffect(() => {
    if(sendingOrder === null) {
      setComponentTitle(`Оформить заказ`) 
    } else if(sendingOrder === true) {
      setComponentTitle(`Заказ оформляется..`)
    } else if(orderSentSuccessfully === true) {
      setComponentTitle(`Заказ оформлен!`)
    } else {
      setComponentTitle(`Произошла ошибка..`)
    }

  }, [contents, sendingOrder, orderSentSuccessfully])

  useEffect(() => {
    if(phone !== `` && address !== `` && checkboxActive === true && contents.length !== 0) {
      setSubmitButtonEnabled(true)
    } else {
      setSubmitButtonEnabled(false)
    }
  }, [phone, address, checkboxActive]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let items = [];
    contents.forEach(item => items.push({id: Number(item.id), price: Number(item.price), count: Number(item.quantity)}));

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          owner: {
            phone: phone,
            address: address,
          },
          items: items
        }
      )
    };

    fetch(ApiData.ORDER, requestOptions)
      .then(setSendingOrder(true))
      .then(response => {
        if(response.ok){
          setOrderSentSuccessfully(true);
          localStorage.clear();
          setCartItemsCount(0);
        } else {
          setOrderSentSuccessfully(false);
          throw new Error(response.status);
        }
      })
      .then(setSendingOrder(false))
      .catch(error => {
        console.log(`Код ошибки: ${error.message}`);
      });
  }

  return (
    <section className="order">
      <h2 className="text-center">{componentTitle}</h2>
      { 
        sendingOrder === null && <div className="card" style={{maxWidth: `30rem`, margin: `0 auto`}}>
          <form className="card-body">
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input className="form-control" id="phone" placeholder="Телефон" onChange={handlePhoneInputChange}></input>
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес</label>
              <input className="form-control" id="address" placeholder="Адрес" onChange={handleAddressInputChange}></input>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" checked={checkboxActive} onClick={handleCheckboxToggle}></input>
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами обработки персональных данных</label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              style={{float: `right`}}
              onClick={handleSubmit}
              disabled={(submitButtonEnabled) ? false : true}
            >
              Оформить
            </button>
          </form>
        </div>
      }
    </section>
  )
};

export default OrderForm;
