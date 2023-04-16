import { useContext } from "react";
import SearchContext from "../../Context/SearchContext/SearchContext";

export default function HomeCard(props) {
  const { title, imageSrc, alt } = props;
  const {handleLink} = useContext(SearchContext)

  return (
    <div>
        <div className="flex justify-center">
        <div className="rounded-full border-[3px] p-2 border-[#4bb9e3] h-20 w-20 md:h-36 md:w-36 hover:cursor-pointer" onClick={handleLink}>
        <img id={title} className="h-full mx-auto" width={'70%'} src={imageSrc} alt={alt} />
        </div>
        </div>
    </div>
  );
}
