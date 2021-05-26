import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class HeaderDropdown extends React.Component {

  render() {
   
    return (
      <>
        <div className={`header-dropdown-screen ${this.props.dropDown}`} onClick={() => this.props.toggle()} ></div>
        <div className={`header-dropdown ${this.props.dropDown}`} >
          {/* <Link>Create Event</Link> */}
    
          
          <Link to="/profile" >Profile Page</Link>
          <div>Create Event</div>
          <div onClick={() => {this.props.logout(); this.props.toggle()} } >Logout</div>
        </div>
      </>
    )
  }
}

export default HeaderDropdown;