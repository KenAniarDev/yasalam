import Logo from "assets/images/yasalamlogo.png";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { RiMailLine, RiPhoneLine } from "react-icons/ri";
import {
   FooterLeft,
   FooterLink,
   FooterLinkUnderline,
   FooterRight,
   FooterTitle,
   GoogleTranslate,
   Wrapper
} from "./Footer.styled";
   const Footer = () => {
      useEffect(() => {
         var addScript = document.createElement("script");
         addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
         );
         document.body.appendChild(addScript);
         window.googleTranslateElementInit = googleTranslateElementInit;
      }, []);

      const googleTranslateElementInit = () => {
         new window.google.translate.TranslateElement(
            {
               pageLanguage: "en",
               includedLanguages: "en,ms,ta,zh-CN,ar", // include this for selected languages
               layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            },
            "google_translate_element"
         );
      };
      return (
         <>
            <FooterLeft>
               <Image src={Logo} alt="YaSalam Logo" width={64} height={94} />
               <Wrapper>
                  <FooterTitle>Contact</FooterTitle>
                  <Link href="mailto:info@yasalamae.ae" passHref>
                     <FooterLink>
                        <RiMailLine />
                        info@yasalamae.ae
                     </FooterLink>
                  </Link>
                  <Link href="tel:+971 50 72 88 316" passHref>
                     <FooterLink>
                        <RiPhoneLine />
                        +971 50 72 88 316
                     </FooterLink>
                  </Link>
                  <Link href="tel:+971 50 72 56 316" passHref>
                     <FooterLink>
                        <RiPhoneLine />
                        +971 50 72 56 316
                     </FooterLink>
                  </Link>
                  <Link href="tel:+971 56 54 74 636" passHref>
                     <FooterLink>
                        <RiPhoneLine />
                        +971 56 54 74 636
                     </FooterLink>
                  </Link>
               </Wrapper>
               <Wrapper>
                  <FooterTitle>Pages</FooterTitle>
                  <Link href="/" passHref>
                     <FooterLink>Home</FooterLink>
                  </Link>
                  <Link href="/about-us" passHref>
                     <FooterLink>About Us</FooterLink>
                  </Link>
                  <Link href="/contact-us" passHref>
                     <FooterLink>Contact Us</FooterLink>
                  </Link>
                  <Link href="/faqs" passHref>
                     <FooterLink>FAQs</FooterLink>
                  </Link>
                  <Link href="/terms" passHref>
                     <FooterLink>Terms and Conditions</FooterLink>
                  </Link>
                  <Link href="/privacy" passHref>
                     <FooterLink>Privacy Policy</FooterLink>
                  </Link>
                  <Wrapper>
                     Yasalam is a product of{" "}
                     <Link href="http://www.316sport.ae" passHref>
                        <FooterLinkUnderline
                           rel="noopener noreferrer"
                           target="_blank"
                        >
                           316 sport services
                        </FooterLinkUnderline>
                     </Link>
                  </Wrapper>
                  <Wrapper>
                     Powered by{" "}
                     <FooterLinkUnderline
                        href="http://www.bluemarlin.ae"
                        rel="noopener noreferrer"
                        target="_blank"
                     >
                        Blue Marlin Marketing
                     </FooterLinkUnderline>
                  </Wrapper>
               </Wrapper>
               <Wrapper>
                  <FooterTitle>Links</FooterTitle>
                  <Link href="/" passHref>
                     <FooterLink>Download Android App</FooterLink>
                  </Link>
                  <Link href="/" passHref>
                     <FooterLink>Download IOS App</FooterLink>
                  </Link>
                  <Link href="/" passHref>
                     <FooterLink>Profile Arabic</FooterLink>
                  </Link>
                  <Link href="/" passHref>
                     <FooterLink>Profile English</FooterLink>
                  </Link>
                  <GoogleTranslate id="google_translate_element">
                     {" "}
                  </GoogleTranslate>
               </Wrapper>
            </FooterLeft>
            <FooterRight>
               <div className="items-center grid-flow-col">
                  <svg
                     width="22"
                     height="22"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                     fillRule="evenodd"
                     clipRule="evenodd"
                     className="fill-current"
                  >
                     <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                  </svg>
                  <p>Copyright © 2021 - All right reserved by YASALAM</p>
               </div>
               <div className="md:place-self-center md:justify-self-end">
                  <div className="grid grid-flow-col gap-4">
                     <a
                        href="https://instagram.com/yasalamuae"
                        target="_blank"
                        rel="noreferrer"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="#E80071"
                           viewBox="0 0 50 50"
                           width="50px"
                           height="50px"
                        >
                           {" "}
                           <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z" />
                        </svg>
                     </a>
                     <a
                        href="https://facebook.com/YaSalam-UAE-100492529092540/"
                        target="_blank"
                        rel="noreferrer"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="#395693"
                           viewBox="0 0 50 50"
                           width="50px"
                           height="50px"
                        >
                           <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z" />
                        </svg>
                     </a>
                     <a
                        href="https://tiktok.com/@yasalamuae"
                        target="_blank"
                        rel="noreferrer"
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="#000000"
                           viewBox="0 0 50 50"
                           width="50px"
                           height="50px"
                        >
                           {" "}
                           <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
                        </svg>
                     </a>
                  </div>
               </div>
            </FooterRight>
         </>
      );
   };

   export default Footer;
