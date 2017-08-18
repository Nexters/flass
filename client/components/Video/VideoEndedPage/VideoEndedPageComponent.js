import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { VideoEndedPage } from './VideoEndedPageStyled';

import ReplayBtnIcon from '../../../../public/icons/replay-btn.png';

const { bool, string, func } = PropTypes;

const propTypes = {
  onReplayBtnClick: func.isRequired
};
const defaultProps = {
};

class VideoEndedPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isOpen: true });
    }, 50);
  }

  render() {
    const { isOpen } = this.state;
    return (
      <VideoEndedPage.Container isOpen={ isOpen }>
        <VideoEndedPage.Title>
          강의를 모두 시청하였습니다.
        </VideoEndedPage.Title>
        <VideoEndedPage.ReplayBtn
          srcSet={ ReplayBtnIcon }
          onClick={ this.onReplayBtnClick } />
        <VideoEndedPage.BtnLabel>
          다시 시청하기
        </VideoEndedPage.BtnLabel>
      </VideoEndedPage.Container>
    );
  }

  @autobind
  onReplayBtnClick() {
    this.props.onReplayBtnClick();
  }
}

VideoEndedPageComponent.propTypes = propTypes;
VideoEndedPageComponent.defaultProps = defaultProps;

export { VideoEndedPageComponent };
