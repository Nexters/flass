import React from 'react';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const propTypes = {};

const defaultProps = {};

const FlassBadge = () => (
  <Badge
    badgeContent={ 4 }
    primary
    badgeStyle={ { top: 12, right: 12 } }>
    <NotificationsIcon className="flass-notification-icon" />
  </Badge>
  );

FlassBadge.propTypes = propTypes;
FlassBadge.defaultProps = defaultProps;

export default FlassBadge;
