import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class HeaderDropdown extends React.Component {

  render() {
   
    return (
      <>
        <div className={`header-dropdown-screen ${this.props.dropDown}`} onClick={() => this.props.toggle()} ></div>
        <div className={`header-dropdown ${this.props.dropDown}`} >
         
          <Link to="/profile" onClick={() => this.props.toggle()} >Profile Page</Link>
          <Link to="/new" onClick={() => this.props.toggle()} >Create Event</Link>
          <div onClick={() => {this.props.logout(); this.props.toggle()} } >Logout</div>
        </div>
      </>
    )
  }
}

export default HeaderDropdown;