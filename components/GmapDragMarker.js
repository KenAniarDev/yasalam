import React, { useState, useEffect } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLEMAP_API_KEY);
Geocode.enableDebug();

const GmapDragMarkers = React.memo(function mark(props) {
  const { setCoords } = props;
  const [state, setState] = useState({
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setState(
          {
            ...state,
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then(
              (response) => {
                console.log(response);
              },
              (error) => {
                console.error(error);
              }
            );
          }
        );
      });
    } else {
      console.error('Geolocation is not supported by this browser!');
    }
  }, []);

  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    console.log('lat', newLat);
    console.log('lng', newLng);
    setCoords({
      lat: newLat,
      long: newLng,
    });
  };
  const AsyncMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={state.zoom}
        defaultCenter={{
          lat: state.mapPosition.lat,
          lng: state.mapPosition.lng,
        }}
      >
        {/* InfoWindow on top of marker */}

        {/*Marker*/}
        <Marker
          google={props.google}
          name={'Dolores park'}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={{
            lat: state.markerPosition.lat,
            lng: state.markerPosition.lng,
          }}
        />

        <Marker />
      </GoogleMap>
    ))
  );

  return (
    <AsyncMap
      googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCRCvWE6FUz_qEbMXsh-fpEUjbpZkEZ4jM
            &libraries=places'
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: state.height }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
});

export default GmapDragMarkers;
