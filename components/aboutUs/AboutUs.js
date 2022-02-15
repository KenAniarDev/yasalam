import React from "react";

const AboutUs = () => {
   return (
      <div className="text-center about-us">
         <div className="container">
            <section className="items-center py-16 sm:flex">
               <div className="sm:w-1/2">
                  <img
                     src="/yasalam1.PNG"
                     alt=""
                     className="w-4/5 mx-auto my-4 sm:w-full"
                  />
               </div>
               <div className="ml-10 text-left sm:w-1/2">
                  <p className="text-xl">
                     Your newest convenient partner to access active
                     places,engage and have fun with family-friendly vicinities,
                     indulge with world-class dishes and more. It&apos;s about
                     creating a place for everyone!
                  </p>
                  <h2 className="my-4 text-2xl font-semibold">
                     ALL IN ONE PLACE. THAT IS YASALAM
                  </h2>
                  <p className="text-xl">
                     With our passion for helping you stay emotionally engaged,
                     active in fitness, sport and well-being, we work with our
                     local authority partners to deliver places and activities
                     that make a difference to the lives of people and their
                     communities
                  </p>
               </div>
            </section>
            <section className="items-center sm:flex">
               <div className="mr-10 sm:w-1/2">
                  <h2 className="my-4 text-2xl font-semibold text-left">
                     YaSalam will initially start in Abu Dhabi where we are
                     partnered with:
                  </h2>
                  <ul className="my-4 text-xl text-left list-disc list-inside">
                     <li>Hotels</li>
                     <li>Health Clubs and Fitness Centers</li>
                     <li>Marine Sports</li>
                     <li>Sports Club</li>
                     <li>Restaurant</li>
                     <li>Sport Academy</li>
                     <li>Health Clubs</li>
                     <li>Coffee Shops</li>
                     <li>Spa</li>
                     <li>Healthy Food</li>
                     <li>Fitness Classes</li>
                     <li>Sport Wear</li>
                     <li>Sport Academies for kids 17 and below</li>
                  </ul>
                  <p className="text-xl ">
                     And we will soon be expanding to AlAin, Dubai and
                     theNorthern Emirates
                  </p>
               </div>
               <div className="sm:w-1/2">
                  <img
                     src="/yasalam2.PNG"
                     alt=""
                     className="w-4/5 mx-auto my-4 sm:w-full"
                  />
               </div>
            </section>
            <section className="items-center py-16 sm:flex">
               <div className="sm:w-1/2">
                  <img
                     src="/yasalam3.PNG"
                     alt=""
                     className="w-4/5 mx-auto my-4 sm:w-full"
                  />
               </div>
               <div className="ml-10 sm:w-1/2">
                  <h2 className="my-4 text-2xl font-semibold text-left">
                     Commit to our annual membership offer
                  </h2>
                  <div className="flex flex-col items-center my-6 text-white">
                     <div className="flex flex-col items-center justify-center h-20 mb-4 rounded-full bg-secondary w-80">
                        <p className="text-xl uppercase">AED 4,900 FAMILY</p>
                        <small className="text-lg">
                           (2 adults, 3 children under 17)
                        </small>
                     </div>
                     <div className="flex items-center justify-center h-20 rounded-full bg-accent w-80">
                        <p className="text-xl uppercase">
                           AED 3,500 INDIVIDUAL
                        </p>
                     </div>
                  </div>
                  <p className="text-xl text-left">
                     With this membership, you&apos;ll have access:
                  </p>
                  <ul className="mt-2 text-xl text-left list-disc list-inside">
                     <li>
                        To enjoy unlimited entry to our participating luxurious
                        hotel resorts,sunny beaches,glistening pools,waterparks
                        and premium fitness and wellness facilities in Abu
                        Dhabi.
                     </li>
                     <li>Receive discounts from non-participating outlets.</li>
                     <li>And get loyalty awards from every penny spent!</li>
                  </ul>
               </div>
            </section>
         </div>
      </div>
   );
};

export default AboutUs;
