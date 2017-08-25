import styled from 'styled-components';

const $progressbarMarginTop = '16px';

export const VideoProgressBar = styled.div`
  position: relative;

  @media (min-width: 1010px) {
    width: 100%;
    background-color: transparent;

    &::before {
      display: block;
      content: "";
      height: ${$progressbarMarginTop};
    }
  }
`;
