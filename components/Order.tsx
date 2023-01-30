import { FC } from 'react';
import { IOrder } from '../types';
import OrderProductCard from './OrderProductCard';

interface IOrderProps {
  order: IOrder;
}

const Order: FC<IOrderProps> = ({ order}) => {
  
  const { totalPrice, shop, products } = order;

  return (
    <div>
      <div className='overflow-scroll flex space-x-1'>
        <div className='w-5/6 flex flex-wrap'>
          {products.map((product) => {
            return <OrderProductCard product={product} key={product._id} />
          })}
        </div>
        <div className='h-28 border-main w-1/6 flex flex-col items-center justify-around text-2xl p-1 mt-0.5'>
          <span>Price: <span className=''>{totalPrice}</span></span>
          <div className='border border-black m-1 w-full'></div>
          <span>Shop: <span className=''>{shop}</span></span>
        </div>
      </div>
      <div className='border-b-2 border-black m-1'></div>
    </div>
  )
}

export default Order