import { useContext } from "react";
import SearchContext from "../../../Context/SearchContext/SearchContext";

const SearchPageFilter = () => {
  const {
    handleFormSubmit,
    filters,
    setFilters,
    filterTerms,
    setFilteredTerms
  } = useContext(SearchContext);

    // filterTerms is initially an empty array that is used to curate our filtered posts.
 
  const handleFilterChange = (e) => {
    // Value to put in the setFilteredTerms(newFilterTerms) to help curate the posts
    let newFilterTerms;

  // checked logic

    // This grabs the enire array with the updated value
    const filterItems = filters.map(filter => filter.id === e.target.id ? {...filter, completed: !filter.completed} : filter)
    setFilters(filterItems);

  // Filtering Logic 
    const filterInputClicked = filterItems.find(filter => filter.id === e.target.id)
    // This grabs the initial object of the filter that is clicked on. 

    //true false value used in if/else statement below
    const isFilterInputClicked = filterInputClicked.completed; 

    if(isFilterInputClicked) {
      newFilterTerms = [...filterTerms, filterInputClicked.id];
      setFilteredTerms(newFilterTerms)
    } else {
      newFilterTerms = filterTerms.filter(item => item !== filterInputClicked.id);
      setFilteredTerms(newFilterTerms)
    }

  };
  return (
    <form onSubmit={handleFormSubmit}>
        <div className="border border-red-500">
          {filters.map((filter, index) => <span key={index} className="block">{filter.text} <input type="checkbox" checked={filter.completed} id={filter.id} onChange={handleFilterChange} /></span>)}
        </div>
    </form>
  )
}

export default SearchPageFilter
