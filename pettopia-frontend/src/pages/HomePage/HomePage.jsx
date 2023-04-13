import HomeCard from './HomeCard';
import ReviewsCard from './ReviewsSection';
import CarouselItem from './carouselItems';

export default function HomePage() {
  return (
    <section>

      <section className='mt-5'>
          <img className=' w-full max-h-[450px] object-cover' src='/PetTopia.png' alt="Pettopia" style={{objectPosition: '75% 30%'}}/>
      </section>
      
      <div className='w-[95%] md:w-[90%] lg:w-[70%] m-auto py-5 my-2'>
      <div className='grid grid-cols-3'>
        <HomeCard
          title='Food'
          imageSrc='/foodbowl.svg'
          alt='Food'
        />
        <HomeCard
          title='Toys'
          imageSrc='/toy-pic.svg'
          alt='Toys'
        />
        <HomeCard
          title='Treats'
          imageSrc='/treat-pic.svg'
          alt='Treats'
        />
      </div>
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
    </section>
  );
}
