import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import SearchContext from '../../Context/SearchContext/SearchContext';
import {BsX} from 'react-icons/bs'

export default function CartPage() {
  const { cartItems, setCartItems } = useContext(SearchContext);
  const { getCart, backendUrl, fetchingCartData, cartFetchingError } =
    useContext(AppContext);
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
      .then((res) => res.json())
      .then((data) => data.orderId)
      .then((orderId) =>
        fetch(`${backendUrl}/api/v1/stripe/checkout/${orderId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({
            success_url: '/checkout-success',
            cancel_url: '/checkout-failed',
          }),
        })
      )
      .then((res) => res.json())
      .then((data) => {
        window.location.assign(data.url);
      })
      .catch((err) => console.error(err));
  };
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
      cartItems.find((cartItem) => cartItem.product.productId === productId)
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
  };
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
    <div className='text-center select-none'>
      <div className='font-bold flex flex-row gap-5 justify-center items-center my-8'>
        {cartFetchingError && (
          <p className='text-lg'>
            Sorry! There was an error retrieving your items. Please try again.
          </p>
        )}
        {fetchingCartData && !cartFetchingError && (
          <p className='text-lg'>Loading Your Cart Data...</p>
        )}
        {!fetchingCartData && !cartFetchingError && cartItems.length === 0 && (
          <p className='text-lg'>Your cart is currently empty - Total: $0.00</p>
        )}
        {!fetchingCartData && !cartFetchingError && cartItems.length > 0 && (
          <h1 className='text-3xl'>Shopping Cart</h1>
        )}
      </div>
      <div className='grid grid-cols-9 grid-rows-1 border-b pb-3'>
        <p className='col-span-4 col-start-2 text-left'>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>

      <div className='min-h-[400px]'> 
        <ul >
          {cartItems.map((cartItem) => {
            return (
              <li
                key={cartItem.product.productId}
                className={`${fetchingData ? 'opacity-30' : ''} grid grid-cols-9 grid-row-1 pt-3`}
              >
                <div className='grid grid-cols-3 col-span-4 col-start-2'>
                  <img
                    className='md:w-32 rounded-[5%]'
                    src={cartItem.product.imageUrl}
                    alt='Product'
                  />
                  <p className='text-sm md:text-lg font-bold col-span-2 text-left'>{cartItem.product.name}</p>
                </div>
                <div className='h-[50%]'>
                  <span>${cartItem.product.price}</span>
                </div>
                <div className='grid grid-cols-3 text-center h-[50%]'>
                  <div
                    className={`btn btn-outline rounded-2 ${
                      fetchingData ? 'disabled' : ''
                    }`}
                    onClick={(e) => increaseItemQty(cartItem.product.productId)}
                  >
                    +
                  </div>
                  <div className='border-solid h-[50%]'>{cartItem.quantity}</div>
                  <div
                    className={`btn btn-outline rounded-2 ${
                      fetchingData ? 'disabled' : ''
                    }`}
                    onClick={(e) => decreaseItemQty(cartItem.product.productId)}
                  >
                    -
                  </div>
                </div>
                <div className='h-[50%]'>
                  <div className='font-bold'>
                    ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
                  </div>
                </div>
                <div
                className='text-red-500 text-xl transition ease-in-out delay-150 hover:text-red-700 hover:text-2xl hover:cursor-pointer h-[50%]'
                  onClick={(e) =>
                    removeItemFromCart(cartItem.product.productId)
                  }
                >
                  <BsX/>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {!fetchingCartData && !cartFetchingError && cartItems.length > 0 && (
        <>
          <div className='text-2xl font-bold w-56 mx-auto mb-3'>SubTotal: ${calculateSum().toFixed(2)}</div>
          
          <div>
            <Link to='/search' className={`btn btn-outline btn-primary mx-1`}>
              <div>
                Continue Shopping
              </div>
            </Link>
            <div
              className={`btn btn-primary ${
                cartItems.length <= 0 ? 'disabled:opacity-25' : ''
              } mx-1`}
              onClick={checkoutCart}
            >
              Checkout
            </div>
          </div>
        </>
      )}
    </div>
  );
}
