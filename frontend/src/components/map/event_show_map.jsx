import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Link } from 'react-router-dom';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class EventShowMap extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const centerLat = this.props.event.latitude;
    const centerLon = this.props.event.longitude;
  
    return (
      <div className="event-map-container">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          disableDefaultUI={true}

          initialCenter={
            {
              lat: centerLat,
              lng: centerLon
            }
          }
        >
          <Marker
            position={{ lat: centerLat, lng: centerLon }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCxTWMHUwu0pODv9S2DiafnoridPYTHP00'
})(EventShowMap);
