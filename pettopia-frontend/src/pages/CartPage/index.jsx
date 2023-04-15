import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../AppContext';
import SearchContext from '../../Context/SearchContext/SearchContext';
export default function CartPage() {
  const { cartItems, setCartItems } = useContext(SearchContext);
  const { getCart, backendUrl, fetchingCartData, cartFetchingError } = useContext(AppContext);
  const navigate = useNavigate();
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/login', { state: { url: '/cart' } });
    } else {
      getCart(setCartItems);
    }
  }, []);
  
  const checkoutCart = () => {
    fetch(`${backendUrl}/api/v1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
  .then( res => res.json())
  .then(data => data.orderId)
  .then(orderId =>fetch(`${backendUrl}/api/v1/stripe/checkout/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body:JSON.stringify({
          success_url:'checkout-success',
          cancel_url: 'checkout-failed'
        })
    }))
    .then(res => res.json())
    .then(data => {
      window.location.assign(data.url)
    })
    .catch(err => console.error(err))
  }
  const increaseItemQty = (productId) => {
    if (localStorage.getItem('token') === null) {
      navigate('/login');
    } else {
      setFetchingData(true);
      fetch(`${backendUrl}/api/v1/cart/add/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => {
          getCart(setCartItems);
        })
        .then(() => {
          setFetchingData(false);
        })
        .catch((err) => console.error(err));
    }
  };
  const decreaseItemQty = (productId) => {
    if (localStorage.getItem('token') === null) {
      navigate('/login');
    } else {
      setFetchingData(true);
      if (
        cartItems.find(
          (cartItem) =>
            cartItem.product.productId === productId && cartItem.quantity === 1
        )
      ) {
        fetch(`${backendUrl}/api/v1/cart/remove/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({}),
        })
          .then((response) => response.json())
          .then((data) => {
            getCart(setCartItems);
          })
          .then(() => setFetchingData(false))
          .catch((err) => console.error(err));
      } else {
        fetch(`${backendUrl}/api/v1/cart/subtract/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({}),
        })
          .then((response) => response.json())
          .then((data) => {
            getCart(setCartItems);
          })
          .then(() => setFetchingData(false))
          .catch((err) => console.error(err));
      }
    }
  };
  const removeItemFromCart = (productId) => {
    
      if (
        cartItems.find(
          (cartItem) =>
            cartItem.product.productId === productId
        )
      ) {
        setFetchingData(true);
        fetch(`${backendUrl}/api/v1/cart/remove/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({}),
        })
          .then((response) => response.json())
          .then((data) => {
            getCart(setCartItems);
          })
          .then(() => setFetchingData(false))
          .catch((err) => console.error(err));
      }
  }
  const calculateSum = () => {
    if (cartItems.length > 0) {
      const sum = cartItems.reduce(
        (totalPrice, obj) => totalPrice + obj.product.price * obj.quantity,
        0
      );
      return sum;
    }
    return 0;
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='font-bold flex flex-row gap-5 justify-center items-center'>
        {cartFetchingError && <p className='text-lg'> Sorry! There was an error retrieving your items. Please try again.  </p>}
        {fetchingCartData && !cartFetchingError && <p className='text-lg'>Loading Your Cart Data...</p>}
        {!fetchingCartData && !cartFetchingError && cartItems.length === 0 && <p className='text-lg'>Your cart is currently empty - Total: $0.00</p>}
        {!fetchingCartData && !cartFetchingError && cartItems.length > 0 && (
          	<>
				<div className='text-lg'>Total</div>
				<span>:</span>
				<div>$</div>
				<div className='text-lg'>{calculateSum().toFixed(2)}</div>
				<div
				className={`btn btn-outline ${
					cartItems.length <= 0 ? 'disabled:opacity-25' : ''
				}`}
				onClick={checkoutCart}
				>
				Checkout
				</div>
          	</>
        	)
		}
    </div>
      <table className='hover table table-compact w-full'>
        <thead className=''>
          <tr>
            <th></th>
            <th className='text-center w-1/2 font-bold p-2 border-b bg-indigo-700 text-white'>
              Product
            </th>
            <th className='text-center w-1/4 font-bold p-2 border-b bg-indigo-700 text-white'>
              Price
            </th>
            <th className='text-center w-1/4 font-bold p-2 border-b bg-indigo-700 text-white'>
              Qty
            </th>
            <th className='text-center w-1/4 font-bold p-2 border-b bg-indigo-700 text-white'>
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => {
            return (
              <tr
                key={cartItem.product.productId}
                className={`${fetchingData ? 'opacity-30' : ''}`}
              >
                <td><div className='btn' onClick={(e) =>removeItemFromCart(cartItem.product.productId)}>x</div></td>
                <td className='items-center'>
                  <div className='flex flex-row'>
                    <img
                      className='md:w-32 lg:w-48 rounded-full w-50 h-50'
                      src={cartItem.product.imageUrl}
                      alt='Product'
                    />
                    <p className='font-bold'>{cartItem.product.name}</p>
                  </div>
                </td>
                <td className='font-bold items-center'>
                  <div className='flex flex-row gap-4 justify-center'>
                    <div>$</div>
                    <div>{cartItem.product.price}</div>
                  </div>
                </td>
                <td className='font-bold items-center'>
                  <div className='flex flex-row gap-3 justify-center'>
                    <div
                      className={`btn btn-outline rounded-2 ${
                        fetchingData ? 'disabled' : ''
                      }`}
                      onClick={(e) =>
                        increaseItemQty(cartItem.product.productId)
                      }
                    >
                      +
                    </div>
                    <div className='border-solid'>{cartItem.quantity}</div>
                    {/*<DeleteIcon /> */}
                    <div
                      className={`btn btn-outline rounded-2 ${
                        fetchingData ? 'disabled' : ''
                      }`}
                      onClick={(e) =>
                        decreaseItemQty(cartItem.product.productId)
                      }
                    >
                      -
                    </div>
                  </div>
                </td>
                <td className='font-bold items-center'>
                  <div className='flex flex-row gap-4 justify-center'>
                    <div>$</div>
                    <div className='font-bold'>
                      {(cartItem.product.price * cartItem.quantity).toFixed(2)}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
