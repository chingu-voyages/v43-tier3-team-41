export default function HomeCard(props) {
  const { title, imageSrc, alt } = props;

  return (
    <div>
        <div className="flex justify-center">
        <div className="rounded-full border-[3px] p-2 border-[#4bb9e3] h-36 w-36 hover:cursor-pointer">
        <img className="h-full mx-auto" width={'70%'} src={imageSrc} alt={alt} />
        </div>
        </div>
    </div>
  );
}
