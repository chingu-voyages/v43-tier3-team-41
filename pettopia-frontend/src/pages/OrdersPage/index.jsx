import { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import AppContext from '../../AppContext';
export default function Orders(){
	const { authToken, backendUrl } = useContext(AppContext);
	const [orders, setOrders] = useState([]);
	const navigate = useNavigate();
	useEffect(() =>{
		if(localStorage.getItem("token") == null){
			navigate('/login', {state : {url:'/orders'}})
		}
		else{
				fetch(`${backendUrl}/api/v1/orders`, {
			method:"GET",
			headers:{
							'Content-Type': 'application/json', 
			        'Authorization':localStorage.getItem("token")
						},
		})
		.then(res =>res.json())
		.then(data =>{
			setOrders(data.orders);
			console.log(data.orders)
		})
		.catch(err => console.log(err))	
		}
		
	}, [])
	const getOrderTotal = (order) =>{
		if(order.cart.items.length > 0){
			const sum = order.cart.items.reduce(((totalPrice, obj) => totalPrice + obj.product.price*obj.quantity), 0)
			console.log(`sum is ${sum}`);
			return sum;
		}
		return 0;
	}

	return (
		<div className="container my-12 mx-auto px-4 md:px-12">
			<div className="flex flex-wrap gap-3 -mx-1 lg:-mx-4">
			{orders ? 
			orders.map((order, index) =>{
				return (
					 	<div className="flex flex-col gap-5 border-solid py-2 px-5 border-2 border-sky-500">
					 		<div className="text-center">{`Order #${index + 1}`}</div>
					 		{/*<div>{order.created_at}</div>*/}
					 		<div className="flex flex-col gap-1">
					 			<h3 className="font-bold">Products:</h3>
					 			{order.cart.map(item =>
					 				(
					 					<div className="flex gap-3">
					 						<div></div>
					 						<div>{`${item.product.name}`}</div>
					 						<div>x</div>
					 						<div>{`${item.quantity}`}</div>
					 					</div>
					 					)
					 			)}
					 		</div>
					 		
					 		<div className="font-bold text-center">{`Total : $ ${order.total.toFixed(2)}`}</div>
					 	</div>
					 		
					 )
			}) : <></>}
			</div>
		</div>)
}