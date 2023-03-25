const SearchPageListItem = ({item}) => {
    
    const brand = item.name.split(' ')
    const meow = brand[0]
    const rawr = brand.filter(item => item !== meow).join(' ')
    console.log(meow)
    console.log(rawr)


  return (
    <li key={item.id}>
      <div className='card w-84 bg-base-100 shadow-xl h-84'>
        <figure>
          <img className=""
            src={item.imageUrl}
            alt='Shoes'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>
            {`${meow}`}
            <div className='badge badge-secondary'>{`$${item.price}`}</div>
          </h2>
          <p className="card-paragraph"> {`${rawr.length > 50 ? rawr.slice(0, 50) + '...' : rawr}`} </p>
          <p>{item.description}</p>
          <div className='card-actions justify-end'>
            <div className='badge badge-outline'>Fashion</div>
            <div className='badge badge-outline'>Products</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SearchPageListItem;
