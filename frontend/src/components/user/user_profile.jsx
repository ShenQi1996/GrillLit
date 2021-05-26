import React from 'react';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="profile-wrapper">
        <div className="user-info">{this.props.user}</div>
        
      </div>
    )
  }
}

export default UserProfile;