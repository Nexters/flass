import { connect } from 'react-redux';
import FlassGrid from './FlassGrid';
import { fetchRequestMyChannelItems } from '../../../modules/Flass/FlassGrid/FlassGridActions';

function mapStateToProps(state) {
  return {
    ...state.flass.grid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRequestMyChannelItems: userId => {
      dispatch(fetchRequestMyChannelItems(userId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassGrid);
