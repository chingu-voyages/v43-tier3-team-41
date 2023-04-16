import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import NavBar from './components/navigation/NavBar';
import Footer from './components/navigation/Footer';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/MainContent/SearchPage';
import ProductDetail from './pages/ProductPage/ProductDetail';
import SearchContext, { SearchProvider } from './Context/SearchContext/SearchContext';
import CartPage from './pages/CartPage';
import AppContext from './AppContext';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage';
import OrdersPage from './pages/OrdersPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutFailed from './pages/Checkout-Failed';

function App() {
  //const cartId = '6424c6249193db4836879fe6';  
  //const cartId = null; 
  //const token = window.localStorage.getItem('token');
  const backendUrl = process.env.REACT_APP_URL

  const [authToken, setAuthToken] = useState(null);
  const [fetchingCartData, setFetchingCartData] = useState(false);
  const [cartFetchingError, setCartFetchingError] = useState(false);

  const getCart = async (setCartItems) =>{
      try {
        setFetchingCartData(true);
        const response = await fetch(`${backendUrl}/api/v1/cart`, {
          method:'GET',
          headers: {
            'CONTENT-TYPE':'application/json',
            'Authorization': localStorage.getItem('token')
          }
        })
        const data = await response.json()
        if(data.cartItems) {setCartItems(data.cartItems);} 
        setFetchingCartData(false)
        setCartFetchingError(false);
      } catch (error) {
        console.log(error)
        setCartFetchingError(true);
      }
    }

  return (

    <AppContext.Provider value={{ 
      //cartId,
      // authToken,
      // setAuthToken
      getCart,
      backendUrl,
      fetchingCartData,
      cartFetchingError,
      setCartFetchingError
    }}>
        <BrowserRouter>
        <SearchProvider>
        <NavBar />
        <div className='container min-h-[90vh]'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/checkout-failed" element={<CheckoutFailed />} />
          <Route path='/product_for_now' element={<ProductDetail />} />
        </Routes>
        </div>
        <Footer/>
        </SearchProvider>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
