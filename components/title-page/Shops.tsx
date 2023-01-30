import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { axiosShops } from '../../redux/slice/shopsSlice';
import Shop from './Shop';


const Shops:FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(axiosShops());
  }, [dispatch]);

  const shops = useAppSelector(state => state.shops.shops)
  
  return (
    <div className="w-1/6 pl-2 min-h-max">
      <div className="border-main flex flex-col items-center bg-gray-200 h-full">
        <span className='font-bold text-xl my-3'>Shops:</span>
        {shops.map(shop => {
          return <Shop shop={shop} key={shop._id} />
        })}
      </div>
    </div>
  )
}

export default Shops
