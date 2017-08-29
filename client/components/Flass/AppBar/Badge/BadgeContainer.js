import { connect } from 'react-redux';
import { FETCH_BADGE_HISTORY, TOGGLE_BADGE_HISTORY, POST_NOTIFICATION_CHECK } from '../../../../modules/Flass/Badge/BadgeActions';
import Badge from './Badge';

function mapStateToProps(state) {
  return {
    ...state.flass.badge
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBadgeHistory: (userId, badgeType) => {
      dispatch({
        type: FETCH_BADGE_HISTORY,
        badgeType,
        userId
      });
    },
    toggleBadgeHistory: () => {
      dispatch({
        type: TOGGLE_BADGE_HISTORY
      });
    },
    postNotificationCheck: () => {
      dispatch({
        type: POST_NOTIFICATION_CHECK
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Badge);
