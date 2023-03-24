import { useState, useEffect } from 'react';

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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    let themeVal = e.target.getAttribute('data-set-theme');
    setTheme(themeVal);
  };

  return (
      <header className='w-100'>
        <div className='navbar bg-base-100 container sticky'>
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
                  <ul className='p-2'>
                    <li>
                      <a href='/'>Submenu 1</a>
                    </li>
                    <li>
                      <a href='/'>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href='/'>Item 3</a>
                </li>
              </ul>
            </div>
            <a href='/' className='btn btn-ghost normal-case text-xl px-1'>
              Pettopia
            </a>
          </div>
          <div className='navbar-center hidden lg:flex'>
            <ul className='menu menu-horizontal px-1'>
              <li>
                <a href='/'>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a href='/'>
                  Parent
                  <svg
                    className='fill-current'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                  >
                    <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
                  </svg>
                </a>
                <ul className='p-2'>
                  <li>
                    <a href='/'>Submenu 1</a>
                  </li>
                  <li>
                    <a href='/'>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href='/'>Item 3</a>
              </li>
            </ul>
          </div>
          <div className='form-control flex-none gap-2'>
            <input
              type='text'
              placeholder='Search'
              className='input input-bordered'
            />
          </div>
          <div className='navbar-end'>
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn'>
                Choose Page Theme
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
        </div>
      </header>
  );
}
