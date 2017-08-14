import { connect } from 'react-redux';
import FlassGrid from './Grid';
import { FETCH_MY_CHANNEL } from '../../../modules/Flass/Grid/GridActions';

function mapStateToProps(state) {
  return {
    ...state.flass.grid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRequestMyChannelItems: userId => {
      dispatch({ type: FETCH_MY_CHANNEL, payload: { userId } });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassGrid);
