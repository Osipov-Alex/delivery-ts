import { FC } from 'react';
import { ProductCard } from '../../components/title-page/ProductCard';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { clearCart } from '../../redux/slice/cartSlice';
import { toast } from 'react-toastify';
import { addNewOrder } from '../../redux/slice/orderSlice';

const index: FC = () => {
  
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.auth);
  // const { id } = useAppSelector(state => state.auth.user);
  const products = useAppSelector(state => state.cart.productsInCart);
  const shop = useAppSelector(state => state.shops.currentShop)

  const totalPrice = products.reduce((acc, curr) => {
    return acc + (curr.quantity * curr.price);
  }, 0);

  const handlerSubmit = () => {
    if (isAuth) {
      dispatch(addNewOrder ({ totalPrice: totalPrice, products: products, shop: shop }));
      dispatch(clearCart());
    } else {
      toast('Для покупки нужно войти или зарегестрироватся!');
    }
  };

  return (
    <div className='w-full h-content-height p-1 flex justify-items-center space-x-0.5'>
      <div className='border-main w-4/6 bg-gray-200 flex flex-wrap overflow-auto'>
        {products.map(product => 
          <ProductCard product={product} key={product._id} />
        )}
      </div>
      <div className='border-main w-2/6 bg-gray-200 flex flex-col'>
        <div className='h-5/6 flex flex-col items-center p-1'>
          <div className='border-main h-full w-full'></div>
        </div>
        <div className='h-1/6 flex items-center justify-around'>
          <div className='text-3xl'>
            <span>Total Price: </span><span>{totalPrice}</span>
          </div>
          <button className='border-item w-1/4 button-hover p-2 text-2xl' onClick={handlerSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default index