import React from 'react';
import EventIndexCard from './event_index_card';
import { Link } from 'react-router-dom';


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
        <div className="event-index-container" >
          {events}
        </div>
      </div>
    )
  }
}

export default EventIndex;