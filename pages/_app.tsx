import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import store from '../redux/store'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Provider store={store} >
      <Layout>
        <ToastContainer position='bottom-right' />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </>
);


export default MyApp;
