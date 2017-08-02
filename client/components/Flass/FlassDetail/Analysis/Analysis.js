import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Subheader } from 'material-ui';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import AnalysisItem from './AnalysisItem';


const propTypes = {};

const defaultProps = {};

class Analysis extends Component {

  componentDidMount() {}

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={3} md={3}>
              <Panel>
                Basic panel example
              </Panel>
            </Col>
            <Col xs={3} md={3}>
              <Panel>
                Basic panel example
              </Panel>
            </Col>
            <Col xs={3} md={3}>
              <Panel>
                Basic panel example
              </Panel>
            </Col>
            <Col xs={3} md={3}>
              <Panel>
                Basic panel example
              </Panel>
            </Col>
          </Row>
        </Grid>
        <AnalysisItem />
      </div>
    );
  }
}

Analysis.propTypes = propTypes;
Analysis.defaultProps = defaultProps;

export default Analysis;
