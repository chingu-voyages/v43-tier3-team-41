import { Link } from 'react-router-dom'
export default function CheckoutSuccess(){
    return (
    <div>
        <h1>Order Placed!! Checkout was successful</h1>
        <Link to='orders'><button>View All Orders</button></Link>
    </div>)
}