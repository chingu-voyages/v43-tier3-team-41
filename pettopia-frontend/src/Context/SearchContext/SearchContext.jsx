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
    const API_URL = process.env.REACT_APP_URL+'/api/v1' //'https://pettopia-backend.onrender.com/api/v1';
    
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
        id: 'BARK', text: 'BARK', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: `Beggin'`, text: `Beggin'`, completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Blue Buffalo', text: 'Blue Buffalo', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Blue Dog Bakery', text: 'Blue Dog Bakery', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Canine Carry Outs', text: 'Canine Carry Outs', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Cesar', text: 'Cesar', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Chuckit!', text: 'Chuckit!', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Dog Chow', text: 'Dog Chow', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Gravy Train', text: 'Gravy Train', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Hartz', text: 'Hartz', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Hitt Brands', text: 'Hitt Brands', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Hyper Pet', text: 'Hyper Pet', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'IAMS', text: 'IAMS', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'JINX', text: 'JINX', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: `Kibbles 'N Bits`, text: 'TrustyPup', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'KONG', text: 'KONG', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'MASBRILL', text: 'MASBRILL', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Milk-Bone', text: 'Milk-Bone', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Moist & Meaty', text: 'Moist & Meaty', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Multipet', text: 'Multipet', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: `Nature's Recipe`, text: `Nature's Recipe`, completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Nerf Dog', text: 'Nerf Dog', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Nutrish', text: 'Nutrish', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Nylabone', text: 'Nylabone', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id:  `Ol' Roy`, text: `Ol' Roy`, completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Orijen', text: 'Orijen', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'PcEoTllar', text: 'PcEoTllar', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Pedigree', text: 'Pedigree', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Petstages', text: 'Petstages', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Pup-Peroni', text: 'Pup-Peroni', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Pure Balance', text: 'Pure Balance', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Purina', text: 'Purina', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Three Dog Bakery', text: 'Three Dog Bakery', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'TrustyPup', text: 'TrustyPup', completed: false, label: 'Brand',
        petType: 'Dogs',
      },
      {
        id: 'Vibrant Life', text: 'Vibrant Life', completed: false, label: 'Brand',
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
    console.log(`line 236 ${process.env.REACT_APP_URL}`)
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
