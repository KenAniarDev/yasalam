import Head from 'next/head';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import 'styles/App.css';
import 'styles/slick-theme.css';
import 'styles/slick.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('app running');
  }, []);

  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://pro.fontawesome.com/releases/v5.10.0/css/all.css'
        />
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
