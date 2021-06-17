import React from 'react';
import EventShowMap from '../map/event_show_map'
// import EventIndexCard from './event_index_card'
import EventUpdate from './event_update';


class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    
    this.state =  {
      event: {
        _id: null,
        userId: null,
        invites: null,
        title: null,
        description: null,
        location: null,
        longitude: null,
        latitude: null,
        date: null,
        items: null,
        likes: null
      },
      liked: false,
      joined: false,
      organizer: false,
      updating: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.openUpdate = this.openUpdate.bind(this);
    this.closeUpdate = this.closeUpdate.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }


  componentDidMount() {
    this.props.fetchUser(this.props.userId);
    this.props.fetchEvent(this.props.eventId).then( res => {
      // this.setState({ 
        // _id: res.event.data._id,
        // userId: res.event.data.userId,
        // title: res.event.data.title,
        // description: res.event.data.description,
        // location: res.event.data.location,
        // longitude: res.event.data.longitude,
        // latitude: res.event.data.latitude,
        // date: res.event.data.date,
        // items: res.event.data.items,
        // invites: res.event.data.invites 
      // });
      // const likes = res.event.data.likes.split(" ");
      // const likes = this.props.user.likes;
      const likes = Object.keys(this.props.user.likes);
      let liked = false;

      if (likes.includes(res.event.data._id)) {
        liked = true;
      }
      

      const invites = res.event.data.invites.split(" ");
      let joined = false;

      if (invites.includes(this.props.username)) {
        joined = true;
      }

      let organizer = false;

      if (res.event.data.userId === this.props.userId ) {
        organizer = true;
      }

      this.setState({ 
        event: {
          _id: res.event.data._id,
          userId: res.event.data.userId,
          title: res.event.data.title,
          description: res.event.data.description,
          location: res.event.data.location,
          longitude: res.event.data.longitude,
          latitude: res.event.data.latitude,
          date: res.event.data.date,
          items: res.event.data.items,
          invites: res.event.data.invites,
          likes: res.event.data.likes
        },
        liked: liked,
        joined: joined,
        organizer: organizer
      });
    });
  }



  handleClick(e) {
    if (!this.props.signedIn) {
      this.props.history.push('/signin');
    }

    const target = e.currentTarget.id;
    let users = this.state.event.invites;
    let likers = this.props.user.likes;
    let liked = this.state.liked;
    let joined = this.state.joined;

    if ( target === "join-button" ) {
      if (users.length > 0) {
        users = users.split(" ");

        if (users.includes(this.props.username)) {
          users = users.filter(name => name !== this.props.username);
        } else {
          users.push(this.props.username);
        }

        users = users.join(" ");
      } else {
        users = this.props.username;
      }

      if (this.state.joined) {
        joined = false;
      } else {
        joined = true;
      }
    } else {
      if (likers.length > 0) {
        likers = likers.split(" ");

        if (likers.includes(this.props.userId)) {
          likers = likers.filter(id => id !== `${this.props.userId}`);
        } else {
          likers.push(`${this.props.userId}`);
        }

        likers = likers.join(" ");
      } else {
        likers = `${this.props.userId}`;
      }

      if (this.state.liked) {
        liked = false;
      } else {
        liked = true;
      }
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
      likes: this.props.event.likes
    };

    this.props.editEvent(editEvent);
    
    this.setState({ 
      event: editEvent,
      joined: joined 
    });
  }

  toggleLike(e) {
    if (!this.props.signedIn) {
      this.props.history.push('/signin');
    }

    const target = e.currentTarget.id;
    if (target === "like-button") {
      let likes = this.props.user.likes;
      // likes.push(this.state.event._id);
      likes[this.state.event._id] = this.state.event;
      const user = {
        email: this.props.user.email,
        id: this.props.user.id,
        username: this.props.user.username,
        likes: likes
      };

      this.props.editUser(user);
      this.setState({ liked: true });
    } else {
      // let likes = this.props.user.likes.filter(id => id !== this.state.event._id);
      let likes = this.props.user.likes;
      let eventId = this.state.event._id;
      delete likes.eventId;

      const user = {
        email: this.props.user.email,
        id: this.props.user.id,
        username: this.props.user.username,
        likes: likes
      };

      this.props.editUser(user);
      this.setState({ liked: false });
    }
  }

  closeUpdate(event) {
    if (event) {
      this.setState({ 
        updating: false,
        event: event 
      });
    } else {
      this.setState({ updating: false });
    }
  }

  openUpdate() {
    this.setState({ updating: true });
  }

  render() {
    // if (!this.props.event || this.props.event === {}) {
    if (!this.state.event._id) {
      return (
        <h1>Loading...</h1>
        )
    } else {
        
        const { title, date, location, description } = this.state.event
        const invites = this.state.event.invites
        let inviteList
        if (invites && invites.length > 0) {
          // invites = invites.split(' ')
          inviteList = invites.split(" ").map((invite, i) => <li key={`invite-${i}`}>{invite}</li> )
        }
        // const likes = this.state.event.likes.split(" ");
        const heart = this.state.liked ?
          <div id="liked-button" onClick={this.toggleLike} ></div> :
          <div id="like-button" onClick={this.toggleLike} ></div>;

        const joinText = this.state.joined ? "Leave Event" : "Join Event"
        
        const organizer = this.state.organizer ? 
          <button className="Edit-btn" onClick={() => this.openUpdate()} >Edit</button> :
          <div></div>
      if (this.state.updating) {
        
        return (
          <div className="event-detail-img">
            <div id="back-button" onClick={() => this.props.history.goBack()} ></div>
            <div className="event-detail-wrapper">
              <div className="event-left">
                <div className="event-l-a">
                  <div className="event-l-a-1">{title}</div>
                  <div className="event-l-a-2">
                    <button onClick={this.handleClick} id="join-button" >{joinText}</button>
                  </div>
                  <div className="event-l-a-3" >{heart}</div>
                </div>
                <div className="event-l-b">
                <h1>Edit Event</h1>
                  <EventUpdate 
                    event={this.state.event} 
                    userId={this.state.event.userId}
                    editEvent={this.props.editEvent}
                    closeUpdate={this.closeUpdate}
                  />
                  <div className="event-r-a">
                    {/* <div className="event-r-a-1"></div> */}
                    {/* <div className="event-r-a-2">
                      <h2>People attending the event:</h2>
                      {inviteList}
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="event-right">
                <div className="event-r-b">
                  <EventShowMap event={this.state.event} />
                </div>
              </div>
            </div>
          </div>
        )


      } else {

        return (
          <div className="event-detail-img">
            <div id="back-button" onClick={() => this.props.history.goBack()} ></div>
            <div className="event-detail-wrapper">
              <div className="event-left">
                <div className="event-l-a">
                  <div className="event-l-a-1">{title}</div>
                  <div className="event-l-a-2">
                    <button onClick={this.handleClick} id="join-button" >{joinText}</button>
                  </div>
                  <div className="event-l-a-3" >{heart}</div>
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
                  <div className="event-l-c">
                    <h2>Description:</h2>
                    {description}
                  </div>
                <div className="event-r-a">
                  {/* <div className="event-r-a-1"></div> */}
                  <div className="event-r-a-2">
                    <h2>People attending the event:</h2>
                    {inviteList}
                    </div>
                </div>
                {organizer}
                </div>
              </div>
  
              <div className="event-right">
                <div className="event-r-b">
                  <EventShowMap event={this.state.event} />
                </div>
              </div>
            </div>
          </div>
        )
        
      }
    }

  }
}

export default EventDetail;