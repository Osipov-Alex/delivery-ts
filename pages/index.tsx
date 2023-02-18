import { is } from 'immer/dist/internal';
import { useEffect } from 'react';
import Shops from "../components/Shops"
import ShopsShelf from "../components/ShopsShelf"
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { checkUserAuth } from '../redux/slice/authSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkUserAuth());
    }
  }, [dispatch]);

  return (
    <div className="flex space-x-2 h-content-height pb-1">
      <Shops />
      <ShopsShelf />
    </div>
  )
}

export default Home