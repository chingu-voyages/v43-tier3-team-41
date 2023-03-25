export default function CarouselItem(props) {
  const { src, alt } = props;
  return (
    <div className='carousel-item'>
      <img src={src} alt={alt} />
    </div>
  );
}
