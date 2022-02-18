import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAP_API_KEY);
Geocode.enableDebug();

class MapMarkers extends React.Component {
    state = {
        zoom: 16,
        height: 500,
        mapPosition: {
            lat: 0,
            lng: 0,
        },
        markerPosition: {
            lat: 0,
            lng: 0,
        }, 
    }


    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    markerPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                },
                    () => {
                        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                            response => {
                              
                            },
                            error => {
                                console.error(error);
                            }
                        );

                    })
            });
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    };

    render() {

        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap
                        defaultZoom={this.state.zoom}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >

                                <Marker
                                    onDragEnd={this.onMarkerDragEnd}
                                    position={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
                                >
                                    <InfoWindow
                                    zIndex={99}
                                >
                            
                                    <div>
                                        <p className="text-primary font-bold">YOUR CURRENT POSITION</p>
                                    </div>
                                
                                </InfoWindow>
                                </Marker>

                                <Marker
                                    onDragEnd={this.onMarkerDragEnd}
                                    position={{ lat: parseFloat(this.props.mainCoords.latitude), lng: parseFloat(this.props.mainCoords.longitude)}}
                                >
                                    <InfoWindow
                                >
                            
                                    <div>
                                        <p className="text-center">{this.props.mainCoords.name}</p>
                                        <p className="text-center">Main Branch</p>
                                        <p>{this.props.mainCoords.address}</p>
                                    </div>
                                
                                </InfoWindow>
                                </Marker>
                        
                                {this.props.branchCoords.map(item => {
                                    return (
                                        <Marker
                                        onDragEnd={this.onMarkerDragEnd}
                                        position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }}
                                    >
                                        <InfoWindow
                                    >
                                
                                            <div>
                                                <p>{item.name}</p>
                                                <p>{item.address}</p>
                                            </div>
                                        
                                        </InfoWindow>
                                        </Marker>
                                    )
                                })}
                                
            
                    </GoogleMap>
                )
            )
        );

        return (
            <div style={{ padding: '1rem', margin: '0 auto', height: '500px' }}>
                <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRCvWE6FUz_qEbMXsh-fpEUjbpZkEZ4jM
                    &libraries=places"
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: this.state.height }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                />
            </div>
        )
    }

}

export default MapMarkers;
