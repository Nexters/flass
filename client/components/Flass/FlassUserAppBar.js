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
      <div className="flass-user-app-bar">
        <FlassBadge badges={ this.props.badges } />
        <span>
        이름
        </span>
        <SvgIcon>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
      </div>
    );
  }
}

FlassUserAppBar.propTypes = propTypes;
FlassUserAppBar.defaultProps = defaultProps;

export default FlassUserAppBar;
