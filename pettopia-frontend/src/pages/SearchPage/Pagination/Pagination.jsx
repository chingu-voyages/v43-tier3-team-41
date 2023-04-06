import { useContext } from "react";
import SearchContext from "../../../Context/SearchContext/SearchContext";

const Pagination = () => {
  const {productData, postsPerPage, setCurrentPage, currentPage} = useContext(SearchContext);

  let pages = [];

  for (let i = 1; i <= Math.ceil(productData.length / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className='mx-auto mt-5'>
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
    </div>
  );
};

export default Pagination;
