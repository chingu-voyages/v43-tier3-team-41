const SearchPageListItem = ({ item }) => {
  const splitName = item.name.split(' ');
  const defaultBrand =
    splitName[0] === 'Pet' ||
    splitName[0] === 'The' ||
    splitName[0] === 'Vibrant'
      ? `${splitName[0]} ${splitName[1]}`
      : splitName[0];
  const description = splitName.filter((item) => item !== defaultBrand).join(' ');
  

  return (
    <li key={item.id}>
      <div className='card w-[100%] bg-base-100 shadow-xl h-84'>
        <figure>
          <img src={item.mainImageUrl} alt={item.name} />
        </figure>
        <div className='card-body min-h-[190px]'>
          <h2 className='card-title'>
            {`${item.brand ?? defaultBrand}`}
            <div className='badge badge-secondary'>{`$${item.price}`}</div>
          </h2>
          <p className='card-paragraph'>
            {' '}
            {`${
              description.length > 50
                ? description.slice(0, 50) + '...'
                : description
            }`}{' '}
          </p>
          <p>{item.description}</p>
          <div className='card-actions justify-end'>
            <div className='badge badge-outline'>{item.categories[item.categories.length - 1] ?? 'Dogs'}</div>
            
            {/* Show all Categories as badges */}
            {/* {item.categories.map((category, index) => {
                return(
                  <div key={index} className='badge badge-outline'>{category.length > 10 ? category.slice(0,15) + '...' : category}</div>
                )
              })
            } */}
          </div>
        </div>
      </div>
    </li>
  );
};

export default SearchPageListItem;
