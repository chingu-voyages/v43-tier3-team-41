import HomeCard from './HomeCard';
import ReviewsCard from './ReviewsSection';
import CarouselItem from './carouselItems';

export default function HomePage() {
  return (
    <>
      <div>
        <img src='https://picsum.photos/id/237/1200/300' alt='1024×320' />
      </div>
      <br />
      <div className='flex w-full gap-6'>
        <HomeCard
          title='Food'
          imageSrc='https://picsum.photos/2000/3000.jpg'
          alt='food'
        />
        <HomeCard
          title='Clothing'
          imageSrc='https://picsum.photos/2000/3000.jpg'
          alt='clothing'
        />
        <HomeCard
          title='Toys'
          imageSrc='https://picsum.photos/2000/3000.jpg'
          alt='toy'
        />
        <HomeCard
          title={
            <>
              Supplies
              <br />&<br /> Accessories
            </>
          }
          imageSrc='https://picsum.photos/2000/3000.jpg'
          alt='toys'
        />
      </div>

      <div className='grid grid-cols-3 gap-4'>
        <ReviewsCard
          title='Great Product!'
          body='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
          author='John Doe'
          imageUrl='https://picsum.photos/200'
        />
        <ReviewsCard
          title='Amazing Quality!'
          body='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
          author='Jane Smith'
          imageUrl='https://picsum.photos/200'
        />
        <ReviewsCard
          title='Great Customer Service!'
          body='Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
          author='Bob Johnson'
          imageUrl='https://picsum.photos/200'
        />
      </div>
      <div className='carousel carousel-center p-4 space-x-4 rounded-box'>
        <CarouselItem src='https://picsum.photos/id/27/500/320' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/124/400/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/412/200/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/14/600/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/92/350/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/152/400/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/921/250/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/125/380/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/112/500/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/53/370/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/21/580/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/912/380/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/125/430/300' alt='Burger' />
        <CarouselItem src='https://picsum.photos/id/583/420/300' alt='Burger' />
      </div>
    </>
  );
}
