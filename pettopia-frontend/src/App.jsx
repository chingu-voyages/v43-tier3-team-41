import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navigation/NavBar';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ProductDetail from './pages/ProductPage/ProductDetail';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='container relative -z-50'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/product_for_now' element={<ProductDetail />} />
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
