import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInComponent from './SignInComponent';
import {
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
    signOutFlassService: () => ({
      type: LOGOUT
    })
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInComponent);
