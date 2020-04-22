import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Button, Row, Container } from "reactstrap";

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
        position: "relative",
        width: '80%',
        height: '100%',
    };
      
    render() {
        let directionsUrl = `https://www.google.pl/maps/dir//${this.props.stadiumName}`
        return (
            <Row style={{display: "flex", justifyContent: "center", width:'1000px',height:'500px', alignContent:"center"}}>
            <Map
                google={this.props.google}
                zoom={12}
                containerStyle={this.mapStyles}
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
                        <Button color="primary" target="_blank" href={directionsUrl}>Get Directions</Button>
                    </div>
                </InfoWindow>
            </Map>
            </Row>
        );
    }    

} export default GoogleApiWrapper({
    apiKey: 'AIzaSyAOkndzdo5HhqoGN3gPqPFy0t5NGog7zLc'
})(MapContainer)