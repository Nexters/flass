import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './RulerComponentStyles.scss';

const propTypes = {};
const defaultProps = {};

class RulerComponent extends Component {
  render() {
    return (
      <div className="indicator-bar-ruler">
        { this.renderMultipleSpace() }
      </div>
    );
  }

  renderMultipleSpace() {
    const NUM_OF_RULER_SPACING = 6;
    const space = [];

    space.push(<div className="indicator-bar-ruler__first" key="first">first</div>);

    for (let i = 0; i < NUM_OF_RULER_SPACING; i += 1) {
      space.push(
        <div className="indicator-bar-ruler__space" key={ i } >
          <div className="indicator-bar-ruler__digit">
            { i }
          </div>
        </div>
      );
    }

    return space;
  }
}

RulerComponent.propTypes = propTypes;
RulerComponent.defaultProps = defaultProps;

export default RulerComponent;
