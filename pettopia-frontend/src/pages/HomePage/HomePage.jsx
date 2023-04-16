import HomeCard from './HomeCard';
import ReviewsCard from './ReviewsSection';
import CarouselItem from './carouselItems';
import { HomePageData } from './HomePageData';
import SearchPageListItem from '../SearchPage/MainContent/SearchPageListItem';
import { useState } from 'react';
import BestRatedProducts from './BestRatedProducts';

export default function HomePage() {
  const [bestRatedTreatsCurrentPage, setBestRatedTreatsCurrentPage] =
    useState(1);
    const [bestRatedFoodCurrentPage, setBestRatedFoodCurrentPage] =
    useState(1);
    const [bestRatedToysCurrentPage, setBestRatedToysCurrentPage] =
    useState(1);
  
  return (
    <>
      <section className='mt-8 select-none'>
        <img
          className='w-full max-h-[450px] object-cover'
          src='/PetTopia.png'
          alt='Pettopia'
          style={{ objectPosition: '75% 30%' }}
          height={'600px'}
          width={'1200px'}
        />
      </section>

      <div className='w-[95%] md:w-[90%] lg:w-[70%] m-auto pt-12 pb-5 my-2 select-none'>
        <div className='grid grid-cols-3'>
          <HomeCard title='Food' imageSrc='/foodbowl.svg' alt='Food' />
          <HomeCard title='Toys' imageSrc='/toy-pic.svg' alt='Toys' />
          <HomeCard title='Treats' imageSrc='/treat-pic.svg' alt='Treats' />
        </div>
      </div>


    <div className='select-none w-[95%] lg:w-[100%] mx-auto'>
      <BestRatedProducts HomePageData={HomePageData} page={bestRatedFoodCurrentPage} num={1} setPage={setBestRatedFoodCurrentPage} h2Text={'Best Rated Food'}/>
      <BestRatedProducts HomePageData={HomePageData} page={bestRatedToysCurrentPage} num={2} setPage={setBestRatedToysCurrentPage} h2Text={'Best Rated Toys'}/>
      <BestRatedProducts HomePageData={HomePageData} page={bestRatedTreatsCurrentPage} num={0} setPage={setBestRatedTreatsCurrentPage} h2Text={'Best Rated Treats'}/>
    </div>
    </>
  );
}
