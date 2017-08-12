import { connect } from 'react-redux';
import { FETCH_USER } from './FlassUser/FlassUserActions';
import FlassApp from '../../components/Flass/FlassApp';


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
