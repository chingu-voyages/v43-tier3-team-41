import { useContext } from "react";
import SearchContext from "../../../Context/SearchContext/SearchContext";
import { useState } from "react";

const SearchPageFilter = () => {
  const {handleSubmit,
    searchTerm, 
    setSearchTerm,
    capturedSearchTerm,
    productData,
    currentPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
    filteredPosts,
    handleFormSubmit,
    filters,
    setFilters,
    filterTerms,
    setFilteredTerms} = useContext(SearchContext);

  // const handleFilterChange = (e) => {
    // checked logic
    // const filterItems = filters.map(filter => filter.id === e.target.id ? {...filter, completed: !filter.completed} : filter)
    // setFilters(filterItems); 


    // take filter items => updated completed filters
    // map through
    // filter completed, check filterTerms for filter => do nothing if it is there, if not there, add it
    // filter not completed check filter terms for filter => if there remove it, if not there, do nothing

    // const meow = () => {
    //   filterTerms.length = 0 ? [...filterTerms, e.target.id]
    // } 

    // filtering logic
    // const newFilteredTerms = [...filterTerms, ]; 
    // setFilteredTerms(newFilteredTerms);
    // console.log(newFilteredTerms)
    // setCurrentPage(1);
  // };
  return (
    <form onSubmit={handleFormSubmit}>
        <div className="border border-red-500">
          {filters.map((filter, index) => <span key={index} className="block">{filter.text} <input type="checkbox" checked={filter.completed} id={filter.id} /></span>)}
        </div>
    </form>
  )
}

export default SearchPageFilter