import { connect } from "react-redux";
import { fetchEvent, editEvent } from "../../actions/event_actions";
import EventDetail from "./event_detail";

const mSTP = (state, ownProps) => {
  return {
    signedIn: state.session.isAuthenticated,
    eventId: ownProps.match.params.eventId,
    username: state.session.user.username,
    userId: state.session.user.id,
    event: state.events.selected,
  };
};

const mDTP = dispatch => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId)),
  editEvent: eventId => dispatch(editEvent(eventId)),
});

export default connect(mSTP, mDTP)(EventDetail);
