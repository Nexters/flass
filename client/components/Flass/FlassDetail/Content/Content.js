import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Panel, Row, Well } from 'react-bootstrap';
import styled from 'styled-components';
import color from '../../common/colors.scss';
import './Content.scss';

const DetailContent = styled(Grid)`
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
  content: PropTypes.string.isRequired
};

const defaultProps = {};

const Content = props => {
  const { content } = props;
  return (
    <DetailContent>
      <Row className="show-grid">
        <Col xs={ 6 } md={ 6 }>
          <Title>강의 제목</Title>
          <LeftContent>
            Basic panel example
          </LeftContent>
          <Title>오프라인 수업 장소</Title>
          <LeftContent>
            Basic panel example
          </LeftContent>
          <Title>학습 교과서</Title>
          <LeftContent>
            Basic panel example
          </LeftContent>
          <Title>학급 명</Title>
          <LeftContent>
            Basic panel example
          </LeftContent>
          <Title>수업 일시</Title>
          <LeftContent>
            Basic panel example
          </LeftContent>
        </Col>
        <Col xs={ 6 } md={ 4 }>
          <Title>학습 목표</Title>
          <RightContent>
            Look I'm in a well!
          </RightContent>
          <Title>학습 공지</Title>
          <RightContent>
            Look I'm in a well!
          </RightContent>
        </Col>
      </Row>
    </DetailContent>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
