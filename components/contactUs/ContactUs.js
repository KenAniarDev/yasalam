import Link from "next/Link";
import React from "react";
import { RiMailLine, RiPhoneLine } from "react-icons/ri";

const ContactUs = () => {
   return (
      <div>
         <img
            src="/pattern1920x1080.png"
            alt="Background Image"
            className="fixed top-0 bottom-0 left-0 right-0 object-cover w-full h-full"
         />
         <div
            className="fixed top-0 bottom-0 left-0 right-0 h-full"
            style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}
         ></div>
         <div
            className="relative flex flex-col items-center justify-center w-full"
            style={{ height: "calc(100vh - 82px)" }}
         >
            <div
               className="flex flex-col items-center p-10 bg-white rounded-xl"
               style={{ backgroundColor: "rgba(255,255,255,.85)" }}
            >
               <img
                  src="/yasalamlogo.png"
                  alt="Background Image"
                  className="w-20"
               />
               <h2 className="mt-4 mb-8 text-5xl font-semibold text-center uppercase">
                  Contact Us
               </h2>
               <Link href="mailto:info@yasalamae.ae">
                  <a className="flex mb-4 text-2xl">
                     <RiMailLine className="mr-2" />
                     info@yasalamae.ae
                  </a>
               </Link>
               <Link href="tel:+971 50 72 88 316">
                  <a className="flex mb-4 text-2xl">
                     <RiPhoneLine className="mr-2" />
                     +971 50 72 88 316
                  </a>
               </Link>
               <Link href="tel:+971 50 72 56 316">
                  <a className="flex mb-4 text-2xl">
                     <RiPhoneLine className="mr-2" />
                     +971 50 72 56 316
                  </a>
               </Link>
               <Link href="tel:+971 56 54 74 636">
                  <a className="flex text-2xl">
                     <RiPhoneLine className="mr-2" />
                     +971 56 54 74 636
                  </a>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default ContactUs;
