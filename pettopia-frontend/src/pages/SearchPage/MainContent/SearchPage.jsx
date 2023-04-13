import { useEffect, useState } from 'react';
import SearchPageContent from './SearchPageContent';
import { useContext } from 'react';
import SearchContext from '../../../Context/SearchContext/SearchContext';

const SearchPage = () => {
  // const {productData} = useContext(SearchContext);
  // const {allBrands, setAllBrands} = useState([]);

  // useEffect(() => {
  //   let tempAllBrands = []; 
  //   if(productData.length > 0){
  //     productData.forEach(element => {
  //       tempAllBrands.push(element.brand);
  //     });
  //   }

  //   setAllBrands([...tempAllBrands])
    
  // }, [productData])

  // useEffect(() => {
  //   console.log(allBrands)
  // }, [allBrands])

  return (
    <div>
        <SearchPageContent />
    </div>
  );
};

export default SearchPage;
