import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../../../../css/base/colors.scss';
import BadgeItem from './BadgeItem';

const Tabs = styled.ul`
  height: 40px;
  padding: 1rem 1rem;
  list-style: none;
  border-bottom: 1px solid #eee;
  margin: 0;
`;

const Tab = styled.li`
  padding: 0.5rem 0;
  float: left;
`;

const propTypes = {
  badgeItems: PropTypes.array.isRequired,
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

  renderChildren() {
    const { badgeItems } = this.props;

    return _.map(badgeItems, item => (
      <BadgeItem key={ item.id } name={ item.name } content={ item.content } />
    ));
  }

  render() {
    const { fetchBadgeHistory } = this.props;

    return (
      <BadgeHistoryView>
        <Tabs>
          <Tab><span onClick={ _.partial(fetchBadgeHistory, 'comment') }>댓글</span></Tab>
          <Tab><span onClick={ _.partial(fetchBadgeHistory, 'question') }>질문</span></Tab>
        </Tabs>
        <div>
          {this.renderChildren()}
        </div>
      </BadgeHistoryView>
    );
  }
}

BadgeHistory.propTypes = propTypes;
BadgeHistory.defaultProps = defaultProps;

export default BadgeHistory;
