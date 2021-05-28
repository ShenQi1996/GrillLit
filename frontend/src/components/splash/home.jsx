import React from 'react';
import Hero from './hero';

class Home extends React.Component {

  render() {
    return (
      <div className="home-container">
        <Hero/>
        {/* <div className="content2"></div>
        <footer>
          
        </footer> */}
        <div className="home_wrapper">
          <div className="home_wrapper_detail">
            <h1 className="main-splash-home-txt">
              Welcome to GrillLit!
               
            </h1>
            <h1>Plan and organize your next group picnic here

            </h1>
            <ul>Here at GrillLit we make it simple to coordinate a large group grill out in minutes
              <li>1. Sign up with a new account if you don’t already have an account</li>
              <li>2. Create an event, including location, and a list of items for people to bring</li>
              <li>3. Guests will join the event and choose which items they will be bringing</li>
            </ul>
            <h1>In a matter of minutes you can can plan, organize, and invite multiple people as well as organize who would bring what.

            </h1>
            <h1>It’s simple easy and fast

            </h1>
            <h1 className="last-txt-splash">Lets git GrillLit</h1> 
          </div>
        </div>
      </div>
    );
  }
}

export default Home;