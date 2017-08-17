import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid as GridView, Row } from 'react-bootstrap';
import _ from 'lodash';
import styled from 'styled-components';
import color from '../common/colors.scss';
import GridItem from './GridItem';
import ContentTitleComponent from '../ContentTitle/ContentTitleComponent';
import './Grid.scss';

const propTypes = {
  items: PropTypes.array.isRequired,
  fetchRequestMyChannelItems: PropTypes.func.isRequired
};

const defaultProps = {
};

class Grid extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchRequestMyChannelItems();
  }

  renderChildren(items) {
    return items.map(item => (
      <Col key={item.id} md={ 3 }>
        <GridItem { ...item } />
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
        <ContentTitleComponent title="Home Channel" />
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
