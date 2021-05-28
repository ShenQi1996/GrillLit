import { connect } from "react-redux";
import UserProfile from "./user_profile";
import { fetchUserEvents, deleteEvent } from "../../actions/event_actions";

const mSTP = state => {
  return {
    user: state.session.user,
    events: state.session.userEvents,
  };
};

const mDTP = dispatch => ({
  fetchUserEvents: userId => dispatch(fetchUserEvents(userId)),
  deleteEvent: eventId => dispatch(deleteEvent(eventId)),
});

export default connect(mSTP, mDTP)(UserProfile);
