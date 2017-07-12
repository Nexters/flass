import React, { Component } from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import FlassBadge from './FlassBadge';

const propTypes = {};

const defaultProps = {};

class FlassUserAppBar extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="flass-user-app-bar">
        <FlassBadge />
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
