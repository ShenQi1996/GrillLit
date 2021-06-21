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
    this.filterLikedEvents = this.filterLikedEvents.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchEvents();
    this.props.fetchUserEvents(this.props.user.id);
    this.props.fetchUser(this.props.user.id);
    const allEvents = this.props.allEvents;
    const likedEvents = this.props.likedEvents;
    const realEvents = [];
    
    this.setState({
      likedEvents: this.props.likedEvents,
      userEvents: this.props.userEvents,
    });
  }

  handleClick(e) {
    const target = e.currentTarget.id;
    
    if (target === "liked-events") {
      this.setState({ nextTab: true });
    } else {
      this.setState({ nextTab: false });
    }
  }

  actButtonClick(e) {
    const target = e.currentTarget.innerText;
    const targetId = e.currentTarget.parentElement.id;
    
    if (target === "Cancel Event") {
      this.props.deleteEvent(targetId);
      
    } else {
      let likes = this.props.user.likes;
      
      delete likes[targetId];
      
      const user = {
        email: this.props.user.email,
        id: this.props.user.id,
        username: this.props.user.username,
        likes: likes
      };

      this.props.editUser(user);
      this.setState({ likedEvents: this.filterLikedEvents() });
    }
  }

  filterLikedEvents() {
    const allEvents = this.props.allEvents;
    const likedEvents = this.props.likedEvents;
    const likedEventsObj = this.props.user.likes;
    const realEvents = [];

    allEvents.forEach(element => {
      realEvents.push(element._id);
    });

    const liked = [];

    likedEvents.forEach(element => {
      if (realEvents.includes(element._id)) {
        liked.push(element);
      } else {
        delete likedEventsObj[element._id];
      }
    });
    
    const user = {
      email: this.props.user.email,
      id: this.props.user.id,
      username: this.props.user.username,
      likes: likedEventsObj
    };

    if ((likedEvents.length - 1) !== liked.length) {
      this.props.editUser(user);
    }

    return liked;
  }


  render() {
    
    if (!this.props.userEvents) {
      
      return <div className="loading-screen"><div className="loading"></div></div>
    } else {
      
      // const filtered = this.props.events.filter(event => {
      //   return this.state.nextTab ?
      //     this.props.user.likes.includes(event._id):
      //     event.userId === this.props.user.id;
      // })
      const likTabClass = this.state.nextTab ?
        "":
        "open-tab"

      const orgTabClass = this.state.nextTab ?
        "open-tab":
        ""

      // const allEvents = this.props.allEvents;
      // const likedEvents = this.props.likedEvents;
      // const realEvents = [];

      // allEvents.forEach(element => {
      //   realEvents.push(element._id);
      // });

      // const liked = [];

      // likedEvents.forEach(element => {
      //   if (realEvents.includes(element._id)) {
      //     liked.push(element);
      //   }
      // });


      let filtered = this.state.nextTab ?
        this.filterLikedEvents() :
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
              <div className="event-litem-pro" id={event._id} key={event._id}>
                <Link className="event-index-card-pro"  to={`/events/${event._id}`}  >
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
                <div id="organized-events" className={orgTabClass} onClick={this.handleClick}>Created Events</div>
                <div id="liked-events" className={likTabClass} onClick={this.handleClick}>Liked Events</div>
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