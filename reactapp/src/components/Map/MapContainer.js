import React from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends React.Component {


    mapStyles = {
        width: '20%',
        height: '20%',
    };
      
    render() {
        return (
            <Map
              google={this.props.google}
              zoom={12}
              style={this.mapStyles}
              initialCenter={{ lat: this.props.lat, lng: this.props.lng}}
            >
                <Marker position={{ lat: this.props.lat, lng: this.props.lng}} />
            </Map>
        );
    }    

} export default GoogleApiWrapper({
    apiKey: 'AIzaSyAOkndzdo5HhqoGN3gPqPFy0t5NGog7zLc'
})(MapContainer)