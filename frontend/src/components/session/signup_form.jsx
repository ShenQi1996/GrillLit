import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentDidMount() {
    const navBar = document.querySelector(".header");
    navBar.classList.add("white");
  }

  componentWillUnmount() {
    const navBar = document.querySelector(".header");
    navBar.classList.remove("white");
  }

  componentDidUpdate(prevProps) {
    if (this.props.signedIn && !prevProps.signedIn) {
      this.props.history.push('/');
    }

    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup-form-container">
        <figure className="signup-img"></figure>
        <form onSubmit={this.handleSubmit}  className="signup-form">
            {/* <br /> */}
            <h1 className="signup-h1">
              Sign Up
            </h1>
            <div>
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            {/* <br /> */}
            <input type="text"
              value={this.state.username}
              onChange={this.update('username')}
              placeholder="username"
            />
            {/* <br /> */}
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            {/* <br /> */}
            <input type="password"
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder="Confirm Password"
            />
            {/* <br /> */}
            <input type="submit" value="Submit" />
            {this.renderErrors()}
            </div>
            <Link to="/signin">Already have an account? Sign in.</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);