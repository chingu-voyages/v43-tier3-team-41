import SearchPageListItem from './SearchPageListItem';
import SearchContext from '../../../Context/SearchContext/SearchContext';
import { useContext } from 'react';

const SearchPageContentList = () => {
  const {currentPosts} = useContext(SearchContext);
  return (
    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      {currentPosts.map((item) => {
        return <SearchPageListItem item={item} />;
      })}
    </ul>
  );
};

export default SearchPageContentList;
