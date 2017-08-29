import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../../common/colors.scss';
import NewNotification from './images/new-notification.png';
import BadgeIcon from './images/appbar-badge.png';
import './Badge.scss';
import BadgeHistory from './BadgeHistory';

const BadgeView = styled.div`
  display: inline-block;
  z-index: 9999;
`;

const propTypes = {
  userId: PropTypes.number.isRequired,
  badgeItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  toggleBadge: PropTypes.bool.isRequired,
  toggleBadgeHistory: PropTypes.func.isRequired,
  fetchBadgeHistory: PropTypes.func.isRequired,
  newNotification: PropTypes.bool.isRequired,
  postNotificationCheck: PropTypes.func.isRequired
};

const defaultProps = {};

class Badge extends Component {
  handleToggleBadge = () => {
    this.props.toggleBadgeHistory();
    this.props.postNotificationCheck();
  }

  fetchBadgeHistory = () => {
    this.props.fetchBadgeHistory();
    setTimeout(fetchBadgeHistory(), 10000);
  }

  componentDidMount() {}

  render() {
    const { userId, badgeItems, toggleBadge, newNotification } = this.props;

    return (
      <BadgeView>
        <span className="flass-badge" onClick={ this.handleToggleBadge }>
          {
            newNotification
            &&
            <img alt="new notification" src={ NewNotification } />
          }
          <img alt="badge" src={ BadgeIcon } />
        </span>
        {
          toggleBadge
          &&
          <BadgeHistory
            badgeItems={ badgeItems }
            fetchBadgeHistory={ this.fetchBadgeHistory } />
        }
      </BadgeView>
    );
  }
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
