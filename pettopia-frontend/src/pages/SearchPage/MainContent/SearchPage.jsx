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
    <div>
        <SearchPageContent />
    </div>
  );
};

export default SearchPage;
