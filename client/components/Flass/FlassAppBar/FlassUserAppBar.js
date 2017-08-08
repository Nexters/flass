import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../common/colors.scss';
import Badge from '../../../modules/Flass/FlassBadge/FlassBadgeContainer';

const FlassUserAppBarView = styled.div`
  width: 180px;
`;

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

const Divider = styled.span`
  width: 1px;
  border-left: solid 2px #afbfc1;
  margin: 0 2rem;
`;

const propTypes = {};
const defaultProps = {};

class FlassUserAppBar extends Component {
  componentDidMount() {}

  render() {
    return (
      <FlassUserAppBarView>
        <Badge />
        <Divider />
        <UserName>최혜민</UserName>
      </FlassUserAppBarView>
    );
  }
}

FlassUserAppBar.propTypes = propTypes;
FlassUserAppBar.defaultProps = defaultProps;

export default FlassUserAppBar;
