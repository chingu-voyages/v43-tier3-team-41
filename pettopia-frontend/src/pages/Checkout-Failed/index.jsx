import { Link } from 'react-router-dom'
export default function CheckoutFailed(){
    return (
        <div className='flex flex-col w-full items-center justify-between bg-white py-2 text-neutral-600'>
        <h1 className="mb-6 text-5xl font-bold">Order Cancelled!!</h1>
        <Link to='/cart'><div className='btn btn-primary'>Go back to Cart</div></Link>
    </div>)
}