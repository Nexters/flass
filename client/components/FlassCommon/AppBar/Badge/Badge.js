import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import BadgeIcon from './images/appbar-badge.png';
import BadgeHistory from './BadgeHistory';
import {
  FETCH_BADGE_HISTORY,
  TOGGLE_BADGE_HISTORY,
} from '../../../../ducks/Flass/badges';
import './Badge.scss';

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

function mapStateToProps(state) {
  return {
    ...state.flass.badge
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBadgeHistory: (userId, badgeType) => {
      dispatch({
        type: FETCH_BADGE_HISTORY,
        badgeType,
        userId
      });
    },
    toggleBadgeHistory: () => {
      dispatch({
        type: TOGGLE_BADGE_HISTORY
      });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Badge);
