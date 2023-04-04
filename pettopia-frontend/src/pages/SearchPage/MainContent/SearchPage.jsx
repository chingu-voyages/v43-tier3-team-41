import SearchPageContent from './SearchPageContent';
import { useState, useEffect } from 'react';

const SearchPage = () => {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);
  const API_URL = 'https://pettopia-backend.onrender.com/api/v1/products';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProductData(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = productData.slice(firstPostIndex, lastPostIndex);

  // const handleFilterChange = (filteredItems) => {
  //   setFilteredItems(filteredItems);
  //   setCurrentPage(1);
  // };

  // grab input from search box, filter items based off search box

  return (
    <div>
      {/* <SearchPageFilter
        searchPageItems={searchPageItems}
        onFilterChange={handleFilterChange}
      /> */}
      <SearchPageContent
        filteredItems={currentPosts}
        totalPosts={productData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default SearchPage;
