import SearchPageContentList from './SearchPageContentList';
import SearchPageFilter from '../Filter/SearchPageFilter';
import Pagination from '../Pagination/Pagination';

const SearchPageContent = () => {
  return (
    <main className='flex flex-col mt-5'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3'><SearchPageFilter /></div>
        <div className='col-span-9'><SearchPageContentList /></div>
      </div>
      <Pagination />
    </main>
  );
};

export default SearchPageContent;
