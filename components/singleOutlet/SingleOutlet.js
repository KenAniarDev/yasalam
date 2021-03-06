import parse from 'html-react-parser';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import BannerSlider from './BannerSlider';
import useStore from 'hooks/useStore';

Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAP_API_KEY);
Geocode.enableDebug();

const Outlet = ({ outlet, logo, category, link }) => {
  return (
    <div className="outle-item">
      <Link href={`/single-outlet/${outlet.id}`}>
        <a>
          <div className="body">
            <div className="bg-gradient"></div>
            <img src={logo ? logo : outlet.logo} alt="" />
            <div className="content">
              <div className="bottom-content">
                <div className="badge badge-secondary outlet-category">
                  {category ? category : outlet.name}
                </div>
                <h3 style={{ margin: 0 }}>{outlet.name}</h3>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
const SingleOutlet = ({ data }) => {
  const outlets = useStore((state) => state.outlets);
  const branches = outlets.filter(
    (e) => e.outletgroupId === data.outletgroupId
  );
  const [locUrl, setLocUrl] = useState('');
  useEffect(() => {
    console.log(branches);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocUrl(`${position.coords.latitude},${position.coords.longitude}`);
      });
    }
  }, []);
  return (
    <div className="outlet-page">
      <BannerSlider data={data.gallery} />
      <div className="outlet-info">
        <div className="container">
          <div className="basic-info-container">
            <div className="basic-info">
              <h2 className="flex items-center">
                {data.name}
                <div className="ml-2 h-8 rounded badge badge-accent">
                  {data.regionName}
                </div>
              </h2>

              <br />
              {/* <a href='#listing-location' className='p-2 listing-address'>
                <i className='fas fa-map-marker-alt'></i>
                {data.address}
              </a> */}
              <a
                href={`https://www.google.com/maps/dir/${data.latitude},${data.longitude}/${locUrl}`}
                rel="noopener noreferrer"
                target="_blank"
                className="p-2 shadow-lg listing-address rounded-xl"
              >
                <i className="fas fa-directions"></i>
                Get Direction
              </a>
            </div>
            <div>
              <div className="h-8 m-1 rounded badge badge-primary">
                <span className="outlet-category">
                  <Link href={`/single-category/${data.categoryId}`}>
                    {data.categoryName}
                  </Link>
                </span>
              </div>
              {data.featureName !== 'No Feature' && (
                <div className="h-8 m-1 rounded badge badge-secondary">
                  <span className="outlet-category">
                    {/* <i className={data.feature.icon + " mr-1"}></i> */}
                    {data.featureName}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="description-container">
            {data.description && (
              <>
                <h3 className="description">Description</h3>
                <p>{parse(data.description)}</p>
              </>
            )}

            <div className="contact-container">
              <a href={`tel:${data.phone}`} className="phone-number">
                <i className="fas fa-phone"></i>
                {'+ ' + data.phone}
              </a>
              <a href={`mailto:${data.email}`} className="email">
                <i className="fal fa-envelope"></i>
                {data.email}
              </a>
            </div>
          </div>

          <div className="social-container">
            {data.facebook && (
              <a
                href={data.facebook}
                className="facebook"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-facebook-square"></i>
                Facebook
              </a>
            )}
            {data.youtube && (
              <a
                href={data.youtube}
                className="youtube"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-youtube-square"></i>
                Youtube
              </a>
            )}
            {data.instagram && (
              <a
                href={data.instagram}
                className="instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-instagram-square"></i>
                Instagram
              </a>
            )}
            {data.twitter && (
              <a
                href={data.twitter}
                className="twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-twitter-square"></i>
                Twitter
              </a>
            )}
            {data.whatsapp && (
              <a
                href={data.whatsapp}
                className="whatsapp"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-whatsapp-square"></i>
                WhatsApp
              </a>
            )}
            {data.website && (
              <a
                target="_blank"
                href={data.website}
                className="website"
                rel="noopener noreferrer"
              >
                <i className="fab fa-chrome"></i>
                Website
              </a>
            )}
          </div>

          <div className="youtube-embed-container">{parse(data.video)}</div>
        </div>
      </div>
      {data.outletgroupId !== '4UKVHjzY2mtYF3m17ZGT' && (
        <div className="outlet-list">
          <div className="container">
            {branches.length > 0 && (
              <div className="outlets">
                {branches.map((outlet, i) => {
                  return <Outlet key={i} outlet={outlet} logo={outlet.logo} />;
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleOutlet;
