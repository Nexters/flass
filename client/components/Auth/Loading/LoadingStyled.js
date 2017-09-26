import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-top: 17rem;
  flex-direction: column;
  justify-content: center;
`;

const LoadingIcon = styled.img`
  width: 25rem;
  margin-left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingText = styled.div`
  margin-top: 1.375rem;
  font-size: 1.5625rem;
  font-weight: 500;
  color: #b6bfc1;
  text-align: center;
`;

export {
  Wrapper,
  LoadingIcon,
  LoadingText
};
