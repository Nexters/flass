import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SessionCheckBeforeRoute from './SessionCheckBeforeRoute';
import {
  CHECK_SESSION,
  setEntryPoint
} from '../../modules/Sign/actions';
import {
  FETCH_USER
} from '../../modules/Flass/User/actions';

function mapStateToProps(state) {
  const { sessionValid, isSessionChecking } = state.sign;
  return { sessionValid, isSessionChecking };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkSession: () => ({
      type: CHECK_SESSION
    }),
    fetchUser: () => ({
      type: FETCH_USER
    }),
    setEntryPoint
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionCheckBeforeRoute);
