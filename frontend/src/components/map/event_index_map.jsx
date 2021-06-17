import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Link, withRouter } from 'react-router-dom';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, 
      activeMarker: {},       
      selectedPlace: {},          
      center: {
        lat: 40.72289645557674,
        lng: - 73.96002115930136
      },
      markers: null,
      events: null
    };

    this.setMarkers = this.setMarkers.bind(this);
    this.setState = this.setState.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
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

  componentDidMount() {
    this.setState({ events: this.props.events },
      () => this.setState({ markers: this.setMarkers() },
        () => this.grillListeners())
    );
  }
  
  setMarkers() {
    const markers = {};
      this.props.events.forEach(event => {
        markers[event._id] = 
          <Marker
            onClick={this.onMarkerClick}
            position={{lat: event.latitude, lng: event.longitude }}
            name={event.title}
            location={event.location}
            id={event._id}
            key={event._id}
          />
        
      })
    return markers
  }

  grillListeners() {
    const events = {}
    
    this.props.events.forEach(event => events[event._id] = event);
    const filtered = Object.keys(events).filter(event => !this.state.markers[event._id]);
    // const events = document.querySelectorAll(".event-index-card-index");
    // events.forEach((event) => event.addEventListener("mouseenter", () => this.handleHover(event.id)));
    filtered.forEach((eventId) => {
      
      const eSelect = document.getElementById(eventId)
      eSelect.addEventListener("mouseenter", () => this.handleHover(eventId));
    });
  }

  handleHover(e) {
    // let marker = this.state.markers.values.filter(marker => marker.props.id == e);
    // var latLng = marker[0].props.position;
    const latLng = this.state.markers[e].props.position

    setTimeout(
      () => this.setState({ center: latLng }),
      200
    );
  }

  render() {
    if (!this.state.markers) {
      return <h1>loading...</h1>
    } else {
      const markers = this.setMarkers();
      
      return (
        <div className="events-map-container">
          <Map
            google={this.props.google}
            zoom={13}
            style={mapStyles}
            disableDefaultUI={true}
  
            initialCenter={
              this.state.center
            }
            center={
              this.state.center
            }
          >
            {Object.values(markers)}
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
}

const EventIndexMap = GoogleApiWrapper({
  apiKey: 'AIzaSyCxTWMHUwu0pODv9S2DiafnoridPYTHP00'
})(MapContainer);

export default withRouter(EventIndexMap);


