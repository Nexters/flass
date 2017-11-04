import styled from 'styled-components';

const tooltipWidth = 3.4375;
const tooltipHeight = 3.125;

export const Tab = {
  Wrapper: styled.li`
    float: left;
  `,
  Item: styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.8125rem;
    position: relative;
    width: ${tooltipWidth}rem;
    height: ${tooltipHeight}rem;
    background-color: #edeeee;
    text-align: center;
    font-size: 1.5714rem;
    font-weight: 'bold';
    border: solid 1.5px #cacdcd;
    border-radius: 3px;
    color: #cacdcd;
    transition: all .5s ease-out;

    &:hover {
      background-color: #87ac1e;
      color: white;
      border: solid 1px #92b729;
    }
  `,
  ActiveTabItemStyle: {
    backgroundColor: '#87ac1e',
    border: '1px #87ac1e solid',
    color: 'white'
  }
};
