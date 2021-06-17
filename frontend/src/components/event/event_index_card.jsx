import React from 'react';
import { withRouter } from 'react-router-dom';


class EventIndexCard extends React.Component {



  render() {
    const { title, location, description, _id } = this.props.event;
    if (typeof(this.props.event) === "object" ) {
      let desc = this.props.event.description;
      if (description.length > 40) {
        desc = description.slice(0, 30) + "...";
      }
      
      return (
        <div className="event-index-small" id={_id}>
          <li className="event-index-small-title">{title}</li>
          <li>{location}</li>
          <li>{desc}</li>
        </div>
      )
    } else {
      return null
    }
  }
}

export default withRouter(EventIndexCard);