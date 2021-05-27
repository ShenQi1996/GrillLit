import React from 'react';
// import EventIndexCard from './event_index_card'


class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount() {
    this.props.fetchEvent(this.props.eventId);
  }

  handleClick() {
    if (!this.props.signedIn) {
      this.props.history.push('/signin');
    }
  }

  render() {
    // debugger
    if (!this.props.event) {
      return (
        <h1>Loading...</h1>
      )
    } else {
      
      const { title, date, location, description } = this.props.event


      return (
        <div className="event-detail-img">
          <div id="back-button" onClick={() => this.props.history.goBack()} >BACK</div>
          <div className="event-detail-wrapper">
            <div className="event-left">
              <div className="event-l-a">
                <div className="event-l-a-1">{title}</div>
                <div className="event-l-a-2">
                  <button onClick={this.handleClick} >Join</button>
                </div>
              </div>
              <div className="event-l-b">
                <li>{date}</li>
                <li>{location}</li>
              </div>
              <div className="event-l-c">{description}</div>
            </div>

            <div className="event-right">
              <div className="event-r-a">
                <div className="event-r-a-1">items</div>
                <div className="event-r-a-2">invites</div>
              </div>
              <div className="event-r-b">map</div>
            </div>
          </div>
        </div>
      )
    }

  }
}

export default EventDetail;