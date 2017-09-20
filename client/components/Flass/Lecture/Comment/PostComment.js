import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ControlLabel, Form, FormControl,
  FormGroup
} from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import styled from 'styled-components';
import normalizePostComment from './normalizePostComment';
import color from '../../../../css/base/colors.scss';
import './PostComment.scss';

const LectureForm = styled(Form)``;

const LecturePostComment = styled.div`
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
  lectureId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  addComment: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

const defaultProps = {};

class PostComment extends Component {
  componentDidMount() {
    this.renderTextArea = this.renderTextArea.bind(this);
  }

  render() {
    const { name, user, handleSubmit } = this.props;
    return (
      <LectureForm onSubmit={ handleSubmit(this.submit) }>
        <LecturePostComment>
          <Field
            id="content"
            name="content"
            userName={ user.userName }
            type="text"
            placeholder="해당 강의 내용 또는 퀴즈에 대해 궁금한 점이 잇다면 댓글을 달아주세요."
            component={ this.renderTextArea }
            normalize={ normalizePostComment }
          />
        </LecturePostComment>
        <Bottom>
          <BtnPostComment type="submit">{ name }</BtnPostComment>
        </Bottom>
      </LectureForm>
    );
  }

  renderTextArea({ input, meta: { touched, error }, id, label, userName, ...props }) {
    return (
      <FormGroup controlId={ id }>
        <TextArea
          { ...input }
          componentClass="textarea"
          { ...props } />
      </FormGroup>
    );
  }

  submit = ({ content }) => {
    if (content) {
      const { lectureId, user, addComment, reset } = this.props;
      addComment(lectureId, user.id, user.userName, content);
      reset();
    }
  };
}

PostComment.propTypes = propTypes;
PostComment.defaultProps = defaultProps;

export default reduxForm({
  form: 'postComment'
})(PostComment);
