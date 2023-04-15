import SearchPageListItem from "../SearchPage/MainContent/SearchPageListItem"

const BestRatedProducts = ({HomePageData, page, num, setPage, h2Text}) => {
    const pagination = (arr, currentPage, num) => {
        const lastPostIndex = currentPage * 4;
        const firstPostIndex = lastPostIndex - 4;
        const currentProducts = ( arr[num].slice(
            firstPostIndex,
            lastPostIndex
        ));

        return currentProducts; 
    }

    const bestRatedItemArr = [];
    for (let i = 1; i <= Math.ceil(HomePageData[num].length / 4); i++) {
        bestRatedItemArr.push(i);
    }

    const currentProducts = pagination(HomePageData, page, num)

  return (
    <>
      { HomePageData[num].length > 0 && 
      <>
        <div className='flex justify-between mt-3 mb-3'>
        <div className='my-auto'>
          <h2 className='text-primary'> {h2Text} </h2>
        </div>
        <div className='btn-group'>
          {bestRatedItemArr.map((pageChoice, index) => {
            return (
              <button
                key={index}
                onClick={() => setPage(pageChoice)}
                className={
                  pageChoice === page ? 'btn btn-active' : 'btn pag-btn'
                }
              >
                {pageChoice}
              </button>
            );
          })}
        </div>
      </div>
    
        <div className='grid grid-cols-4 grid-rows-1 gap-5'>
        {currentProducts.map((item, index) => (
          <SearchPageListItem key={index} item={item} />
        ))}
      </div>
      </>
      
      }
    
    </>
  )
}

export default BestRatedProducts