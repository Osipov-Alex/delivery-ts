import { useEffect } from 'react';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 2500)
  }, [router]);

  return (
    <div className='h-content-height flex justify-center items-center'>
      <div>
        <h1 className='text-2xl'>Данной страницы не существует.</h1>
      </div>
    </div>
  )
}

export default index