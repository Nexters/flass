import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import color from '~/css/base/colors.scss';

const BadgeItemView = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const Name = styled.div`
  display: inline-block;
  margin: 0 1rem;
`;

const Content = styled.div`
  display: inline-block;
`;

const propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

const defaultProps = {};

const BadgeItem = ({ name, content }) => (
  <BadgeItemView>
    <Name>{name}</Name>
    <Content>{content}</Content>
  </BadgeItemView>
);

BadgeItem.propTypes = propTypes;
BadgeItem.defaultProps = defaultProps;

export default BadgeItem;
