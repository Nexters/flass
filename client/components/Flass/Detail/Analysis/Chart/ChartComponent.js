import React, { Component } from 'react';
import Chart from 'chart.js';

const propTypes = {};
const defaultProps = {};

class ChartComponent extends Component {
  componentDidMount() {
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
    const myChart = new Chart(this.myChart, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [12, 19, 3, 5],
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
  render() {
    return (
      <canvas id="myChart" width="300" height="200" ref={ chart => this.myChart = chart } />
    );
  }
}

ChartComponent.propTypes = propTypes;
ChartComponent.defaultProps = defaultProps;

export default ChartComponent;
