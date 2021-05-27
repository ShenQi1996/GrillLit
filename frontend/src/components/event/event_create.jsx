import React from 'react';

class EventCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.userId,
      // invites: [],
      title: '',
      description: '',
      location: '' ,
      longitude: '',
      latitude: '',
      date: '',
      // items: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    debugger
    this.setState({ newEvent: nextProps.newEvent });
  }

  handleSubmit(e) {
    e.preventDefault();
    // let event = {
    //   text: this.state.text
    // };

    this.props.createEvent(this.state);
    this.setState({ 
      userId: this.props.userId,
      title: '',
      description: '',
      location: '',
      longitude: '',
      latitude: '',
      date: '',
     })
  }

  update(field) {
    console.log(this.state);
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  // render() {
  //   return (
  //     <div>
  //       <form onSubmit={this.handleSubmit}>
  //         <div>
  //           <input type="textarea"
  //             value={this.state.text}
  //             onChange={this.update()}
  //             placeholder="Write your tweet..."
  //           />
  //           <input type="submit" value="Submit" />
  //         </div>
  //       </form>
        
        
  //     </div>
  //   )
  // }
  render() {
    return (
    <div className="event-detail-img">
      <div className="new-event-wrapper">
        <form className="new-event-form" onSubmit={this.handleSubmit} >
          <input 
            type="text" 
            value={this.state.title}
            onChange={this.update('title')}
            placeholder="Title"
          />
          <input 
            type="text" 
            value={this.state.location}
            onChange={this.update('location')}
            placeholder="Location"
          />
          <input 
            type="text" 
            value={this.state.latitude}
            onChange={this.update('latitude')}
            placeholder="Latitude"
          />
          <input 
            type="text" 
            value={this.state.longitude}
            onChange={this.update('longitude')}
            placeholder="Longitude"
          />
          <input 
            type="text" 
            value={this.state.date}
            onChange={this.update('date')}
            placeholder="Date"
          />

          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
    )
  }
}

export default EventCreate;