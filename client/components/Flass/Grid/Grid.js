import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import autobind from 'autobind-decorator';
import { Row, Grid as GridView } from 'react-bootstrap';
import _ from 'lodash';
import GridItem from './GridItem';
import color from '../../../css/base/colors.scss';
import {
  Title,
  Header
} from '../../FlassCommon';
import '../../../css/base/_row.scss';
import {
  FETCH_MY_CHANNEL,
  DELETE_MY_CHANNEL_ITEM
} from '../../../ducks/Flass/grids';

const GridBox = styled.div`
  position: relative;
  min-height: 100%;
`;

const CustomerService = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 15px;
  margin-right: 40px;
  color: #a7acad;
  text-align: right;
  padding-bottom: 10px;
  color: ${color['cool-grey']};
`;

const { object, array, func } = PropTypes;

const propTypes = {
  user: object.isRequired,
  items: array.isRequired,
  fetchRequestMyChannelItems: func.isRequired,
  deleteMyChannelItem: func.isRequired,
};

const defaultProps = {
};

const NUM_OF_ITEMS_PER_COLS = 3;

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
      <GridBox>
        <Header
          Title={ () => <Title title="Home Channel" /> }
          SubTitle={ () => null } />
        <GridView>
          { renderAllItems }
        </GridView>
        <CustomerService>
          우주컴퍼니팀 | 문의  flassadm@gmail.com
        </CustomerService>
      </GridBox>
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

function mapStateToProps(state) {
  return {
    ...state.flass.grid,
    user: { ...state.flass.user }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRequestMyChannelItems: () => ({
      type: FETCH_MY_CHANNEL
    }),
    deleteMyChannelItem: id => ({
      type: DELETE_MY_CHANNEL_ITEM,
      id
    })
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
