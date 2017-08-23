import { FETCH_READY_BADGE_HISTORY, FETCH_BADGE_HISTORY_SUCCESS, FETCH_BADGE_HISTORY_ERROR, TOGGLE_BADGE_HISTORY } from './BadgeActions';

const initialState = {
  badgeType: 'comment',
  badgeItems: [],
  toggleBadge: false,
};

const BadgeReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_BADGE_HISTORY_SUCCESS:
      return {
        ...state,
        badgeType: action.badgeType || state.badgeType,
        badgeItems: action.badgeItems,
      };
    case FETCH_BADGE_HISTORY_ERROR:
    case FETCH_READY_BADGE_HISTORY:
      return {
        ...state,
        badgeItems: [],
      };
    case TOGGLE_BADGE_HISTORY:
      return {
        ...state,
        toggleBadge: !state.toggleBadge,
      };
    default:
      return state;
  }
};

export default BadgeReducer;
