import { FC, useEffect } from 'react';
import Order from '../../components/Order';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { axiosOrderHistory } from '../../redux/slice/orderSlice';

const index: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(axiosOrderHistory())
  }, [dispatch])

  const orders = useAppSelector(state => state.order.orderList);

  return (
    <div className='w-full h-content-height flex justify-center p-0.5' >
      <div className='border-main w-3/4 flex flex-col space-y-1 p-1 bg-gray-200 overflow-auto'>
        {orders.map((order) => 
          <Order key={order._id} order={order} />
        )}
      </div>
    </div>
  )
}

export default index