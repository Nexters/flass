import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const propTypes = {};

const defaultProps = {};

const FlassBadge = () => (
  <Badge
    badgeContent={ 4 }
    primary
    badgeStyle={ { top: 5, right: 5 } }
    style={{ padding: 7 }}>
    <IconButton>
      <NotificationsIcon className="flass-notification-icon" />
    </IconButton>
  </Badge>
);

FlassBadge.propTypes = propTypes;
FlassBadge.defaultProps = defaultProps;

export default FlassBadge;
