import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// const propTypes = {};
// const defaultProps = {};

class Upload extends Component {
  state = {
    title: '',
    description: ''
  };

  render() {
    // const { } = this.props;
    const { title, description } = this.state;
    return(
      <form>
        <input
          type="file"
          onChange={this.handleUploadVideo}
        />
        <label>제목</label>
        <input
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <label>학습 목표</label>
        <textarea
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="다음"
          onSubmit={this.handleSubmit}
        />
      </form>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUploadVideo = () => {
    // upload video via youtube || server?
  }

  handleSubmit = () => {
    // dispatch action to update store with uploaded data
  }
}

// Upload.propTypes = propTypes;
// Upload.defaultProps = defaultProps;

export default Upload;
