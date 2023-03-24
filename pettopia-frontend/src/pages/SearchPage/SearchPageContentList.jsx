import SearchPageListItem from "./SearchPageListItem"


const SearchPageContentList = ({searchPageItems}) => {
  return (
        <ul className="grid grid-cols-3 gap-3">
            {searchPageItems.map((item) => {
                return <SearchPageListItem 
                item={item}
                /> 
            })}
        </ul>
  )
}

export default SearchPageContentList