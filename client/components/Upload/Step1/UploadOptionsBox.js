import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './uploadOptionsBox.scss';
import Options from './img/options.png';
import Options2x from './img/options@2x.png';
import Options3x from './img/options@3x.png';
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
    return (
      <div>
        <img
          src={ Options }
          srcSet={ `${Options2x} 2x,${Options3x} 3x` }
          className="optionsBoxIcon"
          alt="업로드 아이콘" />
        <span className="optionsBoxMessage">업로드 방법을 선택하세요.</span>
        <div className="buttonsContainer">
          <Button
            color="#9abf32"
            margin="0 1.78rem 0 0"
            onClick={ selectFileMethod }>파일 업로드</Button>
          <Button
            color="#9abf32"
            onClick={ selectURLMethod }>유튜브 URL</Button>
        </div>
      </div>
    );
  }
}

UploadOptionsBox.propTypes = propTypes;
UploadOptionsBox.defaultProps = defaultProps;

export default UploadOptionsBox;
