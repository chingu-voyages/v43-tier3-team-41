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
        : <ul className='min-[1000px]:grid min-[1000px]:grid-cols-2 min-[1000px]:gap-3 min-[1300px]:grid-cols-3'>
            {currentPosts.map((item) => {
              return <SearchPageListItem item={item} />;
            })}
          </ul>
      }
    </>
  );
};

export default SearchPageContentList;
