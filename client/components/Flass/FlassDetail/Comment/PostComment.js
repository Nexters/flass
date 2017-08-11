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
    addComment(detailId, user.id, user.userName, content);
  };

  renderTextArea({ input, meta: { touched, error }, id, label, userName, ...props }) {
    return (
      <div>
        <FormGroup controlId={id}>
          <Label>{ userName }</Label>
          <TextArea
            { ...input }
            componentClass="textarea"
            { ...props } />
        </FormGroup>
        <Bottom>
          <BottomText>{input.value.length} / 500</BottomText>
          <BtnPostComment type="submit" bsStyle="primary">등록</BtnPostComment>
        </Bottom>
      </div>
    );
  }

  render() {
    const { user, handleSubmit } = this.props;
    return (
      <DetailPostComment onSubmit={ handleSubmit(this.submit) }>
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
    );
  }
}

PostComment.propTypes = propTypes;
PostComment.defaultProps = defaultProps;

export default reduxForm({
  form: 'postComment'
})(PostComment);
