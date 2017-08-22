import React, { Component } from 'react';
import { Modal } from './ModalStyled';

const propTypes = {};
const defaultProps = {};

class ModalComponent extends Component {
  render() {
    return (
      <Modal.Wrapper>
        <Modal.Inner>
          <Modal.InnerWrapper>
            <Modal.Header>
              영상이 성공적으로 업로드되었습니다.
            </Modal.Header>

            <Modal.Body>
              <Modal.Input />
              <Modal.Btn>
                링크 복사
              </Modal.Btn>
            </Modal.Body>

            <Modal.Hr>{ ' ' }</Modal.Hr>

            <Modal.Footer>
              <Modal.CompleteBtn>
                완 료
              </Modal.CompleteBtn>
            </Modal.Footer>
          </Modal.InnerWrapper>
        </Modal.Inner>
      </Modal.Wrapper>
    );
  }
}

ModalComponent.propTypes = propTypes;
ModalComponent.defaultProps = defaultProps;

export default ModalComponent;
