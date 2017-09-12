import styled from 'styled-components';

const inActiveBarColor = '#d3d9d9';
const ActiveBarColor = '#9abf32';

export const VideoVolumeBar = styled.div`
  display: inline-block;
  margin-right: 0.375rem;
  width: 0.34375rem;
  height: 1.1875rem;
  border-radius: 6.25rem;
  background-color: ${props => (props.isActive ? ActiveBarColor : inActiveBarColor)};

  transition: background-color .3s linear;
`;
