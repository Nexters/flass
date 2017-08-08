import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-bootstrap';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../common/colors.scss';
import FlassGridItem from './FlassGridItem';
import FlassContentTitleComponent from '../FlassContentTitle/FlassContentTitleComponent';
import './FlassGrid.scss';

const propTypes = {
  items: PropTypes.array.isRequired,
  fetchRequestMyChannelItems: PropTypes.func.isRequired
};

const defaultProps = {
};

class FlassGrid extends Component {

  componentDidMount() {
    this.props.fetchRequestMyChannelItems('1');
  }

  renderChildren(items) {
    return items.map(item => (
      <Col key={item.key} md={ 3 }>
        <FlassGridItem { ...item } />
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
        <FlassContentTitleComponent title="Home Channel" />
        <Grid>
          {renderAllItems}
        </Grid>
      </div>
    );
  }
}

FlassGrid.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
FlassGrid.propTypes = propTypes;
FlassGrid.defaultProps = defaultProps;

export default FlassGrid;
