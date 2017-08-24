import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import './infoBox.scss';
import Button from '../../Flass/Button';

const propTypes = {
  selectFileMethod: PropTypes.func.isRequired,
  selectURLMethod: PropTypes.func.isRequired
};

const defaultProps = {

};

class UploadOptionsBox extends Component {
  state = {

  };

  render() {
    const { selectFileMethod, selectURLMethod } = this.props;
    // const { } = this.state;
    return (
      <div>
        <img src="https://png.icons8.com/genie/color/24" alt="업로드 아이콘" />
        <h3>업로드 방법을 선택하세요.</h3>
        <Button
          color="#9abf32"
          onClick={ selectFileMethod }>파일 업로드</Button>
        <Button
          color="#9abf32"
          onClick={ selectURLMethod }>유튜브 URL</Button>
      </div>
    );
  }
}

UploadOptionsBox.propTypes = propTypes;
UploadOptionsBox.defaultProps = defaultProps;

export default UploadOptionsBox;
