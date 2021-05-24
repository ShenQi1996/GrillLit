import { connect } from 'react-redux';
// import { logout } from '../../actions/session_actions';
import HeaderNav from './header_nav';

const mSTP = (state) => ({
  // loggedIn: state.session.isAuthenticated
});

const mDTP = (dispatch) => ({
  // logout,
});

export default connect(mSTP, mDTP)(HeaderNav);