import React from 'react';
import EventIndexCard from './event_index_card';
import { Link } from 'react-router-dom';
import MapContainer from '../map/event_index_map';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import EventIndexMap from '../map/event_index_map';


class EventIndex extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputVal: '',
      matches: null
    };
    this.selectName = this.selectName.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  
  componentWillUnmount() {
    const navBar = document.querySelector(".header");
    navBar.classList.remove("white");
  }

  componentDidMount() {
    // debugger
    this.props.fetchEvents().then(({ events }) => {
      this.setState({ matches: events.data });
    });
    const navBar = document.querySelector(".header");
    navBar.classList.add("white");
  }

  handleInput(event){

    this.setState({ inputVal: event.currentTarget.value },
      () => this.setState({ matches: this.matches() }));
  }

  matches() {
    // debugger
    let matches = [];
    if (this.state.inputVal.length === 0) {
      return this.props.events;
    }

    this.props.events.forEach(event => {
      const sub = event.title.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
        // debugger 
        matches.push(event);
      }
    });

    if (matches.length === 0) {
      matches = this.props.events;
    }

    return matches;
    // this.setState({ matches: matches });
  }

  selectName(event){
    const name = event.title;
    this.setState({ inputVal: name });
  }

  render() {
        // debugger
        
        const matches = this.matches();
        // debugger;
        if (!this.state.matches) {
          return <h1>Loading...</h1>
        } else {

          const results = this.state.matches.map(event => {
            // debugger
            
              return (
                  <Link className="event-index-card-index" key={event._id} to={`/events/${event._id}`} id={event._id} >
                    <EventIndexCard event={event} />
                  </Link>
              )
          });
          
          const events = this.props.events.map(event => {
            return (
            <Link className="event-index-card-index" key={event._id} to={`/events/${event._id}`} >
                <EventIndexCard event={event} />
            </Link>
          )

      })
      // debugger 
      if (results.length === 0){
        return (
          <div className="event-index-container" >
            {/* <div className="interactive"> */}
            {/* <Filter events={this.props.events} /> */}
            {/* <div className="auto"> */}
            <input
              onChange={this.handleInput}
              value={this.state.inputVal}
              placeholder='Search...'
            />
            <ul>
              <ReactCSSTransitionGroup
                transitionName='auto'
                transitionEnterTimeout={600}
                transitionLeaveTimeout={600}>
                {events}
              </ReactCSSTransitionGroup>
            </ul>
            {/* </div> */}
            {/* </div> */}
            {/* {events} */}
          </div>
        )
      } else {
        return (
            <div className="index-wrapper">
                <MapContainer events={this.state.matches} />
                <div className="event-index-container" >
                    {/* <div className="interactive"> */}
          
                        {/* <div className="auto"> */}
                          <input
                            onChange={this.handleInput}
                            value={this.state.inputVal}
                            placeholder='Search...'
                          />
                          <ul>     
                            <ReactCSSTransitionGroup
                              transitionName='auto'
                              transitionEnterTimeout={600}
                              transitionLeaveTimeout={600}>
                              {results}
                            </ReactCSSTransitionGroup>
                          </ul>
                        {/* </div> */}
                    {/* </div> */}
                    {/* {events} */}
                </div>
            </div>
        )
      }
    }
  }
}

export default EventIndex;