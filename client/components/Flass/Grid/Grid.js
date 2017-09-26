import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { Row, Grid as GridView } from 'react-bootstrap';
import _ from 'lodash';
import GridItem from './GridItem';
import {
  Title,
  Header
} from '../../FlassCommon';
import './Grid.scss';
import '../../../css/base/_row.scss';

const { object, array, func } = PropTypes;

const propTypes = {
  user: object.isRequired,
  items: array.isRequired,
  fetchRequestMyChannelItems: func.isRequired,
  deleteMyChannelItem: func.isRequired,
};

const defaultProps = {
};

const NUM_OF_ITEMS_PER_COLS = 4;

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }
  componentDidMount() {
    if (this.isUserIdFetched()) {
      this.props.fetchRequestMyChannelItems();
    }
  }

  render() {
    const { items } = this.props;
    const renderAllItems = this.renderRowsAndCols(items);
    return (
      <div>
        <Header
          Title={ () => <Title title="Home Channel" /> }
          SubTitle={ () => null } />
        <GridView>
          { renderAllItems }
        </GridView>
      </div>
    );
  }

  isUserIdFetched() {
    const { user } = this.props;

    return user.id !== -1;
  }

  renderRowsAndCols(items) {
    return _.chunk(items, NUM_OF_ITEMS_PER_COLS).map((splitItems, index) => (
      <Row key={ `row${index}` } bsClass="Row">
        {this.renderChildren(splitItems)}
      </Row>
    ));
  }

  renderChildren(items) {
    const { user } = this.props;
    return items.map((item, index) => (
      <div key={ `col${index}` } className="Col__grid">
        <GridItem
          { ...item }
          userName={ user.userName }
          onClickDeleteBtn={ this.deleteItem } />
      </div>
    ));
  }

  @autobind
  deleteItem(itemId) {
    if (confirm('정말로 삭제하시겠습니까?')) {
      this.props.deleteMyChannelItem(itemId);
    }
  }
}

Grid.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
