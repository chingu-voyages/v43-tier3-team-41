import SearchPageContentList from './SearchPageContentList';
import SearchPageFilter from './SearchPageFilter';

const SearchPageContent = ({ filteredItems }) => {
  return (
    <main className='flex mt-4'>
      <SearchPageFilter />
      <SearchPageContentList filteredItems={filteredItems} />
    </main>
  );
};

export default SearchPageContent;
