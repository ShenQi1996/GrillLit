import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Link } from 'react-router-dom';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };

    this.setMarkers = this.setMarkers.bind(this);
    this.setState = this.setState.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push(`/events/${this.state.selectedPlace.id}`);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  setMarkers() {
    // debugger
    return (
      this.props.events.map(event => {
        return (
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: event.latitude, lng: event.longitude }}
            name={event.title}
            location={event.location}
            id={event._id}
            key={event.id}
          />
        )
      })
    )
  }


  componentDidMount() {
    
  }



  render() {
    // const centerLat = this.props.events[3].latitude;
    // const centerLon = this.props.events[3].longitude;
    const markers = this.setMarkers();
    // debugger
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
        >
          {markers}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div onClick={this.handleClick} id="click-me" >
              <div >
                <a href={`/#/events/${this.state.selectedPlace.id}`} >{this.state.selectedPlace.name}</a>
                <p>{this.state.selectedPlace.location}</p>
              </div>
            </div>
          </InfoWindow>
        
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCxTWMHUwu0pODv9S2DiafnoridPYTHP00'
})(MapContainer);


