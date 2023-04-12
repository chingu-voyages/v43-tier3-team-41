import SearchPageListItem from './SearchPageListItem';
import SearchContext from '../../../Context/SearchContext/SearchContext';
import { useContext } from 'react';

const SearchPageContentList = () => {
  const {currentPosts, getAllProducts} = useContext(SearchContext);
  return (
    <>
      {currentPosts.length === 0 ? 
        <div className='text-center'>
          <h1 className='font-medium text-2xl'> No Products to Display</h1>
          <p className='text-xl'>Click <button className="text-primary text-xl" onClick={() => getAllProducts()}>Here</button> to go to all products...</p>
        </div>
        : <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {currentPosts.map((item) => {
              return <SearchPageListItem item={item} />;
            })}
          </ul>
      }
    </>
  );
};

export default SearchPageContentList;
