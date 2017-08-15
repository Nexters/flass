import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Subheader } from 'material-ui';
import Chart from 'chart.js';

const propTypes = {};

const defaultProps = {};

class AnalysisItem extends Component {

  componentDidMount() {
    const myChart = new Chart(this.myChart, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Subheader><span>03:25</span> 질문 내용1</Subheader>
        <canvas id="myChart" width="300" height="200" ref={chart => this.myChart = chart} />
      </div>
    );
  }
}

AnalysisItem.propTypes = propTypes;
AnalysisItem.defaultProps = defaultProps;

export default AnalysisItem;
