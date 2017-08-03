import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'material-ui/SvgIcon';
import FlassBadge from './FlassBadge';

const propTypes = {
  badges: PropTypes.array
};

const defaultProps = {
  badges: [
    { id: 1, content: 'Refresh' },
    { id: 2, content: 'Help &amp; feedback' },
    { id: 3, content: 'Settings' },
    { id: 4, content: 'Sign out' }
  ]
};

class FlassUserAppBar extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <FlassBadge />
        <span>
        이름
        </span>
      </div>
    );
  }
}

FlassUserAppBar.propTypes = propTypes;
FlassUserAppBar.defaultProps = defaultProps;

export default FlassUserAppBar;
