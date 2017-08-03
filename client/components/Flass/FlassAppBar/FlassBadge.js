import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import './FlassBadge.scss';

const propTypes = {
  badges: PropTypes.array
};

const defaultProps = {
  badges: []
};

class FlassBadge extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { badges } = this.props;
    const badgeItems = badges.map(
      badge => (<MenuItem key={ badge.id } primaryText={ badge.content } />));

    return (
      <span className="flass-badge">
        Home ( { badges.length } )
      </span>
    );
  }
}

FlassBadge.propTypes = propTypes;
FlassBadge.defaultProps = defaultProps;

export default FlassBadge;
