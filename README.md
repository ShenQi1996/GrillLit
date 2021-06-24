# **GrillLit**
https://grilllit.herokuapp.com/#/
___
##    **Overview**
![grillit-gif 2](https://user-images.githubusercontent.com/75746588/122280482-3cd71e00-ceb7-11eb-8255-d67dcaed112c.gif)

**GrillLit** is a networking app for those that want to get together and grill. A user will create an event and invite other users. The event will have items that will need to be brought and as user’s join the event they can check off what they wish to bring. User’s will also be able to view the location of the GrillLit event on a map.

Often times groups of people want to get together in the summer to have fun outside and get
their grill's lit. The issue that GrillLit solves the the chaotic process of coordinating who brings what and how much. GrillLit allows a user to create an event with specified items to bring, the event creater will also be able to invite user's. The individual users will then get an invite and upon acceptance they will choose of the remaining items where they will bring the GrillLit event. 

Kick off the summer with a BBQ with loved ones in an organized and convenient fashion! This website implements amazing CRUD, with a backend and front end that syncs together like a cold class of water on a hot summer day.

Browse events, create events, join events, like events and much more!

## **About**
This app is all about getting friends and family together to enjoy some nice delicious barbeque.
Find grilling events that were created by others within your locality, allowing you to be able to socialize and network with others who love good food and enjoy the company of others. 

## **How does it work?**
___
In this app, users will be able to create an account or log into an existing account. Once you are officially logged in you will be given the ability to browse through events that interest you. When you have clicked on the event that catches your eye, then you will be given the option to like the event or to join the event. When the join event button is clicked, you will see the username of the current user added to the list of attendees. That event will be in your events page that will be saved into your account.

There other features such as a search feature that filters out events based on what you type into the search box making it quick and easy too find the exact event that you are looking to attend.

You also have the power to create an event to your own liking, which includes the title, description, date, location, and food items for the event. 
In the unfortunate event that the event falls through, you are given the opportunity to cancel/delete the event. 

Now its time to GrillLit like a pro!

## **Who is this app for?**
This app is for expert grillers all the way through to beginner grillers, or even people who dont know how to grill. This app is meant to bring loved ones together to enjoy some delicious grilled food!

___
##    **Functionality and MVP**
* Splash page where user's can navigate to the rest of the web application
* User authentication for sign up and log in (dedicated pages)
* Ability to create events and invite user's giving the invites item options to select from upon accepting the invite
* Google map feature where user's can view the location of the event on a map
* User's will be able to search for specific titles from all events

##    **Technologies**
GrillLit utilized MERN-stack that includes geocoding for Google Maps. 

##MERN Stack
The MERN stack deals with the frontend (react) as well as the backend (MongoDB), these technologies allowed for a smooth synchronization between the front and back end.

 - **Frontend**
	 - React
	 - Redux
	 - Node
	 - Google Maps API

 - **Backend**
	 - MongoDB
	 - Express
___

## **Implementation Details**
### Geocoding (Google Maps implementation)

In the events page, a user will see markers distributed over the google maps portion of the page allowing them to visualize where the events are taking place throughout the world.
![Screen Shot 2021-06-16 at 3 43 08 PM](https://user-images.githubusercontent.com/75746588/122282594-950f1f80-ceb9-11eb-95d5-50f03f59863b.png)

### MongoDB/Mongoose
The structure for the backend includes MongoDB's No-SQL database structure which allows for the storing of events and user information.
![Screen Shot 2021-06-16 at 3 58 39 PM](https://user-images.githubusercontent.com/75746588/122284605-bffa7300-cebb-11eb-9e13-2d3c47267687.png)

This project also uses Mongoose for the routing necessary for requests made from the interaction of the users in the frontend.
```
router.get("/index", (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noeventsfound: "No events found" }));
});

router.get("/user/:user_id", (req, res) => {
  Event.find({ userId: req.params.user_id })
    .sort({ date: -1 })
    .then(events => res.json(events))
    .catch(err =>
      res
        .status(404)
        .json({ noeventsfound: "No events were found of that user" })
    );
});

router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err =>
      res.status(404).json({ noeventfound: "No event found with that ID" })
    );
});
```

### React and Redux
React was the frontend technology used, it allows to have a smooth and seamless user interaction/experience also allowing for the code to be DRY.
```
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
```
Redux allows for the saving of data in the frontend which will make the user experience much more fluid and responsive, also minimizing the requests needed to be made to the backend. 
```
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
```
## Design Documents
https://github.com/ShenQi1996/GrillLit.wiki.git


