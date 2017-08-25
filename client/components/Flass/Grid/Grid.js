import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid as GridView, Row } from 'react-bootstrap';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../common/colors.scss';
import GridItem from './GridItem';
import Header from '../Header';
import './Grid.scss';

const propTypes = {
  user: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  fetchRequestMyChannelItems: PropTypes.func.isRequired
};

const defaultProps = {
};

class Grid extends Component {
  componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    const nextUser = nextProps.user;
    if(user.id !== nextUser.id) {
      this.props.fetchRequestMyChannelItems();
    }
  }

  componentDidMount() {
    const { user } = this.props;

    if(user.id !== -1) {
      this.props.fetchRequestMyChannelItems();
    }
  }
  // 1. receive TODO
  // 2. HOC
  // 3. react router 기능.

  renderChildren(items) {
    const { user } = this.props;
    return items.map(item => (
      <Col key={ item.id } md={ 3 }>
        <GridItem { ...item } userName={ user.userName } />
      </Col>
    ));
  }

  render() {
    const { items } = this.props;
    const renderAllItems = _.chunk(items, 4).map(splitItems => {
      return (
        <Row>
          {this.renderChildren(splitItems)}
        </Row>
      );
    });
    return (
      <div>
        <Header title="Home Channel" />
        <GridView>
          {renderAllItems}
        </GridView>
      </div>
    );
  }
}

Grid.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
