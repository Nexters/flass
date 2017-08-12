import { connect } from 'react-redux';
import { FETCH_BADGE_HISTORY, TOGGLE_BADGE_HISTORY } from './FlassBadgeActions';
import Badge from '../../../components/Flass/FlassAppBar/Badge/Badge';

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
