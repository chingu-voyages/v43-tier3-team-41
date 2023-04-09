import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import NavBar from './components/navigation/NavBar';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/MainContent/SearchPage';
import ProductDetail from './pages/ProductPage/ProductDetail';
import { SearchProvider } from './Context/SearchContext/SearchContext';
import CartPage from './pages/CartPage';
import AppContext from './AppContext';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  //const cartId = '6424c6249193db4836879fe6';  
  //const cartId = null; 
  //const token = window.localStorage.getItem('token');
  const backendUrl = 'https://pettopia-backend.onrender.com'

  const [authToken, setAuthToken] = useState(null);
  useEffect(() =>{
    console.log('welcome to app');
  })

  const getCart = async (setCartItems) =>{
      try {
        const response = await fetch(`${backendUrl}/api/v1/cart`, {
          method:'GET',
          headers: {
            'CONTENT-TYPE':'application/json',
            'Authorization': localStorage.getItem('token')
          }
        })
        const data = await response.json()
        if(data.cartItems) {setCartItems(data.cartItems);} 
      } catch (error) {
        console.log(error)
      }
	}

  return (

    <AppContext.Provider value={{ 
      //cartId,
      // authToken,
      // setAuthToken
      getCart,
      backendUrl
    }}>
        <BrowserRouter>
        <SearchProvider>
        <NavBar />
        <div className='container z-0'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='/product_for_now' element={<ProductDetail />} />
        </Routes>
        </div>
        </SearchProvider>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
