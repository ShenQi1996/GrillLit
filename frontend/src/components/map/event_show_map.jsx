import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';



const mapStyles = {
  width: '100%',
  height: '100%'
};

export class EventShowMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: this.props.event.latitude,
      longitude: this.props.event.longitude
    };
  }

  render() {
    // const centerLat = this.props.event.latitude;
    // const centerLon = this.props.event.longitude;
    if (!this.state.latitude) {
      return <h1>Loading...</h1>
    } else {
      
      return (
        <div className="event-map-container">
          <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            disableDefaultUI={true}
            scrollwheel={false}

            initialCenter={
              {
                lat: this.state.latitude,
                lng: this.state.longitude
              }
            }
          >
            <Marker
              position={{ lat: this.state.latitude, lng: this.state.longitude }}
            />
          </Map>
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCxTWMHUwu0pODv9S2DiafnoridPYTHP00'
})(EventShowMap);
