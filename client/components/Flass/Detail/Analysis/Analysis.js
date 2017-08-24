import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import styled from 'styled-components';
import AnalysisItem from './AnalysisItem';
import AnalysisHeaderItem from './AnalysisHeaderItem';
import ChartComponent from './Chart/ChartComponent';

const DetailAnalysis = styled.div`
  padding-top: 3rem;
  padding-bottom: 4rem;
`;

const AnalysisHeader = styled(Grid)`
  width: 100%;
`;

const RangeFont = styled.div`
  font-size: 3rem;
  color: ${props => props.color};
  padding: 1rem 0;
`;

const propTypes = {};

const defaultProps = {};

class Analysis extends Component {

  componentDidMount() {}

  render() {
    return (
      <DetailAnalysis>
        <ChartComponent />
      </DetailAnalysis>
    );
  }
}

Analysis.propTypes = propTypes;
Analysis.defaultProps = defaultProps;

export default Analysis;
