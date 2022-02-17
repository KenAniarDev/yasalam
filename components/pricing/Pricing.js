import React from 'react'
import Countdown from 'react-countdown';
import { useEffect, useState } from 'react';
import Link from 'next/link'

const Pricing = () => {
    const [havePromo, setHavePromo] = useState(false);
    const saleEnds = '2021-12-12'; 
    const [daysRemaining, setDaysRemaining] = useState(null);

    useEffect(() => {
        let CurrentDate = new Date();
        let GivenDate = new Date(saleEnds);
        let miliseconds = GivenDate - CurrentDate
        setDaysRemaining(convertMiliseconds(miliseconds))

        if(CurrentDate < GivenDate){
            setHavePromo(true)
        }
    }, [])

    function convertMiliseconds(miliseconds) {
        var days, total_hours, total_minutes, total_seconds;
        total_seconds = parseInt(Math.floor(miliseconds / 1000));
        total_minutes = parseInt(Math.floor(total_seconds / 60));
        total_hours = parseInt(Math.floor(total_minutes / 60));
        days = parseInt(Math.floor(total_hours / 24));
      
        return days
      };
    return (
        <div className="pricing" id="buyMembership">
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-4">
                        <h1 className="sm:text-4xl text-3xl title-font uppercase text-3xl font-semibold mb-2">Pricing</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500 capitalize">Commit to our annual membership offer!</p>
                        {daysRemaining > 0 && <h4 className="text-xl font-semibold text-primary mt-6">{daysRemaining} days remaining before the sale ends</h4>}
                    </div>
                    <div className="flex flex-wrap -m-4 md:justify-center">
                        <div className="p-4 md:w-1/2 w-full">
                            <div className="h-full p-6 rounded-lg border-2 border-primary flex flex-col relative overflow-hidden">
                            <span className="bg-primary text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                            <h2 className="text-sm tracking-widest title-font mb-1 font-medium">Individual Membership</h2>
                            <h1 className="text-4xl leading-none pb-4 mb-4 border-b border-gray-200">
                                <span className="flex items-center">
                                    {havePromo ? <span>AED <span className="line-through">3500</span> 2625</span> : <span>AED 3500</span>}
                                    <span className="text-lg ml-1 font-normal text-gray-500">/year</span>
                                    <br />
                                </span>
                                <h4 className="text-lg mt-2"> 
                                    <span className="animate-pulse mr-1 text-primary">Limited Offer - Sale Ends in</span>
                                    <span className="bg-primary text-white py-1 px-2 rounded">
                                        <Countdown date={new Date(saleEnds)}>
                                            <span></span>
                                        </Countdown>
                                    </span>
                                </h4>
                            </h1>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                                </span>
                                Enjoy unlimited free access to all our Yasalam participating outlets.
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                                </span>Enjoy special discount rate.
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                                </span>Get loyalty point for every AED spent.
                            </p>
                            <Link href='/individual-register'>
                                <a className="flex items-center mt-auto text-white bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary rounded">
                                    Buy Membership
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>  
                            </Link>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/2 w-full">
                            <div className="h-full p-6 rounded-lg border-2 border-primary flex flex-col relative overflow-hidden">
                            <h2 className="text-sm tracking-widest title-font mb-1 font-medium">Family Membership</h2>
                            <h1 className="text-5xl leading-none pb-4 mb-4 border-b border-gray-200">
                                <span className="flex items-center">
                                    {havePromo ? <span>AED <span className="line-through">4900</span> 3675</span> : <span>AED 4900</span>}
                                    <span className="text-lg ml-1 font-normal text-gray-500">/year</span>
                                </span>
                                <h4 className="text-lg mt-2"> 
                                    <span className="mr-1 animate-pulse text-primary">Limited Offer - Sale Ends in</span>
                                    <span className="bg-primary text-white py-1 px-2 rounded">
                                        <Countdown date={new Date(saleEnds)}>
                                            <span></span>
                                        </Countdown>
                                    </span>
                                </h4>
                            </h1>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                                </span>2 Adults
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                                </span>3 Children under 17. 
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                                </span>Enjoy unlimited free access to all our Yasalam participating outlets.
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                                </span>Enjoy special discount rate.
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                                </span>
                                Get loyalty point for every AED spent.
                            </p>
                            <Link href='/family-register'>
                                <a className="flex items-center mt-auto text-white bg-primary border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary rounded">
                                    Buy Membership
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                    </svg>
                                </a> 
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default Pricing