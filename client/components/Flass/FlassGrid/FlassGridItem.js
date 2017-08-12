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
  margin-top: 90px;
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
  float: left;
`;

const Analysis = styled.div`
  float: right;
`;

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired
};

const defaultProps = {};

const FlassGridItem = props => {
  const { id, title, author, img } = props;

  return (
    <Item src={ img }>
      <Header>12주차 수업</Header>
      <Link to={ `/detail/${id}` }>
        <Title>
          { title }
        </Title>
        <Date>
          { author }
        </Date>
      </Link>
      <div>
        <Question>질문 13개</Question>
        <Analysis>분석</Analysis>
      </div>
    </Item>
  );
};

FlassGridItem.propTypes = propTypes;
FlassGridItem.defaultProps = defaultProps;

export default FlassGridItem;
