import React from 'react'
import useSlider from "hooks/useSlider";
import Slider from "react-slick";
import Link from 'next/link'
import Outlet from './Outlet'

const OutletListSlider = ({data, title, subTitle, logo, category, link}) => {
  const {settings} = useSlider();
  return (
     <div className="outlet-list">
        <div className="container">
            {title &&<h3 className="heading uppercase text-3xl font-semibold">{title}</h3>}
            {subTitle && 
                <div className="flex justify-center">
                    <Link href="/">
                        <a className="uppercase text-secondary hover:text-accent secondary-heading">View All</a> 
                    </Link>
                </div>
            }
            <div className="outlets">
                <Slider {...settings}>
                    {data.map((outlet, i) => {
                        return <Outlet key={i} outlet={outlet} logo={logo} category={category} link={link} />
                    })}
                </Slider>
            </div>
        </div>
    </div>
  )
}

export default OutletListSlider