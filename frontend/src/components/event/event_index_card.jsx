import React from 'react';
import { withRouter } from 'react-router-dom';


class EventIndexCard extends React.Component {



  render() {
    const { title, location, description } = this.props.event;
    // debugger
    return (
      <div className="event-index-small" >
        <li>{title}</li>
        <li>{location}</li>
        <li>{description}</li>
      </div>
    )
  }
}

export default withRouter(EventIndexCard);