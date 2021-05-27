import React from 'react';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="event-detail-img">
        <div className="profile-wrapper">
          <div className="user-info">{this.props.user}</div>
          
        </div>
      </div>
    )
  }
}

export default UserProfile;