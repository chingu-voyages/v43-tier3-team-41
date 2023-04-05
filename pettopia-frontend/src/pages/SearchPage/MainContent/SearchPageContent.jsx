import SearchPageContentList from './SearchPageContentList';
import SearchPageFilter from '../Filter/SearchPageFilter';
import Pagination from '../Pagination/Pagination';

const SearchPageContent = () => {
  return (
    <main className='flex flex-col mt-5'>
      <SearchPageFilter />
      <SearchPageContentList />
      <Pagination />
    </main>
  );
};

export default SearchPageContent;
