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
            <h1>
              Summer is here time to get Lit! 
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;