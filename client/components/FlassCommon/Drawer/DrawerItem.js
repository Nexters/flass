import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './DrawerItem.scss';

const propTypes = {
  icon: PropTypes.object,
  children: PropTypes.string
};

const defaultProps = {
  icon: null,
  children: null
};

class DrawerItem extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="flass-drawer-item">
        <div className="flass-drawer-item-icon">
          {this.props.icon}
        </div>
        <div className="flass-drawer-item-text">
          {this.props.children}
        </div>
      </div>
    );
  }
}

DrawerItem.propTypes = propTypes;
DrawerItem.defaultProps = defaultProps;

export default DrawerItem;
