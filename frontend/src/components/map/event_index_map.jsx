import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);


  }

  componentDidMount() {
    
  }



  render() {
    // const centerLat = this.props.events[3].latitude;
    // const centerLon = this.props.events[3].longitude;

    return (
      <div className="events-map-container">
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          disableDefaultUI={true}
          initialCenter={
            {
              lat: 40.662466235884914,
              lng: - 73.96715335568013
            }
          }
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCxTWMHUwu0pODv9S2DiafnoridPYTHP00'
})(MapContainer);


