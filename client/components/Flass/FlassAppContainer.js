import { connect } from 'react-redux';
import { FETCH_USER } from '../../modules/Flass/User/UserActions';
import FlassApp from './FlassApp';


function mapStateToProps(state) {
  return {
    ...state.flass.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (token) => {
      dispatch({
        type: FETCH_USER,
        token,
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassApp);
