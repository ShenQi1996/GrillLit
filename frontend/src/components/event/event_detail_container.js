import { connect } from 'react-redux';
import { fetchEvent } from '../../actions/event_actions';
import EventDetail from './event_detail';

const mSTP = (state, ownProps) => {
  // debugger
  return {
    signedIn: state.session.isAuthenticated,
    eventId: ownProps.match.params.eventId,
    userId: state.session.user.id,
    event: state.events.selected
  };
};

const mDTP = (dispatch) => ({
  fetchEvent: (eventId) => dispatch(fetchEvent(eventId))
});


export default connect(mSTP, mDTP)(EventDetail);