import { connect } from 'react-redux';
import FlassGrid from './FlassGrid';
import { FETCH_MY_CHANNEL } from '../../../modules/Flass/FlassGrid/FlassGridActions';

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
