import { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import AppContext from '../../AppContext';
export default function Orders(){
	const { authToken } = useContext(AppContext);
	const [orders, setOrders] = useState([]);
	const navigate = useNavigate();
	const backendUrl = 'https://pettopia-backend.onrender.com'
	useEffect(() =>{
		if(authToken == null){
			navigate('/login')
		}
		else{
				fetch(`${backendUrl}/api/v1/orders`, {
			method:"GET",
			headers:{
							'Content-Type': 'application/json', 
			        'Authorization':authToken
						}
		})
		.then(res =>res.json())
		.then(data =>{
			setOrders(data.orders);
			console.log(data.orders)
		})
		.catch(err => console.log(err))	
		}
		
	}, [])

	return (
		<div>
			Order Placed Successfully!!
		</div>)
}