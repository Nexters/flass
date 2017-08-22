import { css } from 'styled-components';

const SIZES = {
  atLargeForControllerbar: 1400,
  atMediumForControllerbar: 1010
};

const media = Object.keys(SIZES).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${SIZES[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export default media;
