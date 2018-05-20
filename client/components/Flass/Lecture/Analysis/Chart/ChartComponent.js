import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import _ from 'lodash';

const propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};
const defaultProps = {};

const myBackgroundColor = [
  '#B6BFC1',
  '#EDEEEE',
  '#E5E8E8',
  '#EDEEEE'
];
const myBorderColor = [
  '#B6BFC1',
  '#EDEEEE',
  '#E5E8E8',
  '#EDEEEE'
];
const myHoverBackgroundColor = [
  '#9abf32',
  '#9abf32',
  '#9abf32',
  '#9abf32'
];
const myHoverBorderColor = [
  '#9abf32',
  '#9abf32',
  '#9abf32',
  '#9abf32'
];

class ChartComponent extends Component {
  componentDidMount() {
    const { labels, data } = this.props;
    this.viewChart = new Chart(this.myChart, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: myBackgroundColor,
          borderColor: myBorderColor,
          borderWidth: [1, 1, 1, 1],
          hoverBackgroundColor: myHoverBorderColor,
          hoverBorderColor: myHoverBackgroundColor,
          hoverBorderWidth: [1, 2, 3, 4]
        }]
      },
      options: {
        cutoutPercentage: 70,
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateChart(this.props);
  }

  updateChart = nextProps => {
    const { labels, data } = nextProps;
    if (!this.viewChart) {
      return;
    }
    this.viewChart.config.data = {
      labels,
      datasets: [{
        data,
        backgroundColor: myBackgroundColor,
        borderColor: myBorderColor,
        borderWidth: [1, 1, 1, 1],
        hoverBackgroundColor: myHoverBorderColor,
        hoverBorderColor: myHoverBackgroundColor,
        hoverBorderWidth: [1, 2, 3, 4]
      }]
    };
    this.viewChart.update();
  };

  render() {
    return (
      <canvas id="myChart" width="300" height="200" ref={chart => this.myChart = chart} />
    );
  }
}

ChartComponent.propTypes = propTypes;
ChartComponent.defaultProps = defaultProps;

export default ChartComponent;
