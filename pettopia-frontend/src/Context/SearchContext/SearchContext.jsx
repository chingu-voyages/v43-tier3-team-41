import { createContext, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import AppContext from "../../AppContext";

const SearchContext = createContext({});

export const SearchProvider = ({children}) => {
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);
    const [filterTerms, setFilteredTerms] = useState([]);
    const { authToken } = useContext(AppContext);
    const [filters, setFilters] = useState([
      {
        id: 'Dog Treats', text: 'Dog Treats', completed: false 
      },
      {
        id: 'Soft and Chewy Dog Treats', text: 'Soft/Chewy Dog Treats', completed: false 
      },
      {
        id: 'Dog Treats', text: 'Dog Treats', completed: false 
      },
      {
        id: 'Dog Treats', text: 'Dog Treats', completed: false 
      },

    ])

    const filteredPosts = productData.filter(item => filterTerms.every(element => item.categories.includes(element)))
  
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);
    const API_URL = 'https://pettopia-backend.onrender.com/api/v1';

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(API_URL + '/products');
            const data = await response.json();
            setProductData(data.products);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);

      const handleAddToCart = async (item) => {
        await fetch(`${API_URL}/cart/add/${item.productId}`, {
          method: 'POST',
           headers: { 
             'Content-Type': 'application/json',
             'Authorization': authToken
            },
           body: JSON.stringify({})
       })
      }
    
    const [searchTerm, setSearchTerm] = useState('');
    const [capturedSearchTerm, setCapturedSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setCapturedSearchTerm(searchTerm);
        setSearchTerm('');
        navigate('/search');
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();
    }

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
            currentPage,
            filteredPosts,
            handleFormSubmit,
            filters,
            setFilters,
            filterTerms,
            setFilteredTerms,
            handleAddToCart
        }}>
            {children}
        </SearchContext.Provider>
    )
}


export default SearchContext; 