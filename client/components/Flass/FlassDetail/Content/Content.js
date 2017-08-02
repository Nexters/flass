import React from 'react';
import PropTypes from 'prop-types';
import {Col, Grid, Panel, Row, Well} from 'react-bootstrap';

const propTypes = {
  content: PropTypes.string.isRequired,
};

const defaultProps = {};

const Content = props => {
  const { content } = props;
  return (
    <Grid>
      <Row className="show-grid">
        <Col xs={6} md={6}>
          <h3>강의 제목</h3>
          <Panel>
            Basic panel example
          </Panel>
          <h3>강의 제목</h3>
          <Panel>
            Basic panel example
          </Panel>
        </Col>
        <Col xs={6} md={4}>
          <h3>학습 목표</h3>
          <Well>Look I'm in a well!</Well>
          <h3>학습 공지</h3>
          <Well>Look I'm in a well!</Well>
        </Col>
      </Row>
    </Grid>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
