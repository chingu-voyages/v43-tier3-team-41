import SearchPageContent from './SearchPageContent';

const SearchPage = () => {

  

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
        <SearchPageContent />
    </div>
  );
};

export default SearchPage;
