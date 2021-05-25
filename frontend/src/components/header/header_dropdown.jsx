import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class HeaderDropdown extends React.Component {

  render() {
    return (
      <div className={`header-dropdown ${this.props.dropDown}`} >
        {/* <Link>Profile Page</Link>
        <Link>Create Event</Link>
        <Link>Logout</Link> */}
        <div>Profile Page</div>
        <div>Create Event</div>
        <div>Logout</div>
      </div>
    )
  }
}

export default HeaderDropdown;