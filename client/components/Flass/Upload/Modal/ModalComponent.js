import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Copy from 'copy-to-clipboard';
import autobind from 'autobind-decorator';
import { Modal } from './ModalStyled';

const { string, object, shape } = PropTypes;

const propTypes = {
  url: string.isRequired
};
const defaultProps = {};

class ModalComponent extends Component {
  static contextTypes = {
    router: shape({
      history: object.isRequired
    })
  };

  render() {
    const {
      url
    } = this.props;

    return (
      <Modal.Wrapper>
        <Modal.Inner>
          <Modal.InnerWrapper>
            <Modal.Header>
              영상이 성공적으로 업로드되었습니다.
            </Modal.Header>

            <Modal.Body>
              <Modal.Input>{ url }</Modal.Input>
              <Modal.Btn
                onClick={ this.onClickCopyBtn }>
                링크 복사
              </Modal.Btn>
            </Modal.Body>

            <Modal.Hr />

            <Modal.Footer>
              <Modal.CompleteBtn
                onClick={ this.onClickCompleteBtn }>
                완 료
              </Modal.CompleteBtn>
            </Modal.Footer>
          </Modal.InnerWrapper>
        </Modal.Inner>
      </Modal.Wrapper>
    );
  }
  @autobind
  onClickCopyBtn() {
    const { url } = this.props;
    Copy(url);
  }

  @autobind
  onClickCompleteBtn() {
    return this.context.router.history.push('/');
  }
}

ModalComponent.propTypes = propTypes;
ModalComponent.defaultProps = defaultProps;

export default ModalComponent;
