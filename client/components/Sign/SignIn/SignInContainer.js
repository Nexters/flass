import { connect } from 'react-redux';
import SignInComponent from './SignInComponent';
import {
  INIT_GOOGLE_SERVICE,
  LOGIN_GOOGLE_SERVICE,
  LOGOUT_GOOGLE_SERVICE
} from '../../../modules/Sign/actions';

function mapStateToProps(state) {
  const { isUserSignedIn, needRedirect } = state.sign;

  return {
    isUserSignedIn,
    needRedirect
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToGoogleAuthPage: () => dispatch({
      type: LOGIN_GOOGLE_SERVICE
    }),
    initGoogleAuthService: () => dispatch({
      type: INIT_GOOGLE_SERVICE
    }),
    signOutGoogleService: () => dispatch({
      type: LOGOUT_GOOGLE_SERVICE
    })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);
