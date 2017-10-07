import styled from 'styled-components';

const iconSize = '2.1875rem';

export const Wrapper = styled.div`
  position: relative;
  float: right;
  display: inline-flex;
  margin-right: 1.25rem;
  margin-left: auto;
`;

export const Icon = styled.img`
  width: ${iconSize};
  height: ${iconSize};
  cursor: pointer;
`;
