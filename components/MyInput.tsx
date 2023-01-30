import { FC } from 'react';

interface MyInputProps {
  value: string;
  placeholder: string;
  setValue: (id: string) => void;
  type: string;
}

const MyInput: FC<MyInputProps> = ({placeholder, setValue, type, value}) => {
  return (
    <>
      <input
        className='border-item w-full h-10 text-center bg-gray-200 hover:bg-white outline-none text-xl hover:border-2'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </>
  )
}

export default MyInput