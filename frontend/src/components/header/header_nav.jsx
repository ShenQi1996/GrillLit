import React from 'react';
import HeaderDropdown from './header_dropdown';

class HeaderNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDown: false,
    }

    // this.setState = this.setState.bind(this);
    // this.state = this.state.bind(this)
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
    // const navRight = this.props.loggedIn ? <div>Sign In</div> : <div>dropdown</div>;

    return (
      <nav className="header">
        <div className="nav-left-links">
          <div>Events</div>
        </div>
        <div className="header-nav-logo">Grill<strong>Lit</strong></div>
        <div className="nav-right-links">
          <div onClick={(e) => this.handleClick(e)}>Sign In</div>

          <HeaderDropdown dropDown={this.state.dropDown}/>
        </div>
      </nav>
    )
  }
}

export default HeaderNav;