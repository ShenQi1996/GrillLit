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
      this.setState({ 
        _id: res.event.data._id,
        userId: res.event.data.userId,
        title: res.event.data.title,
        description: res.event.data.description,
        location: res.event.data.location,
        longitude: res.event.data.longitude,
        latitude: res.event.data.latitude,
        date: res.event.data.date,
        items: res.event.data.items,
        invites: res.event.data.invites 
      });
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
    if (!this.props.event || this.props.event === {}) {
      return (
        <h1>Loading...</h1>
        )
      } else {
        
        const { title, date, location, description, invites } = this.props.event
        
        let inviteList
        if (invites && invites.length > 0) {
          // invites = invites.split(' ')
          inviteList = invites.split(" ").map((invite, i) => <li key={`invite-${i}`}>{invite}</li> )
        }
        debugger
        
      return (
        <div className="event-detail-img">
          <div id="back-button" onClick={() => this.props.history.goBack()} ></div>
          <div className="event-detail-wrapper">
            <div className="event-left">
              <div className="event-l-a">
                <div className="event-l-a-1">{title}</div>
                <div className="event-l-a-2">
                  <button onClick={this.handleClick} id="join-button" >Join Event</button>
                </div>
              </div>
              <div className="event-l-b">
                <div className="b-1">
                  <h2>Date</h2>
                  <li>{date}</li>
                </div>
                <div className="b-2">
                  <h2>Location</h2>
                  <li>{location}</li>
                </div>
              </div>
              <div className="event-l-c">{description}</div>
            </div>

            <div className="event-right">
              <div className="event-r-a">
                <div className="event-r-a-1"></div>
                <div className="event-r-a-2">
                  <h2>People attending the event:</h2>
                  {inviteList}
                  </div>
              </div>
              <div className="event-r-b">
                <EventShowMap event={this.state} />
              </div>
            </div>
          </div>
        </div>
      )
    }

  }
}

export default EventDetail;