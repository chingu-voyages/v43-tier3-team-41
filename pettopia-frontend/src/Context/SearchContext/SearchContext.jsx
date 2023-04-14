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
    const [productFetchingError, setProductFetchingError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { authToken, getCart} = useContext(AppContext);
    const [cartItems, setCartItems] = useState([]);
    const filteredPosts = productData.filter(item => filterTerms.every(element => item.categories.includes(element) || item.brand.includes(element)))
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);
    const [fetchingData, setFetchingData] = useState(false);
    const API_URL = 'https://pettopia-backend.onrender.com/api/v1';
    
    const [filters, setFilters] = useState([
      {
        id: 'Dogs', text: 'Dog', completed: false, label: 'PetType',
        petType: 'Dogs',
      },
      {
        id: 'Dog Treats', text: 'All Treats', completed: false, label: 'Treats',
        petType: 'Dogs',
        productType: 'Treat',
      },
      {
        id: 'Soft and Chewy Dog Treats', text: 'Soft/Chewy Treats', completed: false, label: 'Treats',
        petType: 'Dogs',
        productType: 'Treat'
      },
      {
        id: 'Dog Bones and Chews', text: 'Dog Bones and Chews', completed: false, label: 'Treats',
        petType: 'Dogs',
        productType: 'Treat',
      },
      {
        id: 'Dog Food', text: 'All Food', completed: false, label: 'Food',
        petType: 'Dogs',
        productType: 'Food',
        foodType: 'All Food' 
      },
      {
        id: 'Dry Dog Food', text: 'Dry Food', completed: false, label: 'Food',
        petType: 'Dogs',
        productType: 'Food',
        foodType: 'Dry Dog Food' 
      },
      {
        id: 'Wet Dog Food', text: 'Wet Food', completed: false, label: 'Food',
        petType: 'Dogs',
        productType: 'Food',
        foodType: 'Wet Dog Food' 
      },
      {
        id: 'Dog Toys', text: 'All Toys', completed: false, label: 'Toys',
        petType: 'Dogs',
        productType: 'Toys',
      },
      {
        id: 'Purina', text: 'Purina', completed: false, label: 'PetType',
        petType: 'Dogs',
      },
    ])

    const getAllProducts = () => {

      const filterItems = filters.map(filter => filter.completed === true ? {...filter, completed: !filter.completed} : filter)
      setFilters(filterItems);

      setFilteredTerms([])

      const fetchingAllProducts = async () => {
        try {
          setFetchingData(true);
          const response = await fetch(API_URL + '/products');
          const data = await response.json();
          setProductData(data.products);
          setFetchingData(false);
          setProductFetchingError(false);
          console.log('fetching all the products')
        } catch (error) {
          setProductFetchingError(true);
        }
      }

      fetchingAllProducts()
    };


    useEffect(() => {
        if(localStorage.getItem('token') !== null){
          getCart(setCartItems);
        }
      }, []);

      const handleAddToCart = async (item) => {
        
        if(localStorage.getItem('token') === null){
          navigate('/login')	
        } else {
          await fetch(`${API_URL}/cart/add/${item.productId}`, {
            method: 'POST',
             headers: { 
               'Content-Type': 'application/json',
               'Authorization': localStorage.getItem('token')
              },
             body: JSON.stringify({})
         })
  
         getCart(setCartItems);
        }
      }

    const handleSearchTermSubmit = async(e) => {
        e.preventDefault();
        try {
          setFetchingData(true);
          const response = await fetch(`${API_URL}/products?q=${searchTerm}`);
          const data = await response.json()
          setProductData(data.products);
          setFetchingData(false);
          setProductFetchingError(false);
        } catch (error) {
          console.log(error)
          setProductFetchingError(true);
        }
        setSearchTerm('');
        navigate('/search')
    };

    const handleLink = async(e) => {
      e.preventDefault();
      try {
        setFetchingData(true);
        const response = await fetch(`${API_URL}/products?q=${e.target.id}`);
        const data = await response.json()
        setProductData(data.products);
        setFetchingData(false);
        setProductFetchingError(false);
        console.log('handling the link')
      } catch (error) {
        console.log(error)
        setProductFetchingError(true);
      }
      navigate('/search')
  };

    

    const handleFormSubmit = (e) => {
      e.preventDefault();
    }

    return(
        <SearchContext.Provider value={{
            handleSearchTermSubmit,
            searchTerm, 
            setSearchTerm,
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
            handleAddToCart,
            cartItems,
            setCartItems,
            fetchingData,
            getAllProducts,
            productFetchingError,
            handleLink
        }}>
            {children}
        </SearchContext.Provider>
    )
}


export default SearchContext; 