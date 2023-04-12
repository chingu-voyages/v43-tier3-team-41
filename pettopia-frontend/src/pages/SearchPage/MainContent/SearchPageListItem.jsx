import { useContext } from "react";
import SearchContext from "../../../Context/SearchContext/SearchContext";

const SearchPageListItem = ({ item }) => {
  const splitName = item.name.split(' ');
  const defaultBrand =
    splitName[0] === 'Pet' ||
    splitName[0] === 'The' ||
    splitName[0] === 'Vibrant'
      ? `${splitName[0]} ${splitName[1]}`
      : splitName[0];
  const description = splitName.filter((item) => item !== defaultBrand).join(' ');
  
  const {handleAddToCart} = useContext(SearchContext);

  return (
    <li key={item.productId}>
      <div className='card w-[100%] bg-base-100 shadow-xl h-84 group/item'>
        <figure>
          <img src={item.mainImageUrl} alt={item.name} />
        </figure>
        <div className='card-body gap-0 md:min-h-[234px]'>
          <h2 className='card-title'>
            {`${item.brand ?? defaultBrand}`}
            <div className='badge badge-secondary'>{`$${item.price}`}</div>
          </h2>
          <p className='card-paragraph py-1'>
            {`${
              description.length > 50
                ? description.slice(0, 50) + '...'
                : description
            }`}
          </p>
          <p>{item.description}</p>
          <div className='card-actions pb-2 border-2 border-b-gray-200 border-t-0 border-l-0 border-r-0'>
            <div className='badge border-none badge-outline pl-0'>{item.categories[item.categories.length - 1] ?? 'Dogs'}</div>
          </div>
          <div className="mt-2 w-[60%]"><button className="btn btn-primary normal-case"onClick={() => handleAddToCart(item)}> 
          <label tabIndex={0} className="mr-1">
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#F3EEEE'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
            </label> Add To Cart </button></div>
        </div>
      </div>
    </li>
  );
};

export default SearchPageListItem;
