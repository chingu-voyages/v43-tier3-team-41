import SearchPageContent from "./SearchPageContent";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [searchPageItems, setSearchPageItems] = useState([]);
  const API_URL = "https://pettopia-backend.onrender.com/api/v1/products"

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setSearchPageItems(data.products);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData(); 
  }, [])

  return (
    <>
      <SearchPageContent
        searchPageItems={searchPageItems}
      /> 
    </>
  );
}
