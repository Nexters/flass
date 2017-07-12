import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const propTypes = {};

const defaultProps = {};

const FlassBadge = (props) => {
  return (
    <Badge
      badgeContent={4}
      primary={true}
      badgeStyle={{top: 12, right: 12}}>
      <NotificationsIcon className="flass-notification-icon" />
    </Badge>
  );
};

FlassBadge.propTypes = propTypes;
FlassBadge.defaultProps = defaultProps;

export default FlassBadge;
