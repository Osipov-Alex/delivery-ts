import { useState, FC } from 'react';
import Link from 'next/link';
import MyInput from '../../components/MyInput';
import { useAppDispatch } from '../../redux/hook';
import { registerUser } from '../../redux/slice/authSlice';

const register: FC = () => {

  const dispatch = useAppDispatch()
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const inputs = [
    { value: email, placeholder: 'Введите Ваш имейл', setValue: setEmail, type: 'text' },
    { value: name, placeholder: 'Введите Ваше имя', setValue: setName, type: 'text' },
    { value: password, placeholder: 'Введите Ваш пароль', setValue: setPassword, type: 'password' },
    { value: repeatPassword, placeholder: 'Повторите Ваш пароль', setValue: setRepeatPassword, type: 'password' },
  ]

  const handleRegister = () => {
    try {
      dispatch(registerUser({ email, password, name }));
      // setEmail('');
      // setPassword('');
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='w-full h-content-height p-1 flex flex-col justify-center items-center pb-20'>
      <div className='w-2/3 h-2/3 flex flex-col items-center justify-around border-item bg-gray-100'>
        <h1 className='text-2xl'>Зарегестрируйтесь!</h1>
        <span>Введите Ваши данные.</span>
        <div className='flex flex-col w-3/4 items-center space-y-2.5'>
          {inputs.map(input => 
            <MyInput key={input.placeholder} value={input.value} placeholder={input.placeholder} setValue={input.setValue} type={input.type} />
          )}
        </div>
        <div className='w-3/4 space-x-1 h-10 flex justify-center'>
          <button className='w-1/2 border-item button-hover text-xl' onClick={handleRegister}>
            Зарегестрироватся
          </button>
        </div>
        <div className='w-3/4 text-xl space-x-2 flex justify-center'>
          <span>Уже есть аккаунт?</span><Link href='/auth' className='hover:text-gray-700'>Залогинтесь.</Link>
        </div>
      </div>
    </div>
  )
}

export default register