import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInComponent from './SignInComponent';
import {
  INIT_GOOGLE_SERVICE,
  LOGIN_FLASS_SERVICE,
  LOGOUT
} from '../../../../modules/Sign/actions';

function mapStateToProps(state) {
  const { isUserSignedIn, needRedirect, sessionValid, prevPath } = state.sign;

  return {
    isUserSignedIn,
    needRedirect,
    sessionValid,
    prevPath
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    goToGoogleAuthPage: () => ({
      type: LOGIN_FLASS_SERVICE
    }),
    initGoogleAuthService: () => ({
      type: INIT_GOOGLE_SERVICE
    }),
    signOutFlassService: () => ({
      type: LOGOUT
    })
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);
