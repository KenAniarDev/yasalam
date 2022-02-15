import Image from "next/image";
import BannerImage from "public/banner-image-new.png";

const HeroSection = () => {
   return (
      <div className="relative flex items-center py-40 home-banner">
         <img
            src="/pattern1920x1080.png"
            alt=""
            className="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-full"
         />
         <div
            className="absolute top-0 bottom-0 left-0 right-0 h-full"
            style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}
         ></div>
         <div className="container">
            <div className="items-center text-center md:flex">
               <div
                  className="flex flex-col items-center p-10 bg-white md:ml-10 md:w-1/2 rounded-xl"
                  style={{ backgroundColor: "rgba(255,255,255,.85)" }}
               >
                  <h2 className="my-4 text-2xl font-semibold md:text-3xl lg:text-4xl">
                     Level up your life style with
                  </h2>
                  <img
                     src="/yasalamlogo.png"
                     alt=""
                     className="w-20 my-5 md:w-32 lg:w-40"
                  />
                  <h1 className="my-4 text-4xl font-semibold md:text-5xl lg:text-6xl">
                     YaSalam
                  </h1>
               </div>
               <div className="flex-grow mt-16 md:mt-0">
                  <div
                     className="w-4/5 mx-auto md:w-full"
                     style={{
                        position: "relative",
                        width: "80%",
                        height: "600px",
                     }}
                  >
                     <Image
                        src={BannerImage}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HeroSection;
