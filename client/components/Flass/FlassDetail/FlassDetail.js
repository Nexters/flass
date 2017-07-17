import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.shape({
    params: {
      id: PropTypes.number
    }
  })
};

const defaultProps = {
  match: {
    params: {
      id: -1
    }
  }
};

class FlassDetail extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>paramId : {this.props.match.params.id}</div>
    );
  }
}

FlassDetail.propTypes = propTypes;
FlassDetail.defaultProps = defaultProps;

export default FlassDetail;
