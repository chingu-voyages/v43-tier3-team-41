import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../AppContext';
import DeleteIcon from '../../components/deleteIcon';
import SearchContext from '../../Context/SearchContext/SearchContext';
export default function CartPage() {
  // const { authToken } = useContext(AppContext);
  const { cartItems, setCartItems } = useContext(SearchContext);
  const { getCart, backendUrl, fetchingCartData } = useContext(AppContext);
  const navigate = useNavigate();
  // const [cartItems, setCartItems] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  // useEffect(() =>console.log(authToken))

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      // console.log(`authToken: ${authToken}`);
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
      .then(() => navigate('/orders'));
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
            cartItem.product.productId == productId && cartItem.quantity == 1
        )
      ) {
        //console.log(`item count is 1, so removing item from cart`);
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
            getCart();
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
  const calculateSum = () => {
    if (cartItems.length > 0) {
      const sum = cartItems.reduce(
        (totalPrice, obj) => totalPrice + obj.product.price * obj.quantity,
        0
      );
      console.log(`sum is ${sum}`);
      return sum;
    }
    return 0;
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='font-bold flex flex-row gap-5 justify-center items-center'>
        {fetchingCartData && <p className='text-lg'>Loading Your Cart Data...</p>}
        {!fetchingCartData && (
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
      <table className='hover table-fixed table-compact w-full'>
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
                <td></td>
                <td className='items-center'>
                  <div className='flex flex-row'>
                    <img
                      className='md:w-32 lg:w-48 rounded-full w-50 h-50'
                      src={cartItem.product.imageUrl}
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
