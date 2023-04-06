import { createContext, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const SearchContext = createContext({});

export const SearchProvider = ({children}) => {
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);
  
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = productData.slice(firstPostIndex, lastPostIndex);
    const API_URL = 'https://pettopia-backend.onrender.com/api/v1/products';

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setProductData(data.products);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [capturedSearchTerm, setCapturedSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setCapturedSearchTerm(searchTerm);
        setSearchTerm('');
        navigate('/search');
    };

    return(
        <SearchContext.Provider value={{
            handleSubmit,
            searchTerm, 
            setSearchTerm,
            capturedSearchTerm,
            productData,
            currentPosts,
            postsPerPage,
            setCurrentPage,
            currentPage
        }}>
            {children}
        </SearchContext.Provider>
    )
}


export default SearchContext; 