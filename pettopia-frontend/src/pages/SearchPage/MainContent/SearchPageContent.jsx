import SearchPageContentList from './SearchPageContentList';
import SearchPageFilter from '../Filter/SearchPageFilter';
import Pagination from '../Pagination/Pagination';

const SearchPageContent = ({
  filteredItems,
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  return (
    <main className='flex flex-col mt-5'>
      <SearchPageFilter />
      <SearchPageContentList filteredItems={filteredItems} />
      <Pagination
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </main>
  );
};

export default SearchPageContent;
