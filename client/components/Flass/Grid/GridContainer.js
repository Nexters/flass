import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from './Grid';
import {
  FETCH_MY_CHANNEL,
  DELETE_MY_CHANNEL_ITEM
} from '../../../modules/Flass/Grid/actions';

function mapStateToProps(state) {
  return {
    ...state.flass.grid,
    user: { ...state.flass.user }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRequestMyChannelItems: () => ({
      type: FETCH_MY_CHANNEL
    }),
    deleteMyChannelItem: id => ({
      type: DELETE_MY_CHANNEL_ITEM,
      id
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
