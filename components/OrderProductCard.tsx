import { FC } from 'react';
import { IProduct } from '../types';

interface IOrderProductCardProps {
  product: IProduct
}

const OrderProductCard: FC<IOrderProductCardProps> = ({ product }) => {

  const { productName, quantity, image } = product;

  return (
    <div className='w-1/5'>
      <div className='border-main flex flex-col m-0.5 p-0.5 bg-gray-100'>
        <div>
          <img className='border border-black w-full bg-white h-28 rounded-lg' src={"http://localhost:5000/" + image} alt='' />
        </div>
        <div className='flex items-center justify-center py-1 space-x-1 text-xl'>
          <span>{productName}</span><span>&#215;</span><span>{quantity}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderProductCard