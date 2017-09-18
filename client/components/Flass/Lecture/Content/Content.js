import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import color from '../../../../css/base/colors.scss';

const DetailContent = styled.div`
  width: 100%;
  padding-top: 3rem;
  padding-bottom: 4rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${color['light-navy']};
  padding: 1rem 0;
`;

const LeftContent = styled.p`
  padding: 1rem 0;
  border: 0;
  border-bottom: 1px solid ${color['silver']};
`;

const RightContent = styled.p`
  padding: 1rem;
  background-color: rgba(237, 238, 238, 0.65);
`;

const propTypes = {
  title: PropTypes.string,
  subject: PropTypes.string,
  content: PropTypes.string,
  textbookRange: PropTypes.string,
};

const defaultProps = {
  title: '',
  subject: '',
  content: '',
  textbookRange: '',
};

const Content = props => {
  const { title, subject, content, textbookRange } = props;
  return (
    <DetailContent>
      <Row className="show-grid">
        <Col xs={ 6 } md={ 6 }>
          <Title>강의 제목</Title>
          <LeftContent>
            { title }
          </LeftContent>
          <Title>강의 과목</Title>
          <LeftContent>
            { subject }
          </LeftContent>
          <Title>교재 범위</Title>
          <LeftContent>
            { textbookRange }
          </LeftContent>
        </Col>
        <Col xs={ 4 } md={ 4 }>
          <Title>강의 설명</Title>
          <RightContent>
            { content }
          </RightContent>
        </Col>
      </Row>
    </DetailContent>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
