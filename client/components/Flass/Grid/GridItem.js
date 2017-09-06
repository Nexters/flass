import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import color from '../common/colors.scss';

const Item = styled.div`
  position: relative;
  display: block;
  width: 23.44rem;
  height: 19.81rem;
  color: ${color['white']};
  margin-bottom: 3.31rem;
  margin-right: 3.31rem;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: #000;

`;

const Container = styled.div`
  height: 100%;
  padding-top: 1.46rem;
  padding-left: 1.49rem;
  padding-bottom: 1.34rem;
  padding-right: 1.36rem;
  background-color: rgba(0, 0, 0, .5);

  transition: background-color .3s ease-out;

  &:hover {
    background-color: rgba(23, 110, 153, .5);
  }
`;

const Header = styled.span`
  font-family: NotoSansCJKkr;
  font-size: 0.81rem;
  font-weight: 100;
  padding-bottom: .19rem;
  border-bottom: 1px solid ${color['white']};
`;

const Title = styled.div`
  margin-top: 8.25rem;
  font-family: NotoSansCJKkr;
  font-size: 1.56rem;
  font-weight: 100;
  color: ${color['white']};
`;

const Date = styled.div`
  font-family: NotoSansCJKkr;
  font-size: 0.81rem;
  color: #d8d8d8;
  margin-bottom: 1.9rem;
`;

const Body = styled.div`
  posiiton: relative;
`;

const Question = styled.div`
  display: table;
  vertical-align: middle;
  width: 6.94rem;
  height: 1.86rem;
  font-size: 0.81rem;
  text-align: center;
  border-radius: 6.25rem;
  border: solid 1px ${color['white']};
  float: left;
`;

const Analysis = styled.div`
  display: table;
  vertical-align: middle;
  width: 4.91rem;
  height: 1.83rem;
  font-size: 0.81rem;
  text-align: center;
  border-radius: 6.25rem;
  border: solid 1px ${color['white']};
  float: right;
`;

const Text = styled.span`
  display: table-cell;
  vertical-align: middle;
  z-index: 50;
`;


const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  questionCount: PropTypes.number,
};

const defaultProps = {
  questionCount: 0
};

const GridItem = props => {
  const { id, title, thumbnailUrl, createdAt, questionCount } = props;

  return (
    <Item src={ thumbnailUrl }>
      <Container>
        <Header>12주차 수업</Header>
        <Link to={ `/detail/${id}` }>
          <Title>
            { title }
          </Title>
          <Date>
            { createdAt }
          </Date>
        </Link>
        <Body>
          <Question>
            <Text>
              질문 { questionCount }개
            </Text>
          </Question>
          <Analysis>
            <Text>
              분석
            </Text>
          </Analysis>
        </Body>
      </Container>
    </Item>
  );
};

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;

export default GridItem;
