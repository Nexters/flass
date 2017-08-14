import { connect } from 'react-redux';
import { FETCH_BADGE_HISTORY, TOGGLE_BADGE_HISTORY } from '../../../../modules/Flass/Badge/BadgeActions';
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
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Badge);
