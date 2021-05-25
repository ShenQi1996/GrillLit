import React from 'react';
import { withRouter, Link  } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
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
      password: this.state.password
    };
    this.props.login(user);
    // this.props.login(user).then( () => {
    //   if (this.props.signedIn) {
    //     this.props.history.push('/');
    //   }
    // });
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
        <form onSubmit={this.handleSubmit} className="signup-form">
          <div>
            <input type="text"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            <br />
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
          <Link to="/signup">Don't have an account? Sign Up.</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);