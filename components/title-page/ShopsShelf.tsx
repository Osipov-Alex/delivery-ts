import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch} from '../../redux/hook';
import { ProductCard } from './ProductCard';
import { axiosProducts } from '../../redux/slice/productSlice';

const ShopsShelf: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(axiosProducts());
  }, [dispatch]);

  const products = useAppSelector(state => state.products.products)
  const currentShop = useAppSelector(state => state.shops.currentShop)

  const productsToRender = products.filter(product => {
    return product.shop === currentShop
  })

  return (
    <div className="w-5/6 pr-2 min-h-max">
      <div className="border-main flex flex-wrap overflow-auto bg-gray-200 h-full">
        {currentShop === '' ? <div className='text-3xl w-full h-full flex items-center justify-center'>Choose your destiny!</div> : null}
        {productsToRender.map(product => 
          <ProductCard product={product} key={product._id} />)}
      </div>
    </div>
  )
}

export default ShopsShelf