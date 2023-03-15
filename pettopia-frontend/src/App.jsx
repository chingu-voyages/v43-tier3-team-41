import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./HomePage/NavBar";
import HomePage from "./HomePage/HomePage";
import SearchPage from "./SearchPage/SearchPage";
import ProductDetail from "./ProductPage/ProductDetail";

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product_for_now" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
