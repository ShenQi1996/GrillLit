import React from 'react';
import EventIndexCard from './event_index_card';
import { Link } from 'react-router-dom';
import MapContainer from '../map/event_index_map';
import Filter from '../splash/filter';


class EventIndex extends React.Component {


  componentWillUnmount() {
    const navBar = document.querySelector(".header");
    navBar.classList.remove("white");
  }

  componentDidMount() {
    // debugger
    this.props.fetchEvents();
    const navBar = document.querySelector(".header");
    navBar.classList.add("white");
  }

  
  render() {
    // debugger
    if (!this.props.events) {
      return <h1>Loading...</h1>
    } else {
      const events = this.props.events.map( event => {
        return (
            <Link className="event-index-card-index" key={event._id} to={`/events/${event._id}`  } >
              <EventIndexCard event={event} />
            </Link>
        )
      })
  
      return (
        <div className="index-wrapper">
          <MapContainer events={this.props.events} />
          <div className="event-index-container" >
          <div className="interactive">
              <Filter events={this.props.events} />
          </div>
            {events}
          </div>
        </div>
      )
    }

  }
}

export default EventIndex;