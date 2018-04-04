import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container } from './HeaderStyled';

const { func } = PropTypes;

const propTypes = {
  Title: func.isRequired,
  SubTitle: func
};

const defaultProps = {
  SubTitle: () => null
};

class HeaderComponent extends Component {
  render() {
    const {
      Title,
      SubTitle
    } = this.props;

    return (
      <Container>
        <Title />
        <SubTitle />
      </Container>
    );
  }
}

HeaderComponent.propTypes = propTypes;
HeaderComponent.defaultProps = defaultProps;

export default HeaderComponent;
