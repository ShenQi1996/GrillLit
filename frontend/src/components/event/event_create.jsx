import React from 'react';
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCxTWMHUwu0pODv9S2DiafnoridPYTHP00',
  Promise: Promise
});

class EventCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.user.id,
      // invites: `${this.props.user.username}`,
      title: '',
      description: '',
      location: '' ,
      longitude: '',
      latitude: '',
      date: '',
      items: '',
      confirmed: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.geocode = this.geocode.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ newEvent: nextProps.newEvent });
  }

  handleSubmit(e) {
    e.preventDefault();
    // const res = this.geocode(this.state.location);
    // this.geocode(this.state.location);
    
    
    let event = {
      userId: this.props.user.id,
      invites: this.props.user.username,
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      longitude: this.state.longitude.toString(),
      latitude: this.state.latitude.toString(),
      date: this.state.date,
      items: this.state.items,
    };

    

    this.props.createEvent(event).then(({event}) => {
      this.props.history.push(`/events/${event.data._id}`);
    });
    this.setState({ 
      userId: this.props.user.id,
      // invites: {},
      title: '',
      description: '',
      location: '',
      longitude: '',
      latitude: '',
      date: '',
      items: '',
     });

  }

  geocode(e) {
    e.preventDefault();
    googleMapsClient.geocode({ address: this.state.location })
      .asPromise()
      .then((response) => {
        // console.log(response.json.results);
        this.setState({
          latitude: response.json.results[0].geometry.location.lat,
          longitude: response.json.results[0].geometry.location.lng,
          location: response.json.results[0].formatted_address,
          confirmed: true
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    // let submitButton = this.state.confirmed ? <input type="submit" value="submit" /> : '';
    let submitButton = this.state.confirmed ? 
      <button type="submit" className="create-button">Submit</button>: 
      <button onClick={e => e.preventDefault()} className="dummy-button">Submit</button>;

    return (
    <div className="event-detail-img">
      <div className="new-event-wrapper">
        <form className="new-event-form" onSubmit={this.handleSubmit} >
          <h1>Create Form</h1>
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
          {/* <input 
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
          /> */}
          <input 
            type="text" 
            value={this.state.date}
            onChange={this.update('date')}
            placeholder="Date"
          />
          <textarea
              value={this.state.description}
              onChange={this.update('description')}
              placeholder="Description"
          ></textarea>
          <textarea
              value={this.state.items}
              onChange={this.update('items')}
              placeholder="items"
          ></textarea>

          <button onClick={this.geocode} className="create-button">Confirm Location</button>
          {submitButton}
        </form>
      </div>
    </div>
    )
  }
}

export default EventCreate;