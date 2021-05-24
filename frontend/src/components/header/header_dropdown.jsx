import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class HeaderDropdown extends React.Component {

  render() {
    return (
      <div className={`header-dropdown ${this.props.dropDown}`} >
        {/* <Link>Profile Page</Link>
        <Link>Create Event</Link>
        <Link>Logout</Link> */}
        dropdown
      </div>
    )
  }
}

export default HeaderDropdown;