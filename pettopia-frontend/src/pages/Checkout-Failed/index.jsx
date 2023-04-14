import { Link } from 'react-router-dom'
export default function CheckoutFailed(){
    return (
    <div>
        <h1>Order Placed!! Checkout Failed</h1>
        <Link to='cart'><button>Retry from cart</button></Link>
    </div>)
}