
const HeroSection = () => {
    return (
       <div className="home-banner relative py-20 flex items-center">
          <img
             src="/pattern1920x1080.png"
             alt=""
             className="absolute top-0 left-0 right-0 bottom-0 h-full w-full object-cover"
          />
          <div
             className="absolute top-0 left-0 right-0 bottom-0 h-full"
             style={{ backgroundColor: "rgba(0,0,0, 0.5)" }}
          ></div>
          <div className="container">
             <div className="md:flex items-center text-center">
                <div
                   className="md:ml-10 md:w-1/2 flex flex-col items-center bg-white p-10 rounded-xl"
                   style={{ backgroundColor: "rgba(255,255,255,.85)" }}
                >
                   <h2 className="my-4 text-2xl md:text-3xl lg:text-4xl font-semibold">
                      Level up your life style with
                   </h2>
                   <img
                      src="/yasalamlogo.png"
                      alt=""
                      className="w-20 md:w-32 lg:w-40 my-5"
                   />
                   <h1 className="my-4 text-4xl md:text-5xl lg:text-6xl font-semibold">
                      YaSalam
                   </h1>
                </div>
                <div className="flex-grow mt-16 md:mt-0">
                   <img
                      src="/banner-image-new.png"
                      alt=""
                      className="w-4/5 md:w-full max-h-96 mx-auto object-contain left-img"
                   />
                </div>
             </div>
          </div>
       </div>
    );
}

export default HeroSection;
