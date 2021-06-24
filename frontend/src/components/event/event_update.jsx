import React from 'react';
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCxTWMHUwu0pODv9S2DiafnoridPYTHP00',
  Promise: Promise
});

class EventUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.userId,
      invites: this.props.invites,
      title: this.props.event.title,
      description: this.props.event.description,
      location: this.props.event.location,
      longitude: this.props.event.longitude,
      latitude: this.props.event.latitude,
      date: '',
      items: this.props.event.items,
      likes: this.props.event.likes,
      confirmed: false,
      error: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateDate = this.validateDate.bind(this);
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

    let splitDate = this.state.date.split("-");
    let formatted = `${splitDate[1][1]}/${splitDate[2]}/${splitDate[0]}`;

    let event = {
      _id: this.props.event._id,
      userId: this.props.userId,
      invites: this.props.event.invites,
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      longitude: this.state.longitude.toString(),
      latitude: this.state.latitude.toString(),
      date: formatted,
      items: this.state.items,
      likes: this.state.likes
    };

    
    this.props.editEvent(event);
    this.props.closeUpdate(event);
    // this.props.editEvent(event).then(() => {
    //   this.props.closeUpdate();
    // });

    // this.setState({
    //   userId: this.props.userId,
    //   // invites: {},
    //   title: '',
    //   description: '',
    //   location: '',
    //   longitude: '',
    //   latitude: '',
    //   date: '',
    //   items: '',
    // });

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
    return (e) => {
      // if (field === 'date' && !this.validateDate(e.currentTarget.value)) {
      //   // console.log("error");
      //   this.setState({ error: true });
      // } else if (field === 'date' && this.validateDate(e.currentTarget.value)) {
      //   this.setState({ 
      //     [field]: e.currentTarget.value,
      //     error: false 
      //   });
      // } else {
        this.setState({ [field]: e.currentTarget.value });
      // }
    };
  }

  validateDate(date) {
    const currentDate = new Date();
    let formattedCurrentDate = currentDate.toLocaleDateString("en-US");
    formattedCurrentDate = formattedCurrentDate.split("/");
    const splitDate = date.split("-");
    // const eventDate = `${splitDate[1][1]}/${splitDate[2]}/${splitDate[0]}`;
    return (
      formattedCurrentDate[2] <= splitDate[0] &&
      formattedCurrentDate[1] <= splitDate[2] &&
      formattedCurrentDate[0] <= splitDate[1][1]
    );

    // const formattedDate = eventDate.toLocaleDateString("en-US");
    // return (formattedCurrentDate === formattedDate);
  }


  render() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    var dateNow = `2021-0${month}-${day}`;
    
    let submitButton = this.state.confirmed ?
      <button type="submit" className="edit-submit-btn">Submit</button> :
      <button onClick={e => e.preventDefault()} className="edit-dummy-button">Submit</button>;

    let errorMsg = this.state.error ? 'Invalid Date' : ''

    return (
        <div className="edit-container">
          <form className="edit-form" onSubmit={this.handleSubmit} >
            
            <input
              type="text"
              value={this.state.title}
              onChange={this.update('title')}
              placeholder={this.props.title}
            />
            <input
              type="text"
              value={this.state.location}
              onChange={this.update('location')}
              placeholder={this.props.location}
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
              type="date"
              value={this.state.date}
              onChange={this.update('date')}
              placeholder="Date"
              min={dateNow}
            />
            <div className="form-error">{errorMsg}</div>
            <textarea
              value={this.state.description}
              onChange={this.update('description')}
              placeholder={this.props.description}
            ></textarea>
            <div className="edit-form-btns">
            <button onClick={this.geocode} className="edit-confim-btn">Confirm Location</button>
            {submitButton}
            </div>
            <div className="edit-cancel-btn" onClick={() => this.props.closeUpdate()}>Cancel</div>
          </form>
        </div>
    )
  }
}

export default EventUpdate;