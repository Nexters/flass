import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
`;

const LoadingIcon = styled.img`
  width: 18.25rem;
`;

const LoadingText = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #b6bfc1;
`;

export {
  Wrapper,
  LoadingIcon,
  LoadingText
};
