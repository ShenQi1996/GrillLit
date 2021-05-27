import React from 'react';
import EventIndexCard from '../event/event_index_card';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchUserEvents(this.props.user.id)
  }


  render() {
    debugger
    if (!this.props.events) {
      return <h1>Loading...</h1>
    } else {
       
      const events = this.props.events.map(event => {
        return (
          <>
            <Link className="event-index-card" key={event._id} to={`/events/${event._id}`} >
              <EventIndexCard event={event} />
            </Link>
            <button onClick={() => this.props.deleteEvent(event._id)} >Cancel Event</button>
          </>
        )
      })
  
      return (
        <div className="event-detail-img">
          <div className="profile-wrapper">
            <div className="user-info">{this.props.user.email}</div>
            <div className="event-list">
              {events}
            </div>
          </div>
        </div>
      )
    }

  }
}

export default UserProfile;