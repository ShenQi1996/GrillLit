import { connect } from 'react-redux';
import UserProfile from './user_profile';

const mSTP = (state) => {
  debugger
  return {

    user: state.session.user.email
  }
};

const mDTP = (dispatch) => ({
  
});


export default connect(mSTP, mDTP)(UserProfile);