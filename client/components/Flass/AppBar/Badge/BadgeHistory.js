import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../../common/colors.scss';
import BadgeItem from './BadgeItem';

const propTypes = {
  badgeItems: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
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
  constructor(props) {
    super(props);
    this.props.fetchBadgeHistory();
  }

  componentDidMount() {}

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

    return _.map(badgeItems, item => (
      <BadgeItem key={item.id} name={item.name} content={item.content} />
    ));
  }
}

BadgeHistory.propTypes = propTypes;
BadgeHistory.defaultProps = defaultProps;

export default BadgeHistory;
