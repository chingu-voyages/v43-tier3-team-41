import SearchPageContentList from './SearchPageContentList';
import SearchPageFilter from '../Filter/SearchPageFilter';
import Pagination from '../Pagination/Pagination';
import { useContext } from 'react';
import SearchContext from '../../../Context/SearchContext/SearchContext';

const SearchPageContent = () => {
  const {fetchingData} = useContext(SearchContext);
  return (
    <main className='flex flex-col mt-5 select-none'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-3'> <SearchPageFilter /></div>
        <div className='col-span-9'>{fetchingData ? <p className='text-center text-2xl'>Loading Products...</p> : <SearchPageContentList /> }</div>
      </div>
      <Pagination />
    </main>
  );
};

export default SearchPageContent;
