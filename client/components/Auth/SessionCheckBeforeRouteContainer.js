import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SessionCheckBeforeRoute from './SessionCheckBeforeRoute';
import {
  CHECK_SESSION
} from '../../modules/Sign/actions';
import {
  FETCH_USER
} from '../../modules/Flass/User/UserActions';

function mapStateToProps(state) {
  const { sessionValid } = state.sign;
  return { sessionValid };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkSession: () => ({
      type: CHECK_SESSION
    }),
    fetchUser: () => ({
      type: FETCH_USER
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionCheckBeforeRoute);
