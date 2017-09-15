import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FETCH_USER }  from '../../modules/Flass/User/actions';
import { LOGOUT } from '../../modules/Sign/actions';
import FlassApp from './FlassApp';


function mapStateToProps(state) {
  return {
    ...state.flass.user,
    ...state.sign
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUser: () => ({
      type: FETCH_USER
    }),
    signOutFlassService: () => ({
      type: LOGOUT
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassApp);
