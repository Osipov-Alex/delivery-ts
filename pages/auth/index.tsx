import { useState, FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MyInput from '../../components/MyInput';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { loginUser } from '../../redux/slice/authSlice';
import { toast } from 'react-toastify';

const index:FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { status, isAuth } = useAppSelector(state => state.auth);

  const inputs = [
    { value: email, placeholder: 'Введите Ваш имейл', setValue: setEmail, type: 'text' },
    { value: password, placeholder: 'Введите Ваш пароль', setValue: setPassword, type: 'password' },
  ];

  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) router.push('/');
  }, [status, isAuth])

  const handlerLogin = () => {
    try {
      dispatch(loginUser({ email: email, password: password }));
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full h-content-height p-1 flex flex-col justify-center items-center pb-20'>
      <div className='w-2/3 h-1/2 flex flex-col items-center justify-around border-item bg-gray-100'>
        <h1 className='text-2xl'>Войдите!</h1>
        <span>Введите ваш имейл и пароль.</span>
          <div className='flex flex-col w-3/4 items-center space-y-2.5'>
            {inputs.map(input => 
              <MyInput key={input.placeholder} value={input.value} placeholder={input.placeholder} setValue={input.setValue} type={input.type} />
            )}
          </div>
          <div className='w-3/4 space-x-1 h-10 flex justify-center'>
            <button className='w-1/2 border-item button-hover text-xl' onClick={handlerLogin}>
              Войти
            </button>
        </div>
        <div className='w-3/4 text-xl space-x-2 flex justify-center'>
          <span>Нет аккаунта?</span><Link href='/auth/register' className='hover:text-gray-700'>Зарегестрируйся.</Link>
        </div>
      </div>
    </div>
  )
}

export default index