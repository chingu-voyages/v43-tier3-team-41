import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navigation/NavBar';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/MainContent/SearchPage';
import ProductDetail from './pages/ProductPage/ProductDetail';
import { SearchProvider } from './Context/SearchContext/SearchContext';

function App() {
  return (
    <>
        <BrowserRouter>
        <SearchProvider>
            <NavBar />
            <div className='container z-0'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/product_for_now' element={<ProductDetail />} />
              </Routes>
            </div>
          </SearchProvider>
        </BrowserRouter>
    </>
  );
}

export default App;
