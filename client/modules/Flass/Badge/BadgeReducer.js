import { FETCH_READY_BADGE_HISTORY, FETCH_BADGE_HISTORY_SUCCESS, FETCH_BADGE_HISTORY_ERROR, TOGGLE_BADGE_HISTORY, FETCH_NEW_NOTIFICATION } from './BadgeActions';

const initialState = {
  badgeItems: [],
  toggleBadge: false,
  newNotification: false
};

const BadgeReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_BADGE_HISTORY_SUCCESS:
      return {
        ...state,
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
    case FETCH_NEW_NOTIFICATION:
      return {
        ...state,
        newNotification: action.newNotification
      };
    default:
      return state;
  }
};

export default BadgeReducer;
