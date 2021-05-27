import { connect } from 'react-redux';
import { fetchEvents } from '../../actions/event_actions';
import EventIndex from './event_index';

const mSTP = (state) => {
  // debugger
  return {
    signedIn: state.session.isAuthenticated,
    userId: state.session.user.id,
    events: Object.values(state.events.all)
  }
};

const mDTP = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents())
});


export default connect(mSTP, mDTP)(EventIndex);