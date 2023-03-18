import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navigation/NavBar';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import ProductDetail from './pages/ProductPage/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/product_for_now' element={<ProductDetail />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
