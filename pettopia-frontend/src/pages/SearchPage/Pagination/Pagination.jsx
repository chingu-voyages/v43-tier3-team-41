import { useContext } from 'react';
import SearchContext from '../../../Context/SearchContext/SearchContext';

const Pagination = () => {
  const { filteredPosts, postsPerPage, setCurrentPage, currentPage } =
    useContext(SearchContext);

  let pages = [];

  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className='grid grid-cols-1'>
      <div className='btn-group inline-block mx-auto'>
          <button
            className='btn'
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            «
          </button>
          <button className='btn btn-primary'>{currentPage}</button>
          <button
            className='btn'
            onClick={() =>
              currentPage < pages.length && setCurrentPage(currentPage + 1)
            }
          >
            »
          </button>
        </div>
    </div>
  );
};

/* <div className='mx-auto mt-5'>
      <div className='btn-group'>
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? 'btn btn-active' : 'btn'}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div> */

// <div className='dropdown dropdown-end ml-3'>
// <label
//   tabIndex={0}
//   className='btn btn-outline transition ease-in-out delay-80 hover:-translate-y-1 hover:scale-110 hover:bg-inherit hover:border-inherit duration-300 ... text-red-500'
// >
//   {currentPage}
// </label>
// <ul
//   tabIndex={0}
//   className='dropdown-content mt-1 w-40 max-h-96 overflow-y-auto menu-compact p-2 bg-base-200 shadow rounded-box'
// >
//   {pages.map((page, i) => (
//     <li key={i}>
//       <button
//         onClick={() => setCurrentPage(page)}
//         className={page === currentPage ? 'btn btn-active' : 'btn'}
//       >
//         {page}
//       </button>
//     </li>
//   ))}
// </ul>
// </div>

export default Pagination;
