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
  badges: PropTypes.array,
};

const defaultProps = {
  badges: [],
};

class FlassBadge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  componentDidMount() {}

  render() {
    const { badges } = this.props;
    const badgeItems = badges.map(
      (badge) => (<MenuItem key={badge.id} primaryText={badge.content} />));

    return (
      <div className="flass-badge-container">
        <Badge
          badgeContent={ badges.length }
          primary
          badgeStyle={ { top: 5, right: 5 } }
          style={ { padding: 7 } }>
          <IconButton
            onTouchTap={this.handleTouchTap} >
            <NotificationsIcon className="flass-notification-icon" />
          </IconButton>
        </Badge>
        <Popover
          open={ this.state.open }
          anchorEl={ this.state.anchorEl }
          anchorOrigin={ { horizontal: 'middle', vertical: 'bottom' } }
          targetOrigin={ { horizontal: 'left', vertical: 'top' } }
          onRequestClose={ this.handleRequestClose }
          animation={PopoverAnimationVertical} >
          <Menu>
            { badgeItems }
          </Menu>
        </Popover>
      </div>
    );
  }
}

FlassBadge.propTypes = propTypes;
FlassBadge.defaultProps = defaultProps;

export default FlassBadge;
