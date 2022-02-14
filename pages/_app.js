import Navbar from "components/navbar/Navbar";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
   return (
      <>
         <Head>
            <link
               rel="stylesheet"
               type="text/css"
               href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            />
         </Head>
         <Navbar />
         <Toaster />
         <Component {...pageProps} />
      </>
   );
}

export default MyApp;
