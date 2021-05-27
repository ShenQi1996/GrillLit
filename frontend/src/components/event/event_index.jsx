import React from 'react';
import EventIndexCard from './event_index_card';
import { Link } from 'react-router-dom';
import MapContainer from '../map/event_index_map';


class EventIndex extends React.Component {


  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const events = this.props.events.map( event => {
      return (
        <Link className="event-index-card" key={event._id} to={`/events/${event._id}`  } >
          <EventIndexCard event={event} />
        </Link>
      )
    })

    return (
      <div className="index-wrapper">
        <MapContainer events={this.props.events} />
        <div className="event-index-container" >
          {events}
        </div>
      </div>
    )
  }
}

export default EventIndex;