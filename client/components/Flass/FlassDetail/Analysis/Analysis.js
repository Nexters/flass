import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Subheader } from 'material-ui';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import styled from 'styled-components';
import AnalysisItem from './AnalysisItem';

const DetailAnalysis = styled.div`
  padding-top: 3rem;
  padding-bottom: 4rem;
`;

const AnalysisHeader = styled(Grid)`
  width: 100%;
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
              <Panel>
                Basic panel example
              </Panel>
            </Col>
            <Col xs={ 3 } md={ 3 }>
              <Panel>
                Basic panel example
              </Panel>
            </Col>
            <Col xs={ 3 } md={ 3 }>
              <Panel>
                Basic panel example
              </Panel>
            </Col>
            <Col xs={ 3 } md={ 3 }>
              <Panel>
                Basic panel example
              </Panel>
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
