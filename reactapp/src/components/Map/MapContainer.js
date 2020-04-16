import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Button } from "reactstrap";

class MapContainer extends React.Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null
            });
        }
    };

    mapStyles = {
        width: '750px',
        height: '750px',
    };
      
    render() {
        return (
            <div style={{height: '100vh', width: '100%', display: "flex", justifyContent: "center"}}>
                <Map
                    google={this.props.google}
                    zoom={12}
                    style={this.mapStyles}
                    initialCenter={{ lat: this.props.lat, lng: this.props.lng}}
                >
                    <Marker 
                        position={{ lat: this.props.lat, lng: this.props.lng}} 
                        onClick={this.onMarkerClick}
                        name={this.props.stadiumName}
                    />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4 style={{color: "black"}}>{this.state.selectedPlace.name}</h4>
                            <Button color="primary">Get Directions</Button>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }    

} export default GoogleApiWrapper({
    apiKey: 'AIzaSyAOkndzdo5HhqoGN3gPqPFy0t5NGog7zLc'
})(MapContainer)