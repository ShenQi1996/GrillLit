import React from 'react';
import EventShowMap from '../map/event_show_map'
// import EventIndexCard from './event_index_card'


class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    
    this.state =  {
      _id: this.props.event._id,
      userId: this.props.event.userId,
      invites: this.props.event.invites,
      title: this.props.event.title,
      description: this.props.event.description,
      location: this.props.event.location,
      longitude: this.props.event.longitude,
      latitude: this.props.event.latitude,
      date: this.props.event.date,
      items: this.props.event.items,
    }
    // debugger
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount() {
    this.props.fetchEvent(this.props.eventId).then( res => {
      this.setState({ invites: res.event.data.invites });
    })
  
  }

  handleClick() {
    if (!this.props.signedIn) {
      this.props.history.push('/signin');
    }
 
    let users = this.props.event.invites;
    if (users.length > 0) {
     
      users = users.split(" ");
      users.push(this.props.username);
      users = users.join(" ");
    } else {
      users = this.props.username;
    }
    

    const editEvent = {
      _id: this.props.event._id,
      userId: this.props.event.userId,
      invites: users,
      title:this.props.event.title,
      description: this.props.event.description,
      location:this.props.event.location,
      longitude: this.props.event.longitude,
      latitude: this.props.event.latitude,
      date: this.props.event.date,
      items: this.props.event.items,
    };

   

    this.props.editEvent(editEvent);
    this.setState({ invites: users });
  }

  render() {
    // debugger
    if (!this.props.event) {
      return (
        <h1>Loading...</h1>
      )
    } else {
      
      const { title, date, location, description } = this.props.event


      return (
        <div className="event-detail-img">
          <div id="back-button" onClick={() => this.props.history.goBack()} >BACK</div>
          <div className="event-detail-wrapper">
            <div className="event-left">
              <div className="event-l-a">
                <div className="event-l-a-1">{title}</div>
                <div className="event-l-a-2">
                  <button onClick={this.handleClick} >Join</button>
                </div>
              </div>
              <div className="event-l-b">
                <li>{date}</li>
                <li>{location}</li>
              </div>
              <div className="event-l-c">{description}</div>
            </div>

            <div className="event-right">
              <div className="event-r-a">
                <div className="event-r-a-1">items</div>
                <div className="event-r-a-2">{this.state.invites}</div>
              </div>
              <div className="event-r-b">
                <EventShowMap event={this.props.event} />
              </div>
            </div>
          </div>
        </div>
      )
    }

  }
}

export default EventDetail;