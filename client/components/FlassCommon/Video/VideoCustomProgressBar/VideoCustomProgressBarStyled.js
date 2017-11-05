import styled from 'styled-components';

const $progressbarMarginTop = '1rem';

export const VideoProgressBar = styled.div`
  position: relative;

  @media (min-width: 63.125rem) {
    width: 100%;
    background-color: transparent;

    &::before {
      display: block;
      content: "";
      height: ${$progressbarMarginTop};
    }
  }
`;
