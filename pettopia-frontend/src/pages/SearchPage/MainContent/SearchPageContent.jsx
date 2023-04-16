import SearchPageContentList from './SearchPageContentList';
import SearchPageFilter from '../Filter/SearchPageFilter';
import Pagination from '../Pagination/Pagination';
import { useContext } from 'react';
import SearchContext from '../../../Context/SearchContext/SearchContext';

const SearchPageContent = () => {
  const {fetchingData, productFetchingError} = useContext(SearchContext);
  return (
    <main className='w-[95%] mt-5'>
      <div className='grid grid-cols-1 min-[600px]:grid-cols-2 min-[1000px]:grid-cols-3 lg:grid-cols-4'>
        <div className='w-[90%] mx-auto'>
           <SearchPageFilter className=''/>
        </div>

        <div className='min-[1000px]:grid min-[1000px]:col-span-2 lg:col-span-3'>
          {productFetchingError && <p className='text-center text-2xl'> Sorry, There was an error retrieving the products. Please Try Again. </p>}
          {fetchingData && !productFetchingError && <p className='text-center text-2xl'>Loading Products...</p>}
          {!fetchingData && <SearchPageContentList /> }
        </div>
      </div>
      <Pagination />
    </main>
  );
};

export default SearchPageContent;