import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import color from '../../../css/base/colors.scss';
import {
  DeleteIcon
} from './icons';

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

const HeaderWrapper = styled.div`
  position: relative;
`;

const Header = styled.span`
  font-family: NotoSansCJKkr;
  font-size: 0.81rem;
  font-weight: 100;
  padding-bottom: .19rem;
  border-bottom: 1px solid ${color['white']};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal;
  max-width: 150px;
  float: left;
`;

const DeleteBtn = styled.img`
  display: table;
  vertical-align: middle;
  float: right;
  width: 1.3125rem;
  height: 1.375rem;
  cursor: pointer;
`;

const Title = styled.div`
  margin-top: 8.25rem;
  font-family: NotoSansCJKkr;
  font-size: 1.56rem;
  font-weight: 100;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal;
  max-width: 200px;
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

const { number, string, func } = PropTypes;

const propTypes = {
  id: number.isRequired,
  title: string.isRequired,
  thumbnailUrl: string.isRequired,
  createdAt: string.isRequired,
  questionCount: number,
  textbookRange: string,
  onClickDeleteBtn: func.isRequired
};

const defaultProps = {
  questionCount: 0,
  textbookRange: ''
};

const GridItem = props => {
  const { id, title, thumbnailUrl, createdAt,
    questionCount, textbookRange, onClickDeleteBtn } = props;

  return (
    <Item src={ thumbnailUrl }>
      <Container>
        <HeaderWrapper>
          <Header>{ `수업범위: ${textbookRange}` }</Header>
          <DeleteBtn
            srcSet={ DeleteIcon }
            onClick={ () => onClickDeleteBtn(id) }
          />
        </HeaderWrapper>
        <Link to={ `/lecture/${id}` }>
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
