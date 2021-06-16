import React from 'react';
import { Link } from 'react-router-dom';


class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.handelClick = this.handelClick.bind(this);
  }

  handelClick(e){
    const about = document.querySelector(".home_wrapper")
    about.classList.toggle("open")
  }

  render() {

    return (
      <>
        <figure className="hero-image">
        </figure>
        <section className="hero-section">
          <h1>Come Together</h1>

          <Link className="link-new-a" to="/new">Plan and organize your next group picnic here</Link>

          <div>
            <button className="link-new-b" onClick={ this.handelClick }> About </button>
          </div>

        <div className="home_wrapper">

            {/* <p className="the-x"> &#10005;</p> */}

          <div className="title-about">You’re just steps away 
          <br/> from your next barbecue</div> 

          {/* <line/> */}

          <ol className="list-home">
            <p> 1. Browse</p>
            <div>Start by exploring barbecues in your area and see what you can contribute to the party</div>

            <p>2. Join</p>  
            <div>Sign up to attend a barbecue and bring your dish</div>

            <p>3. Go</p> 
            <div>Connect with friends who share your love of grilling</div>

          </ol>


        </div>
        </section>

      </>
    )
  }
}

export default Hero;