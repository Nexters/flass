import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './infoBox.scss';

const propTypes = {
  videoInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

class InfoBox extends Component {

  render() {
    const { videoInfo, onChange } = this.props;

    return (
      <div className="full-width">
        <h3 className="info-label">강의 제목</h3>
        <input
          name="title"
          value={ videoInfo.title }
          className={ classNames('full-width', 'info-input') }
          onChange={ onChange } />
        <div className="half">
          <h3 className="info-label">강의 과목</h3>
          <input
            name="subject"
            value={ videoInfo.subject }
            className={ classNames('full-width', 'info-input') }
            onChange={ onChange } />
        </div>
        <div className="half">
          <h3 className="info-label">교재 범위</h3>
          <input
            name="textbook"
            value={ videoInfo.textbook }
            className={ classNames('full-width', 'info-input') }
            onChange={ onChange } />
        </div>
        <h3 className="info-label">강의 설명</h3>
        <textarea
          name="description"
          value={ videoInfo.description }
          className={ classNames('full-width', 'info-input', 'info-textarea') }
          onChange={ onChange } />
      </div>
    );
  }
}

InfoBox.propTypes = propTypes;

export default InfoBox;
