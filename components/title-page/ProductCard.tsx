import { FC } from 'react';
import { IProduct } from '../../types'
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { addProduct, increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/slice/cartSlice';

interface IProductCardProps {
  product: IProduct
}

export const ProductCard: FC<IProductCardProps> = ({ product }) => {

  const { productName, quantity, image, price, _id } = product
  
  const dispatch = useAppDispatch()
  const productsInCart = useAppSelector(state => state.cart.productsInCart)

  const handleAddToCard = () => {
    if (productsInCart.length === 0) {
      dispatch(addProduct(product));
      dispatch(increaseQuantity(_id))
    } else {
      let count = 0;
      for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].productName === product.productName) {
          count += 1
        };
      };
      if (!count) {
        dispatch(addProduct(product));
        dispatch(increaseQuantity(_id))
      };
    };
  }

  const handlerIncrease = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handlerDecrease = (id: string) => {
    if (quantity === 1) {
      dispatch(removeFromCart(id));
    }
    dispatch(decreaseQuantity(id));
  };

  const handlerRemove = (id: string) => {
    dispatch(removeFromCart(id));
  }

  return (
    <div className='flex w-1/3 h-1/2 p-1'>
      <div className='p-1 border-main flex flex-col justify-between w-full'>
        <div className='flex justify-center'>
          <img className='border border-black w-full bg-gray-100 h-56 rounded-lg' src={"http://localhost:5000/" + image} alt='' />
        </div>
        <div className='flex justify-between items-center'>
          <div>
            <span className='text-3xl'>{productName}</span>
          </div>
          <div>
            {quantity <= 1
              ? <span className='text-3xl'>{price}</span>
              : <span className='text-3xl'>{price * quantity}</span>
            }
          </div>
        </div>
        <div>
          {quantity === 0
            ? <button className='border-main text-2xl button-hover w-full h-16 box-border' onClick={() => handleAddToCard()}>
                Add to Card
              </button> 
            : <div className='flex w-full h-16 p-0.5 space-x-0.5'>
                <button className='h-full w-1/5 button-hover border-item flex justify-center items-center text-3xl' onClick={() => handlerIncrease(_id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                  </svg>
                </button>
                <div className='flex flex-col w-3/5 space-y-0.5'>
                  <div className='border-item h-1/2 text-center'>Count {quantity}</div>
                  <button className='border-item h-1/2 hover:bg-red-900 hover:text-gray-300' onClick={() => handlerRemove(_id)}>Remove</button>
                </div>
                <button className='h-full w-1/5 button-hover border-item flex justify-center items-center' onClick={() => handlerDecrease(_id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
