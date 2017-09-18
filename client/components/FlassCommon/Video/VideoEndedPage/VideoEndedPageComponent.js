import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { StyledVideoEndedPage } from './VideoEndedPageStyled';

import ReplayBtnIcon from '../../../../../public/icons/replay-btn.png';

const { func } = PropTypes;

const propTypes = {
  onReplayBtnClick: func.isRequired,
  styledProps: func.isRequired
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
    const { styledProps } = this.props;

    return (
      <StyledVideoEndedPage.Container
        isOpen={ isOpen }
        styledProps={ styledProps }>

        <StyledVideoEndedPage.Title
          styledProps={ styledProps }>
          강의를 모두 시청하였습니다.
        </StyledVideoEndedPage.Title>

        <StyledVideoEndedPage.ReplayBtn
          styledProps={ styledProps }
          srcSet={ ReplayBtnIcon }
          onClick={ this.onReplayBtnClick } />

        <StyledVideoEndedPage.BtnLabel
          styledProps={ styledProps }>
          다시 시청하기
        </StyledVideoEndedPage.BtnLabel>

      </StyledVideoEndedPage.Container>
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
