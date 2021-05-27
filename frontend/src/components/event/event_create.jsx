import React from 'react';
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCxTWMHUwu0pODv9S2DiafnoridPYTHP00',
  Promise: Promise
});

class EventCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.userId,
      // invites: [],
      title: '',
      description: '',
      location: '' ,
      longitude: '',
      latitude: '',
      date: '',
      // items: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.geocode = this.geocode.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    this.setState({ newEvent: nextProps.newEvent });
  }

  handleSubmit(e) {
    e.preventDefault();
    // const res = this.geocode(this.state.location);
    // this.geocode(this.state.location);
    
    // debugger
    let event = {
      userId: this.props.userId,
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      longitude: this.state.longitude.toString(),
      latitude: this.state.latitude.toString(),
      date: this.state.date,
    };

    this.props.createEvent(event);
    this.setState({ 
      userId: this.props.userId,
      title: '',
      description: '',
      location: '',
      longitude: '',
      latitude: '',
      date: '',
     })
  }

  geocode(e) {
    e.preventDefault();
    googleMapsClient.geocode({ address: this.state.location })
      .asPromise()
      .then((response) => {
        console.log(response.json.results);
        this.setState({
          latitude: response.json.results[0].geometry.location.lat,
          longitude: response.json.results[0].geometry.location.lng,
          location: response.json.results[0].formatted_address
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update(field) {
    console.log(this.state);
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  // render() {
  //   return (
  //     <div>
  //       <form onSubmit={this.handleSubmit}>
  //         <div>
  //           <input type="textarea"
  //             value={this.state.text}
  //             onChange={this.update()}
  //             placeholder="Write your tweet..."
  //           />
  //           <input type="submit" value="Submit" />
  //         </div>
  //       </form>
        
        
  //     </div>
  //   )
  // }
  render() {
    return (
    <div className="event-detail-img">
      <div className="new-event-wrapper">
        <form className="new-event-form" onSubmit={this.handleSubmit} >
          <input 
            type="text" 
            value={this.state.title}
            onChange={this.update('title')}
            placeholder="Title"
          />
          <input 
            type="text" 
            value={this.state.location}
            onChange={this.update('location')}
            placeholder="Location"
          />
          <input 
            type="text" 
            value={this.state.latitude}
            onChange={this.update('latitude')}
            placeholder="Latitude"
          />
          <input 
            type="text" 
            value={this.state.longitude}
            onChange={this.update('longitude')}
            placeholder="Longitude"
          />
          <input 
            type="text" 
            value={this.state.date}
            onChange={this.update('date')}
            placeholder="Date"
          />

          <button onClick={this.geocode} >Confirm Location</button>
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
    )
  }
}

export default EventCreate;