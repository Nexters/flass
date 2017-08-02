import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  content: PropTypes.string.isRequired,
};

const defaultProps = {};

const Content = props => {
  const { content } = props;
  return (
    <div>
      {content}
    </div>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
