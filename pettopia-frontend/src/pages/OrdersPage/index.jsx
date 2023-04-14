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
			<div className="flex flex-col gap-1">
			{orders ? 
			orders.map((order, index) =>{
				return (
					
					 	<div className="flex flex-col gap-1 border-solid py-2 px-5 border-2 border-sky-500">
					 		<div className="text-center font-large font-bold">{`Order #${index + 1}`}</div>
					 		<div className="font-bold text-center">{`Total : $ ${order.total.toFixed(2)}`}</div>
							<div>{`Status : ${order.status}`}</div>
							<div>{`Date : ${order.created_at}`}</div>
					 		<div tabIndex={0} className="flex flex-col gap-1 border border-base-300 bg-base-100 rounded-box group collapse collapse-arrow">
							<div class="collapse-title bg-primary text-primary-content">Products</div>
					 		<div className='collapse-content'>{order.cart.map(item =>
					 				(
					 					<div className="flex gap-3 collapse-content">
					 						<div></div>
					 						<div>{`${item.product.name}`}</div>
					 						<div>x</div>
					 						<div>{`${item.quantity}`}</div>
					 					</div>
					 					)
					 			)}</div>
									
					 		</div>
					 		
					 		
					 	</div>
					 		
					 )
			}) : <></>}
			</div>
		</div>)
}