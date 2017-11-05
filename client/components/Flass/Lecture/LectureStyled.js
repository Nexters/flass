import styled from 'styled-components';
import color from '../../../css/base/colors.scss';

const $playerHeight = 650;
const $playerWidth = 100;

export const FlassLectureStyled = {
  Wrapper: styled.div`
    padding-right: 5.81rem;
  `,
  Content: styled.div`
    min-height: 21rem;

    & .flass-lecture-media__player-wrapper {
      width: ${$playerWidth}%;
      height: ${$playerHeight}px;
      border-radius: 3px;
    }

    & .flass-lecture-media__player {
      &::after {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        content: ""
      }
    }

    & .flass-lecture-media__modal {

    }
  `,
  Tab: styled.div`
      margin-top: 2rem;
      margin-bottom: 4rem;
      background-color: ${color['white']};
      box-shadow: 2px 4px 10px 0 rgba(79, 79, 79, 0.2);

      .nav-tabs {
        padding: 2rem 0 0 3rem;
        border-bottom: solid 1px #ebebeb;
      }

      .nav>li {
        padding: 0 0 1.5rem 0;
        margin-right: 2rem;
      }

      .nav>li>a {
        padding: 0;
      }

      .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        border: 0;
      }

      .nav-tabs>li.active, .nav-tabs>li.active:focus, .nav-tabs>li.active:hover {
        border: 0;
        border-bottom: solid 4px ${color['light-navy']};
      }

      .tab-content {
        padding: 0 3rem;
      }
  `,
};
