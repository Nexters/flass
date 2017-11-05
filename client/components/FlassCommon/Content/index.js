import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  children: PropTypes.element.isRequired
};
const defaultProps = {};

const Content = props => (
  <div className="content">
    { props.children }
  </div>
);

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
