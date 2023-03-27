import SearchPageContent from './SearchPageContent';
import { useState, useEffect } from 'react';
// import SearchPageFilter from './SearchPageFilter';

const SearchPage = () => {
  // const [searchPageItems, setSearchPageItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const API_URL = 'https://pettopia-backend.onrender.com/api/v1/products';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        // setSearchPageItems(data.products);
        setFilteredItems(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // const handleFilterChange = (filteredItems) => {
  //   setFilteredItems(filteredItems);
  //   setCurrentPage(1);
  // };

  const handlePageChange = (pageNumber) => {
    console.log('handlePageChange called with pageNumber', pageNumber);
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  console.log('currentPage', currentPage);
  console.log('startIndex', startIndex);
  console.log('endIndex', endIndex);
  console.log('totalPages', totalPages);

  return (
    <div>
      {/* <SearchPageFilter
        searchPageItems={searchPageItems}
        onFilterChange={handleFilterChange}
      /> */}
      <SearchPageContent searchPageItems={currentItems} />
      {totalPages > 1 && (
        <div className='flex justify-center mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`btn mr-4 ${currentPage === 1 ? 'cursor-default' : ''}`}
          >
            Previous
          </button>
          {Array.from(Array(totalPages)).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`btn ${
                index + 1 === currentPage ? 'btn-primary' : 'btn-outline'
              } mx-2`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`btn ml-4 ${
              currentPage === totalPages ? 'cursor-default' : ''
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
