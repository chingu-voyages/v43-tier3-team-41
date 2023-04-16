import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchContext from '../../Context/SearchContext/SearchContext';
import NavBarShopCartItem from './NavBarShopCartItem';
import AppContext from '../../AppContext';
import { BiUserCircle } from 'react-icons/bi';
import { BsSearch, BsMoonStars } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';

export default function NavBar() {
  const [theme, setTheme] = useState('light');
  const {
    handleSearchTermSubmit,
    searchTerm,
    setSearchTerm,
    cartItems,
    getAllProducts,
  } = useContext(SearchContext);

  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const calculateSum = () => {
    if (cartItems.length > 0) {
      const sum = cartItems.reduce(
        (totalPrice, obj) => totalPrice + obj.product.price * obj.quantity,
        0.0
      );
      return Math.round(sum * 100) / 100;
    }
    return 0;
  };
  const subTotal = calculateSum();

  const isUserloggedIn = localStorage.getItem('token') !== null;

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

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
            success_url: 'orders',
            cancel_url: 'cart',
          }),
        })
      )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.url);
        window.location.assign(data.url);
      })
      .catch((err) => console.error(err));
  };

  return (
    <header className='w-100 bg-primary'>
      <div className='navbar container sticky z-10'>
        <div className='navbar-start'>
          <div className='text-2xl mr-4'>
            <a
              href='/'
              className='normal-case text-2xl px-1 text-white min-w-[100px] flex items-center transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300'
            >
              <img
                className='inline-block'
                src='/logo.png'
                alt='logo'
                height={'50px'}
                width={'50px'}
              />
              <span className='ml-2'>Pettopia</span>
            </a>
          </div>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link
                to='/search'
                onClick={() => getAllProducts()}
                className='text-white btn btn-outline normal-case'
              >
                All Products
              </Link>
            </li>
          </ul>
        </div>
        <div className='navbar-end'>
          <div className='dropdown dropdown-end'>
            <label
              tabIndex={0}
              className='btn btn-circle btn-ghost text-lg text-[#F3EEEE] hover:cursor-pointer'
            >
              <FaSearch />
            </label>
            <div
              tabIndex={0}
              className='mt-3 card card-compact dropdown-content w-64 bg-white shadow'
            >
              <div className='card-body w-64'>
                <form
                  onSubmit={(e) => {
                    handleSearchTermSubmit(e);
                  }}
                  className='form-control flex-none gap-2'
                >
                  <div className='relative items-center flex'>
                    <input
                      type='text'
                      placeholder='Search'
                      className='input input-bordered'
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                    />
                    <button
                      type='submit'
                      className='rounded-full text-lg hover:cursor-pointer hover:bg-base-400 hover:text-xl absolute right-5 text-gray-400'
                    >
                      <BsSearch />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {theme === 'dark' && (
            <li data-set-theme='light' onClick={() => setTheme('light')} className='list-none text-[#F3EEEE] text-xl btn btn-ghost btn-circle'>
              <FiSun />
            </li>
          )}
          {theme === 'light' && (
            <li data-set-theme='dark' onClick={() => setTheme('dark')} className='list-none text-[#F3EEEE] text-xl btn btn-ghost btn-circle'>
              <BsMoonStars />
            </li>
          )}
          {isUserloggedIn && (
            <>
              <div className='dropdown dropdown-end'>
                <label tabIndex={0} className='btn btn-ghost btn-circle'>
                  <BiUserCircle className='text-3xl text-white' />
                </label>
                <div
                  tabIndex={0}
                  className='mt-3 card card-compact dropdown-content w-32 bg-white shadow'
                >
                  <div className='card-body w-32'>
                    <button
                      className='btn btn-outline normal-case mr-1'
                      onClick={() => handleSignOut()}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
              <div className='dropdown dropdown-end'>
                <label tabIndex={0} className='btn btn-ghost btn-circle'>
                  <div className='indicator'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-7 w-7'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='#F3EEEE'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                    <span className='badge badge-sm indicator-item'>
                      {cartItems.length}
                    </span>
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className='mt-3 card card-compact dropdown-content w-96 bg-base-100 shadow'
                >
                  <div className='card-body w-96'>
                    <div className='overflow-y-auto max-h-72'>
                      {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                          <NavBarShopCartItem item={item} />
                        ))
                      ) : (
                        <p> Your cart is currently empty. </p>
                      )}
                    </div>
                    <span className='font-bold text-lg'></span>
                    <span className='text-info ml-4'>
                      Subtotal: ${subTotal}{' '}
                    </span>
                    <div className='card-actions justify-center'>
                      <button className='btn btn-outline w-[45%]'>
                        <Link to='/cart'> View cart </Link>
                      </button>
                      <button
                        className='btn btn-primary w-[45%]'
                        onClick={checkoutCart}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {!isUserloggedIn && (
            <>
              <button className='btn btn-outline text-white normal-case'>
                <Link to={'/login'}>Login</Link>
              </button>
              <button className='btn btn-primary ml-2 normal-case'>
                <Link to={'/signup'}>Signup</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
