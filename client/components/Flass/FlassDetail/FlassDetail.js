import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';
import './FlassDetail.scss';
import Comment from './Comment/Comment';
import Analysis from './Analysis/Analysis';

const propTypes = {
  match: PropTypes.shape({
    params: {
      id: PropTypes.number
    }
  }),
  commentCount: PropTypes.number
};

const defaultProps = {
  match: {
    params: {
      id: -1
    }
  },
  commentCount: 0
};

class FlassDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a'
    };
  }

  componentDidMount() {}

  handleChange = value => {
    this.setState({
      value
    });
  };

  render() {
    const { commentCount } = this.props;

    return (
      <div className="flass-detail">
        <div className="flass-detail-contents">
          <Subheader>영상제목</Subheader>
          <div>
            <img
              src="http://via.placeholder.com/450x200"
              className="flass-detail-media"
              alt="" />
            <List className="flass-detail-question-list-container">
              <Subheader>질문 리스트</Subheader>
              <Divider />
              <ListItem primaryText="Inbox" />
            </List>
          </div>
        </div>
        <div className="flass-detail-tabs">
          <Tabs
            value={ this.state.value }
            onChange={ this.handleChange }>
            <Tab label={ `질문 ${commentCount}` } value="a">
              <Comment />
            </Tab>
            <Tab label="분석" value="b">
              <Analysis />
            </Tab>
          </Tabs>
        </div>
        paramId : {this.props.match.params.id}
      </div>
    );
  }
}

FlassDetail.propTypes = propTypes;
FlassDetail.defaultProps = defaultProps;

export default FlassDetail;
