import React from 'react';
import EventIndexCard from '../event/event_index_card';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedEvents: this.props.likedEvents,
      userEvents: this.props.userEvents,
      nextTab: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.actButtonClick = this.actButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserEvents(this.props.user.id);
    this.props.fetchUser(this.props.user.id);
    this.setState({
      likedEvents: this.props.likedEvents,
      userEvents: this.props.userEvents,
    });
    // this.props.fetchEvents();
  }

  handleClick(e) {
    const target = e.currentTarget.id;
    debugger
    if (target === "liked-events") {
      this.setState({ nextTab: true });
    } else {
      this.setState({ nextTab: false });
    }
  }

  actButtonClick(e) {
    const target = e.currentTarget.innerText;
    const targetId = e.currentTarget.parentElement.id;
    debugger
    if (target === "Cancel Event") {
      this.props.deleteEvent(targetId)
    } else {
      let likes = this.props.likes;
      debugger
      delete likes[targetId];
      debugger
      const user = {
        email: this.props.user.email,
        id: this.props.user.id,
        username: this.props.user.username,
        likes: likes
      };

      this.props.editUser(user);
    }
  }


  render() {

    if (!this.props.userEvents) {
      
      return <h1>Loading...</h1>
    } else {
      
      // const filtered = this.props.events.filter(event => {
      //   return this.state.nextTab ?
      //     this.props.user.likes.includes(event._id):
      //     event.userId === this.props.user.id;
      // })

      const filtered = this.state.nextTab ?
        this.props.likedEvents :
        this.props.userEvents;

      const actButton = this.state.nextTab ?
        <button 
          className="event-index-card-pro-button" 
          onClick = {this.actButtonClick}
        >Unlike Event</button> :
        <button 
          className="event-index-card-pro-button" 
          onClick={this.actButtonClick}
        >Cancel Event</button>

      const events = filtered.map(event => {
          if (typeof(event) === "object" ) {
            return (
              <div className="event-litem-pro" id={event._id}>
                <Link className="event-index-card-pro" key={event._id} to={`/events/${event._id}`}  >
                  <EventIndexCard event={event} />
                </Link>
                {actButton}
              </div>
            )
          }
      })
     
  
      return (
        <div className="event-detail-img">
          <div className="profile-wrapper">
            <div className="user-info">
              <div className="user-info-left">
                {this.props.user.username}
              </div>
              </div>
            <div className="event-list">
              <nav className="event-list-nav">
                <div id="organized-events" onClick={this.handleClick}>Created Events</div>
                <div id="liked-events" onClick={this.handleClick}>Liked Events</div>
              </nav>
              {events}
            </div>
          </div>
        </div>
      )
    }

  }
}

export default UserProfile;