import React from 'react';
import HeaderDropdown from './header_dropdown';
import { Link } from 'react-router-dom';

class HeaderNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDown: false,
    }
  
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // debugger
    if (this.state.dropDown) {
      this.setState({ dropDown: false });
    } else {
      this.setState({ dropDown:true });
    }
  }


  render() {
    const navRight = this.props.loggedIn ? <div onClick={(e) => this.handleClick(e)} id="user-icon" ></div> : <Link to="/signin" >Sign In</Link>;
    // debugger
    return (
      <nav className="header">
        <div className="nav-left-links">
          <Link to="/events" >Events</Link>
        </div>
        <Link className="header-nav-logo" to="/" >
          Grill<strong>Lit</strong>
          
        </Link>
        {/* <div className="header-nav-logo">Grill<strong>Lit</strong></div> */}
        <div className="nav-right-links">
          {/* <div onClick={(e) => this.handleClick(e)}>Sign In</div> */}
          {navRight}
          <HeaderDropdown dropDown={this.state.dropDown} logout={this.props.logout} toggle={this.handleClick} />
        </div>
      </nav>
    )
  }
}

export default HeaderNav;