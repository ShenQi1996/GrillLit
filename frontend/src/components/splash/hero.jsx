import React from 'react';
import { Link } from 'react-router-dom';


class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solid: false,
      header: document.querySelector(".header")
    };

    this.handelClick = this.handelClick.bind(this);
    this.headerSwitch = this.headerSwitch.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.headerSwitch);
  }

  componentWillUnmount() {
    const navBar = document.querySelector(".header");
    navBar.classList.remove("white");
    window.removeEventListener("scroll", this.headerSwitch);
  }

  headerSwitch() {
    let header = document.querySelector(".header");
    if (window.scrollY >= 125) {
      header.classList.add("white");
      this.setState({ solid: true });
    } else {
      header.classList.remove("white");
      this.setState({ solid: false });
    }
  }

  handelClick(e){
    const about = document.querySelector(".home_wrapper");
    about.classList.toggle("open");
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
            <button className="link-new-b" onClick={ this.handelClick }> How It Works </button>
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