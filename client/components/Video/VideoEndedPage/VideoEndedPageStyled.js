import { getStyledComponent } from '../../styled-components/helper';

const template = {
  Container: {
    tag: 'div'
  },
  Title: {
    tag: 'div'
  },
  ReplayBtn: {
    tag: 'img'
  },
  BtnLabel: {
    tag: 'div'
  }
};

const StyledVideoEndedPage = getStyledComponent(template);

export { StyledVideoEndedPage };
