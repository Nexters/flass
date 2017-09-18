import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LOGOUT } from '../../../modules/Sign/actions';
import FlassViewComponent from './FlassViewComponent';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signOutFlassService: () => ({
      type: LOGOUT
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlassViewComponent);
