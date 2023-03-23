import SearchPageContentList from "./SearchPageContentList"
import SearchPageFilter from "./SearchPageFilter"

const SearchPageContent = ({searchPageItems}) => {
  return (
    <main className="flex mt-4">
        <SearchPageFilter /> 
        <SearchPageContentList
         searchPageItems={searchPageItems}
         />
    </main>
  )
}

export default SearchPageContent