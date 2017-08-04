import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Subheader } from 'material-ui';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import styled from 'styled-components';
import AnalysisItem from './AnalysisItem';
import AnalysisHeaderItem from './AnalysisHeaderItem';

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
        <AnalysisHeader>
          <Row>
            <Col xs={ 3 } md={ 3 }>
              <AnalysisHeaderItem
                headerName="강의 완주율"
                rangeComponent={<RangeFont color="#7f9d29" >96%</RangeFont>}
                headerDetail="20명/30명"
              />
            </Col>
            <Col xs={ 3 } md={ 3 }>
              <AnalysisHeaderItem
                headerName="강의 완주율"
                rangeComponent={<RangeFont color="#7f9d29" >96%</RangeFont>}
                headerDetail="20명/30명"
              />
            </Col>
            <Col xs={ 3 } md={ 3 }>
              <AnalysisHeaderItem
                headerName="강의 완주율"
                rangeComponent={<RangeFont color="#7f9d29" >96%</RangeFont>}
                headerDetail="20명/30명"
              />
            </Col>
            <Col xs={ 3 } md={ 3 }>
              <AnalysisHeaderItem
                headerName="강의 완주율"
                rangeComponent={<RangeFont color="#7f9d29" >96%</RangeFont>}
                headerDetail="20명/30명"
              />
            </Col>
          </Row>
        </AnalysisHeader>
        <AnalysisItem />
      </DetailAnalysis>
    );
  }
}

Analysis.propTypes = propTypes;
Analysis.defaultProps = defaultProps;

export default Analysis;
