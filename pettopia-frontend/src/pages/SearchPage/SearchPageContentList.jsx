import SearchPageListItem from "./SearchPageListItem"


const SearchPageContentList = ({filteredItems}) => {
  return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredItems.map((item) => {
                return <SearchPageListItem 
                item={item}
                /> 
            })}
        </ul>
  )
}

export default SearchPageContentList