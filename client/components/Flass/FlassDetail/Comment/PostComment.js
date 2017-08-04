import React, { Component } from 'react';
import {
  Button, ControlLabel, Form, FormControl,
  FormGroup,
} from 'react-bootstrap';
import styled from 'styled-components';
import color from '../../common/colors.scss';
import './PostComment.scss';

const DetailPostComment = styled(Form)`
  text-align: left;
  border: solid 1px ${color['cool-grey']};
`;

const Label = styled(ControlLabel)`
  padding: 1rem 0 0 1rem;
  letter-spacing: 4px;
  float: left;
`;

const TextArea = styled(FormControl)`
  border: 0;
  box-shadow: none;
  resize: none;
`;

const Bottom = styled.div`
  height: 32px;
  border-top: solid 1px ${color['steel-grey']};
`;

const BottomText = styled.span`
  line-height: 2.3;
  margin-left: 1rem;
`;

const BtnPostComment = styled(Button)`
  border: 0;
  border-radius: 0;
  background-color: ${color['light-navy']};
  float: right;
`;

const propTypes = {};

const defaultProps = {};

class PostComment extends Component {
  componentDidMount() {}

  render() {
    return (
      <DetailPostComment>
        <FormGroup controlId="formControlsTextarea">
          <Label>최혜민</Label>
          <TextArea componentClass="textarea" placeholder="해당 강의 내용 또는 퀴즈에 대해 궁금한 점이 잇다면 댓글을 달아주세요." />
        </FormGroup>
        <Bottom>
          <BottomText>0 / 500</BottomText>
          <BtnPostComment bsStyle="primary">등록</BtnPostComment>
        </Bottom>
      </DetailPostComment>
    );
  }
}

PostComment.propTypes = propTypes;
PostComment.defaultProps = defaultProps;

export default PostComment;
