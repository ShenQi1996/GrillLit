import { connect } from 'react-redux';
import { createEvent } from '../../actions/event_actions';
import EventCreate from './event_create';

const mSTP = (state, ownProps) => {
  // debugger
  return {
    signedIn: state.session.isAuthenticated,
    // eventId: ownProps.match.params.eventId,
    user: state.session.user,
    newEvent: state.events.new
  };
};

const mDTP = (dispatch) => ({
  createEvent: (data) => dispatch(createEvent(data))
});


export default connect(mSTP, mDTP)(EventCreate);