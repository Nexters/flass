import { connect } from 'react-redux';
import FlassApp from './FlassApp';


function mapStateToProps(state) {
  return {
    ...state.flass
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassApp);
