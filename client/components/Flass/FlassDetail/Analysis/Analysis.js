import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Subheader } from 'material-ui';
import AnalysisItem from './AnalysisItem';

const propTypes = {};

const defaultProps = {};

class Analysis extends Component {

  componentDidMount() {}

  render() {
    return (
      <div>
        <Subheader>답변자 수</Subheader>
        <Divider />
        <AnalysisItem />
      </div>
    );
  }
}

Analysis.propTypes = propTypes;
Analysis.defaultProps = defaultProps;

export default Analysis;
