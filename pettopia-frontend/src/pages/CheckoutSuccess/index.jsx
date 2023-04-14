import { Link } from 'react-router-dom'
export default function CheckoutSuccess(){
    return (
    <div className='flex flex-col w-full items-center justify-between bg-white py-2 text-neutral-600'>
        <h1 className="mb-6 text-5xl font-bold">Order Placed!!</h1>
        <Link to='/orders'><div className='btn btn-primary'>View All Orders</div></Link>
    </div>)
}