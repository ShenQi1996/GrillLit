import { connect } from "react-redux";
import { fetchEvent, editEvent } from "../../actions/event_actions";
import { editUser, fetchUser } from "../../actions/session_actions";
import EventDetail from "./event_detail";

const mSTP = (state, ownProps) => {
  return {
    signedIn: state.session.isAuthenticated,
    eventId: ownProps.match.params.eventId,
    username: state.session.user.username,
    userId: state.session.user.id,
    user: state.session.user,
    event: state.events.selected,
  };
};

const mDTP = dispatch => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId)),
  fetchUser: userId => dispatch(fetchUser(userId)),
  editEvent: eventId => dispatch(editEvent(eventId)),
  editUser: user => dispatch(editUser(user)),
});

export default connect(mSTP, mDTP)(EventDetail);
