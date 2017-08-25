import { connect } from 'react-redux';
import Grid from './Grid';
import { FETCH_MY_CHANNEL } from '../../../modules/Flass/Grid/GridActions';

function mapStateToProps(state) {
  return {
    ...state.flass.grid,
    user: { ...state.flass.user }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRequestMyChannelItems: () => {
      dispatch({
        type: FETCH_MY_CHANNEL
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
