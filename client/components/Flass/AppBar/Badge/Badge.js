import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../../common/colors.scss';
import BadgeIcon from './images/appbar-badge.png';
import './Badge.scss';
import BadgeHistory from './BadgeHistory';

const BadgeView = styled.div`
  display: inline-block;
  z-index: 9999;
`;

const propTypes = {
  userId: PropTypes.number.isRequired,
  badgeItems: PropTypes.array.isRequired,
  toggleBadge: PropTypes.bool.isRequired,
  toggleBadgeHistory: PropTypes.func.isRequired,
  fetchBadgeHistory: PropTypes.func.isRequired
};

const defaultProps = {};

class Badge extends Component {
  handleToggleBadge = () => {
    this.props.toggleBadgeHistory();
  }

  fetchBadgeHistory = (userId, badgeType) => {
    this.props.fetchBadgeHistory(userId, badgeType);
  }

  componentDidMount() {}

  render() {
    const { userId, badgeItems, toggleBadge } = this.props;

    return (
      <BadgeView>
        <span className="flass-badge" onClick={ this.handleToggleBadge }>
          <img alt="badge" src={ BadgeIcon } />
        </span>
        {toggleBadge
          ? <BadgeHistory
            badgeItems={ badgeItems }
            fetchBadgeHistory={ _.partial(this.fetchBadgeHistory, userId, _) } />
          : ''}
      </BadgeView>
    );
  }
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
