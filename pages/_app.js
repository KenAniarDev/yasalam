import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
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
