import styled from 'styled-components';

const inActiveBarColor = '#d3d9d9';
const ActiveBarColor = '#9abf32';

export const VideoVolumeBar = styled.div`
  display: inline-block;
  margin-right: 4px;
  width: 5.5px;
  height: 19.7px;
  border-radius: 2px;
  background-color: ${props => (props.isActive ? ActiveBarColor : inActiveBarColor)};

  transition: background-color .3s linear;
`;
