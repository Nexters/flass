import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  badgeItems: PropTypes.array.isRequired,
  toggleBadge: PropTypes.bool.isRequired,
  toggleBadgeHistory: PropTypes.func.isRequired,
  fetchBadgeHistory: PropTypes.func.isRequired
};

const defaultProps = {};

class Badge extends Component {
  constructor(props) {
    super(props);
  }

  handleToggleBadge = () => {
    this.props.toggleBadgeHistory();
  }

  fetchBadgeHistory = badgeType => {
    this.props.fetchBadgeHistory('userId', badgeType);
  }

  componentDidMount() {}

  render() {
    const { badgeItems, toggleBadge } = this.props;

    return (
      <BadgeView>
        <span className="flass-badge" onClick={ this.handleToggleBadge }>
          <img alt="" src={ BadgeIcon } />
        </span>
        {toggleBadge
          ? <BadgeHistory
            badgeItems={ badgeItems }
            fetchBadgeHistory={ this.fetchBadgeHistory } />
          : ''}
      </BadgeView>
    );
  }
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
