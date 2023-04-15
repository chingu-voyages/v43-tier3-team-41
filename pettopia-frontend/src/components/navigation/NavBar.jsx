import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchContext from '../../Context/SearchContext/SearchContext';
import NavBarShopCartItem from './NavBarShopCartItem';
import AppContext from '../../AppContext';

const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];

export default function NavBar() {
  const [theme, setTheme] = useState('light');
  const { handleSearchTermSubmit, searchTerm, setSearchTerm, cartItems, getAllProducts} =
    useContext(SearchContext);

  const {backendUrl} = useContext(AppContext)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    let themeVal = e.target.getAttribute('data-set-theme');
    setTheme(themeVal);
  };

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

  const isUserloggedIn = localStorage.getItem('token') !== null
  
  const handleSignOut = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

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
          success_url:'orders',
          cancel_url: 'cart'
        })
    }))
    .then(res => res.json())
    .then(data => {
      //console.log(data.url);
      window.location.assign(data.url)
    })
    .catch(err => console.error(err))
  }

  return (
    <header className='w-100 bg-primary'>
      <div className='navbar container sticky z-10'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label
              tabIndex={0}
              className='btn btn-circle btn-primary lg:hidden'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <a href='/'>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a href='/' className='justify-between'>
                  Parent
                  <svg
                    className='fill-current'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' />
                  </svg>
                </a>
              </li>
              <li>
                <Link to='/search' className='font-medium text-white'>
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <a
            href='/'
            className='btn btn-ghost normal-case text-xl px-1 text-white transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 duration-300 ...'
          >
            Pettopia
          </a>
          <div className='dropdown dropdown-end ml-3'>
            <label
              tabIndex={0}
              className='btn btn-outline transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 hover:bg-inherit hover:border-inherit duration-300 ... text-white'
            >
              Theme
            </label>
            <ul
              tabIndex={0}
              className='dropdown-content mt-1 w-40 max-h-96 overflow-y-auto menu-compact p-2 bg-base-200 shadow rounded-box'
            >
              {THEMES.map((theme, i) => (
                <li key={theme + i}>
                  <button
                    data-set-theme={theme}
                    onClick={handleThemeChange}
                    className='font-medium capitalize'
                  >
                    {i + 1 + '. ' + theme}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link to='/search' onClick={() => getAllProducts()}className='text-white'>
                All Products
              </Link>
            </li>
          </ul>
        </div>
        <form
          onSubmit={(e) => {
            handleSearchTermSubmit(e);
          }}
          className='form-control flex-none gap-2'
        >
          <div className='relative flex items-center'>
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
              className='btn btn-ghost btn-circle absolute right-0 text-gray-400'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>
          </div>
        </form>
        <div className='navbar-end'>
              {isUserloggedIn && 
                <>
                  <button className="btn btn-outline text-white normal-case mr-1" onClick={() => handleSignOut()}>Sign Out</button>
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
                          {cartItems.length > 0
                            ? cartItems.map((item) => (
                                <NavBarShopCartItem item={item} />
                              ))
                            : <p> Your cart is currently empty. </p>
                          }
                        </div>
                        <span className='font-bold text-lg'></span>
                        <span className='text-info ml-4'>Subtotal: ${subTotal} </span>
                        <div className='card-actions justify-center'>

                          <button className='btn btn-outline w-[45%]'>
                            <Link to='/cart'> View cart </Link>
                          </button>
                          <button className='btn btn-primary w-[45%]' onClick={checkoutCart}>
                            Checkout 
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
              {!isUserloggedIn && 
              <> 
                <button className='btn btn-outline text-white normal-case'>
                  <Link to={'/login'}>Login</Link>
                </button>
                <button className='btn btn-primary ml-2 normal-case'>
                  <Link to={'/signup'}>Signup</Link>
                </button>
              </>}
        </div>
      </div>
    </header>
  );
}
