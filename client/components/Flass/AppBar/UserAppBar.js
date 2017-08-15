import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../common/colors.scss';
import Badge from './Badge/BadgeContainer';

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

const propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

const defaultProps = {};

class UserAppBar extends Component {
  componentDidMount() {}

  render() {
    const { user } = this.props;

    return (
      <FlassUserAppBarView>
        <Badge userId={user.id} />
        <Divider />
        <UserName>{user.userName}</UserName>
      </FlassUserAppBarView>
    );
  }
}

UserAppBar.propTypes = propTypes;
UserAppBar.defaultProps = defaultProps;

export default UserAppBar;
