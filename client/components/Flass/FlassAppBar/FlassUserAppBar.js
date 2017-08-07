import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../common/colors.scss';
import FlassBadge from './FlassBadge';

const UserName = styled.span`
  font-family: NotoSansCJKkr;
  text-decoration: none;
  letter-spacing: 5px;
  font-size: 15px;
  font-weight: 100;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  color: ${color['slate-grey-two']};
`;

const propTypes = {
  badges: PropTypes.array
};

const defaultProps = {
  badges: [
    { id: 1, content: 'Refresh' },
    { id: 2, content: 'Help &amp; feedback' },
    { id: 3, content: 'Settings' },
    { id: 4, content: 'Sign out' }
  ]
};

class FlassUserAppBar extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <FlassBadge />
        <UserName>최혜민</UserName>
      </div>
    );
  }
}

FlassUserAppBar.propTypes = propTypes;
FlassUserAppBar.defaultProps = defaultProps;

export default FlassUserAppBar;
