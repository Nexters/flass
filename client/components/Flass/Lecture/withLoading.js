import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CircularProgress } from 'material-ui';

const propTypes = {
  detail: PropTypes.shape({
    isLoading: PropTypes.bool
  }).isRequired
};
const defaultProps = {
};

const withLoadingComponent = (props, options, WrappedComponent) => {
  const { isLoading } = props.detail;

  if (isLoading) {
    return (<div style={ { textAlign: 'center' } }>
      <CircularProgress size={ 80 } thickness={ 5 } />
    </div>);
  }
  return <WrappedComponent { ...props } />;
};

withLoadingComponent.propTypes = propTypes;
withLoadingComponent.defaultProps = defaultProps;

const withLoading = options => WrappedComponent => _.partial(withLoadingComponent, _, options, WrappedComponent);

export default withLoading;
