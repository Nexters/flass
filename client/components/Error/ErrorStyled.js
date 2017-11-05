import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin-top: 16.25rem;
  flex-direction: column;
  justify-content: center;
`;

const Icon = styled.img`
  width: 9.375rem;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const ErrorResponseCode = styled.div`
  margin-top: 1.25rem;
  font-size: 2.1428rem;
  font-weight: 900;
  color: #b6bfc1;
  text-align: center;
`;

const ErrorText = styled.div`
  margin-top: 1.375rem;
  font-size: 1.5625rem;
  font-weight: 500;
  color: #b6bfc1;
  text-align: center;
`;

export {
  Wrapper,
  Icon,
  ErrorResponseCode,
  ErrorText
};
