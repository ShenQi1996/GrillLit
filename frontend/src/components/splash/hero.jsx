import React from 'react';
import { Link } from 'react-router-dom';


class Hero extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <>
        <figure className="hero-image">
        </figure>
        <section className="hero-section">
          <h1>Come Together</h1>
        </section>

      </>
    )
  }
}

export default Hero;