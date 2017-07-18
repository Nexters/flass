import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Divider, Subheader} from 'material-ui';

const propTypes = {};

const defaultProps = {};

class Analysis extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Subheader>답변자 수</Subheader>
        <Divider />
      </div>
    );
  }
}

Analysis.propTypes = propTypes;
Analysis.defaultProps = defaultProps;

export default Analysis;
