import { FC, useState } from 'react'
import { useAppDispatch } from '../../redux/hook';
import { selectedShop } from '../../redux/slice/shopsSlice';
import { IShop } from '../../types';

interface ShopProps {
  shop: IShop;
}

const Shop: FC<ShopProps> = ({ shop }) => {
  const dispatch = useAppDispatch()

  const handlerShop = () => {
    dispatch(selectedShop(shop.shopName))
  }

  return (
    <div className='border-main text-center w-2/3 my-2 h-12 flex items-center'>
      <button className= 'w-full h-full text-2xl button-hover' onClick={() => handlerShop()}>
        {shop.shopName}
      </button>
    </div>
  )
}

export default Shop
