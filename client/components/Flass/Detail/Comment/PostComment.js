import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, ControlLabel, Form, FormControl,
  FormGroup
} from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import styled from 'styled-components';
import normalizePostComment from './normalizePostComment';
import color from '../../common/colors.scss';
import './PostComment.scss';

const DetailForm = styled(Form)``;

const DetailPostComment = styled.div`
  padding: 5px;
  border-radius: 3px;
  background-color: ${color['white']};
  box-shadow: 3px 4px 10px 0 rgba(79, 79, 79, 0.15);
  border: solid 1px ${color['silver']};
  text-align: left;
`;

const Label = styled(ControlLabel)`
  padding: 1rem 0 0 1rem;
  letter-spacing: 4px;
  float: left;
`;

const TextArea = styled(FormControl)`
  height: 130px !important;
  border: 0;
  box-shadow: none;
  resize: none;
`;

const Bottom = styled.div`
  height: 45px;
`;

const BtnPostComment = styled.button`
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 6px 20px;
  color: ${color['light-navy']};
  border-radius: 100px;
  background-color: ${color['white']};
  border: solid 1px ${color['light-navy']};
  border-radius: 100px;
  float: right;
`;

const propTypes = {
  detailId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  addComment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const defaultProps = {};

class PostComment extends Component {
  componentDidMount() {
    this.renderTextArea = this.renderTextArea.bind(this);
  }

  submit = ({ content }) => {
    const { detailId, user, addComment } = this.props;
    console.log(detailId, user, addComment);
    addComment(detailId, user.id, user.userName, content);
  };

  renderTextArea({ input, meta: { touched, error }, id, label, userName, ...props }) {
    return (
      <FormGroup controlId={id}>
        <Label>{ userName }</Label>
        <TextArea
          { ...input }
          componentClass="textarea"
          { ...props } />
      </FormGroup>
    );
  }

  render() {
    const { user, handleSubmit } = this.props;
    return (
      <DetailForm onSubmit={ handleSubmit(this.submit) }>
        <DetailPostComment>
          <Field
            id="content"
            name="content"
            userName={ user.userName }
            type="text"
            placeholder="해당 강의 내용 또는 퀴즈에 대해 궁금한 점이 잇다면 댓글을 달아주세요."
            component={ this.renderTextArea }
            normalize={ normalizePostComment }
          />
        </DetailPostComment>
        <Bottom>
          <BtnPostComment type="submit">질문 등록</BtnPostComment>
        </Bottom>
      </DetailForm>
    );
  }
}

PostComment.propTypes = propTypes;
PostComment.defaultProps = defaultProps;

export default reduxForm({
  form: 'postComment'
})(PostComment);
