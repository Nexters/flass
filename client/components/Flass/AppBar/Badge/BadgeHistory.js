import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../../common/colors.scss';
import BadgeItem from './BadgeItem';

const propTypes = {
  badgeItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  fetchBadgeHistory: PropTypes.func.isRequired
};

const defaultProps = {};

const BadgeHistoryView = styled.div`
  width: 450px;
  position: fixed;
  top: 50px;
  left: -350px;
  background-color: #fff;
  padding-bottom: 1rem;
`;

class BadgeHistory extends Component {
  componentDidMount() {
    this.props.fetchBadgeHistory();
  }

  render() {
    return (
      <BadgeHistoryView>
        <div>
          {this.renderChildren()}
        </div>
      </BadgeHistoryView>
    );
  }

  renderChildren() {
    const { badgeItems } = this.props;

    return (
      <div style={ { padding: '20px' } }>
        <h3>새 질문 알림</h3>
        {
          _.map(badgeItems, item => (
            <BadgeItem key={ item.id } content={ item.content } />
          ))
        }
      </div>
    );
  }
}

BadgeHistory.propTypes = propTypes;
BadgeHistory.defaultProps = defaultProps;

export default BadgeHistory;
