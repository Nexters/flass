import styled from 'styled-components';

export const Modal = {
  Wrapper: styled.div`
    position: fixed;
    z-index: 500;
    background-color: rgba(237, 238, 238, 0.8);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  Inner: styled.div`
    position: fixed;
    width: 49.625rem;;
    height: 17.8125rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 3px 4px 20px 0 rgba(79, 79, 79, 0.22);
    border: solid 1px rgba(0, 0, 0, 0.04);
  `,
  InnerWrapper: styled.div`
    padding: 2.5875rem 2.4375rem 2.225rem 2.4375rem;
    height: 100%;
  `,
  Header: styled.div`
    display: block;
    font-size: 1.25rem;
    font-weight: 500;
    color: #3f4a4b;
  `,
  Body: styled.div`
    overflow: auto;
    display: block;
    margin-top: 1.375rem;
    width: 100%;
  `,
  Input: styled.input`
    width: 35.88rem;
    height: 2.9375rem;
    float: left;
    border-radius: 5px;
    border: solid 1px #d3d9d9;
    outline: 0;
  `,
  Btn: styled.div`
    padding: 0.4rem;
    display: inline-block;
    width: 7.2312rem;
    height: 2.9375rem;
    float: right;
    border-radius: 6.25rem;
    border: solid 1.5px #9abf32;
    text-align: center;
    text-decoration: none;
    font-size: 1.25rem;
    font-weight: 500;
    color: #9abf32;
  `,
  Hr: styled.div`
    display: block;
    width: 100%;
    height: 1.9375rem;
    border-bottom: solid 0.0625rem #b6bfc1;

  `,
  Footer: styled.div`
    margin-top: 1.875rem;
  `,
  CompleteBtn: styled.div`
    padding: 0.4rem;
    margin: 0 auto;
    width: 8.3125rem;
    height: 2.9375rem;
    border-radius: 6.25rem;
    border: solid 1.5px #176d99;
    text-align: center;
    text-decoration: none;
    font-size: 1.375rem;
    font-weight: 500;
    color: #176d99;
  `
};
