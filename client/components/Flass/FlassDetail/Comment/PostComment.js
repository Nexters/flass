import React, { Component } from 'react';
import {
  Button, ControlLabel, Form, FormControl,
  FormGroup,
} from 'react-bootstrap';
import './PostComment.scss';

const propTypes = {};

const defaultProps = {};

class PostComment extends Component {
  componentDidMount() {}

  render() {
    return (
      <Form className="flass-post-comment">
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel className="flass-post-comment-label">최혜민</ControlLabel>
          <FormControl componentClass="textarea" placeholder="textarea" />
        </FormGroup>
        <div>
          <span>0 / 500</span>
          <Button className="flass-post-comment-btn" bsStyle="primary">등록</Button>
        </div>
      </Form>
    );
  }
}

PostComment.propTypes = propTypes;
PostComment.defaultProps = defaultProps;

export default PostComment;
