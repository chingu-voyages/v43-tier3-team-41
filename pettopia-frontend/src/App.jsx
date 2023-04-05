import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navigation/NavBar';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/MainContent/SearchPage';
import ProductDetail from './pages/ProductPage/ProductDetail';
import CartPage from './pages/CartPage';
import AppContext from './AppContext';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  const cartId = '6424c6249193db4836879fe6';
  return (
    <AppContext.Provider value={{ 
      cartId
    }}>
        <BrowserRouter>
        <NavBar />
        <div className='container z-0'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/product_for_now' element={<ProductDetail />} />
        </Routes>
        </div>
    </BrowserRouter>
    </AppContext.Provider>
    
  );
}

export default App;
