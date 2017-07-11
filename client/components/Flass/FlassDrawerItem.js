import React, {Component, PropTypes} from 'react';
import ActionHome from 'material-ui/svg-icons/action/home';
import './FlassDrawerItem.scss';

const propTypes = {};

const defaultProps = {};

class FlassDrawerItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="flass-drawer-item">
        <div>
          {this.props.icon}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

FlassDrawerItem.propTypes = propTypes;
FlassDrawerItem.defaultProps = defaultProps;

export default FlassDrawerItem;
