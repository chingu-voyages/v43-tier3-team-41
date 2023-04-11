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
    <form onSubmit={handleFormSubmit} className="select-none border-b-2 border-gray-300">
        <div>
          <h3 className="font-medium"> Pet Type: </h3>
            {filters.map((filter, index) => filter.label === 'PetType' && <span key={index} className="flex p-4 justify-between">{filter.text} <label htmlFor={filter.id}><input type="checkbox" checked={filter.completed} id={filter.id} onChange={handleFilterChange} /></label></span>)}
          
          <h3 className="font-medium"> Product Type: </h3>

          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title">
              Food
            </div>
            <div className="collapse-content">
            {filters.map((filter, index) => filter.label === 'Food' && <span key={index} className="flex p-4 justify-between">{filter.text} <label htmlFor={filter.id}><input type="checkbox" checked={filter.completed} id={filter.id} onChange={handleFilterChange} /></label></span>)}
            </div>
          </div>

          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title">
              Treats
            </div>
            <div className="collapse-content">
            {filters.map((filter, index) => filter.label === 'Treats' && <span key={index} className="flex p-4 justify-between">{filter.text} <label htmlFor={filter.id}><input type="checkbox" checked={filter.completed} id={filter.id} onChange={handleFilterChange} /></label></span>)}
            </div>
          </div>

          <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title">
              Toys
            </div>
            <div className="collapse-content">
            {filters.map((filter, index) => filter.label === 'Toys' && <span key={index} className="flex p-4 justify-between">{filter.text} <label htmlFor={filter.id}><input type="checkbox" checked={filter.completed} id={filter.id} onChange={handleFilterChange} /></label></span>)}
            </div>
          </div>
        </div>

    </form>
  )
}

export default SearchPageFilter
