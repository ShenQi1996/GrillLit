import { connect } from "react-redux";
import UserProfile from "./user_profile";
import { fetchUserEvents, deleteEvent, fetchEvents } from "../../actions/event_actions";
import { editUser, fetchUser } from "../../actions/session_actions";

const mSTP = state => {
  return {
    user: state.session.user,
    userEvents: state.session.userEvents,
    likedEvents: Object.values(state.session.user.likes),
    likes: state.session.user.likes
  };
};

const mDTP = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchUserEvents: userId => dispatch(fetchUserEvents(userId)),
  deleteEvent: eventId => dispatch(deleteEvent(eventId)),
  fetchUser: userId => dispatch(fetchUser(userId)),
  editUser: user => dispatch(editUser(user)),
});

export default connect(mSTP, mDTP)(UserProfile);
