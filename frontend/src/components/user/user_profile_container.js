import { connect } from 'react-redux';
import UserProfile from './user_profile';
import { fetchUserEvents } from '../../actions/event_actions';

const mSTP = (state) => {
  return {
    user: state.session.user,
    events: state.session.userEvents,
  }
};

const mDTP = (dispatch) => ({
  fetchUserEvents: (userId) => dispatch(fetchUserEvents(userId))
});


export default connect(mSTP, mDTP)(UserProfile);