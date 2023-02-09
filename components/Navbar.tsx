import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { logoutUser } from '../redux/slice/authSlice';

const Navbar: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isAuth } = useAppSelector(state => state.auth);
  const { name } = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch()
  const { pathname } = useRouter();


  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleHoverMenu = () => {
    setIsVisible(!isVisible)
  }

  return (
    <nav className='flex justify-around mx-5 items-center h-navbar-height text-gray-800'>
      {/* левый */}
      <div className='w-1/3 flex justify-start'>
        <div className='relative focus:outline-none' onMouseEnter={handleHoverMenu} onMouseLeave={handleHoverMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          {isVisible ?
            <div className='absolute border-main flex flex-col items-start bg-gray-400 p-1 space-y-1'>
              {!isAuth
                ? <><Link href='/login'>
                  <span className='navbar-link'>LogIn</span>
                </Link>
                  <Link href='login/register'>
                    <span className='navbar-link'>Register</span>
                  </Link>
                </>
                : <><Link href='/history'>
                  <span className='navbar-link'>History</span>
                </Link>
                  <span onClick={handleLogout}>
                    <span className='navbar-link'>Logout</span>
                  </span></>
              }
            </div>
            : null }
        </div>
      </div>
      <span className='text-3xl text-black'>|</span>
      {/* центральный */}
      <div className='flex w-1/3 justify-center text-2xl text-black'>
        {name ? <span>Рады видеть вас {name}!</span> : <>Для покупки зарегестрируйтесь!</>}
      </div>
      <span className='text-3xl text-black'>|</span>
      {/* правый */}
      <div className='flex w-1/3 justify-end'>
        <Link href='/'>
          <div className={pathname === '/' ? 'navbar-link flex justify-center items-center rounded-full w-14 h-14 text-gray-300 bg-gray-700' : 'navbar-link flex justify-center items-center rounded-full w-14 h-14 button-hover hover:text-gray-300'} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        </Link>
        <Link href='/cart'>
          <div className={pathname === '/cart' ? 'navbar-link flex justify-center items-center rounded-full w-14 h-14 text-gray-300 bg-gray-700' : 'navbar-link flex justify-center items-center rounded-full w-14 h-14 button-hover hover:text-gray-300'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar