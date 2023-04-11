import React from 'react';

const NavBarShopCartItem = ({item}) => {
  return (
    <div className='flex p-2'>
      <img className='w-24' alt={item.product.name} src={item.product.imageUrl} />
      <div className='p-1'>
      <p className='mb-1'> {item.product.name} </p>
      <div><span>Quantity: {item.quantity} </span></div>
      </div>
    </div>
  );
};

export default NavBarShopCartItem;
