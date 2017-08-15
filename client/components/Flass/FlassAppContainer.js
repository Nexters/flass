import { connect } from 'react-redux';
import { FETCH_USER } from '../../modules/Flass/User/UserActions';
import FlassApp from './FlassApp';


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (userId) => {
      dispatch({
        type: FETCH_USER,
        userId,
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassApp);
