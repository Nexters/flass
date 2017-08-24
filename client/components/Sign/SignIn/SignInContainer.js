import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInComponent from './SignInComponent';
import {
  INIT_GOOGLE_SERVICE,
  LOGIN_GOOGLE_SERVICE,
  LOGOUT_GOOGLE_SERVICE,
  LOGOUT_FLASS_SERVICE
} from '../../../modules/Sign/actions';

function mapStateToProps(state) {
  const { isUserSignedIn, needRedirect } = state.sign;

  return {
    isUserSignedIn,
    needRedirect
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    goToGoogleAuthPage: () => ({
      type: LOGIN_GOOGLE_SERVICE
    }),
    initGoogleAuthService: () => ({
      type: INIT_GOOGLE_SERVICE
    }),
    signOutGoogleService: () => ({
      type: LOGOUT_GOOGLE_SERVICE
    }),
    signOutFlassService: () => ({
      type: LOGOUT_FLASS_SERVICE
    })
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);
