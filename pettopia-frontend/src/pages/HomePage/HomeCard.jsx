export default function HomeCard(props) {
  const { title, imageSrc, alt } = props;

  return (
    <div className='card w-96 bg-base-100 shadow-xl image-full'>
      <figure>
        <img src={imageSrc} alt={alt} />
      </figure>
      <div className='card-body items-center'>
        <p className='card-title place-items-center text-center'>{title}</p>
      </div>
    </div>
  );
}
