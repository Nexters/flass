import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import color from '../common/colors.scss';

const Item = styled.div`
  display: block;
  width: 230px;
  height: 200px;
  color: ${color['white']};
  padding: 10px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: #000;
  margin-bottom: 15px;
`;

const Header = styled.span`
  font-family: NotoSansCJKkr;
  font-size: 8px;
  font-weight: 100;
  border-bottom: 1px solid ${color['white']};
`;

const Title = styled.div`
  margin-top: 80px;
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: 100;
  color: ${color['white']};
`;

const Date = styled.div`
  font-family: NotoSansCJKkr;
  font-size: 8px;
  color: #d8d8d8;
  margin-bottom: 15px;
`;

const Question = styled.div`
  font-size: 9px;
  padding: 4px 6px;
  margin: 5px;
  border-radius: 100px;
  border: solid 1px ${color['white']};
  float: left;
`;

const Analysis = styled.div`
  font-size: 9px;
  padding: 4px 6px;
  margin: 5px;
  border-radius: 100px;
  border: solid 1px ${color['white']};
  float: right;
`;

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  questionCount: PropTypes.number,
};

const defaultProps = {
  questionCount: 0,
};

const GridItem = props => {
  const { id, title, thumbnailUrl, createdAt, questionCount } = props;

  return (
    <Item src={ thumbnailUrl }>
      <Header>12주차 수업</Header>
      <Link to={ `/detail/${id}` }>
        <Title>
          { title }
        </Title>
        <Date>
          { createdAt }
        </Date>
      </Link>
      <div>
        <Question>질문 { questionCount }개</Question>
        <Analysis>분석</Analysis>
      </div>
    </Item>
  );
};

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;

export default GridItem;
