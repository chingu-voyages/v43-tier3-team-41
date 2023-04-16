import { useEffect, useState } from 'react';
import SearchPageContent from './SearchPageContent';
import { useContext } from 'react';
import SearchContext from '../../../Context/SearchContext/SearchContext';

const SearchPage = () => {
  const {getAllProducts} = useContext(SearchContext);

  useEffect(()=>{
    getAllProducts()
  }, [])

  return (
    <div className='flex justify-center'>
        <SearchPageContent />
    </div>
  );
};

export default SearchPage;
