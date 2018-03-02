import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import { CircularProgress } from 'material-ui';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  transform: translateY();
  background-color: rgba(0, 0, 0, .7);
`;

const ProgressStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateY(-50%, -50%)'
};

const propTypes = {
  lecture: PropTypes.shape({
    isLoading: PropTypes.bool
  }).isRequired
};
const defaultProps = {
};

const withLoadingComponent = (props, options, WrappedComponent) => {
  const { isLoading } = props.lecture;
  if (isLoading) {
    return (
      <Wrapper>
        <CircularProgress
          size={ 40 }
          thickness={ 7 }
          style={ ProgressStyle } />
      </Wrapper>
    );
  }
  return <WrappedComponent { ...props } />;
};

withLoadingComponent.propTypes = propTypes;
withLoadingComponent.defaultProps = defaultProps;

const withLoading = options => WrappedComponent => _.partial(withLoadingComponent, _, options, WrappedComponent);

export default withLoading;
