import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './FlassDrawerItem.scss';

const propTypes = {
  icon: PropTypes.object,
  children: PropTypes.object,
};

const defaultProps = {
  icon: null,
  children: null,
};

class FlassDrawerItem extends Component {
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
