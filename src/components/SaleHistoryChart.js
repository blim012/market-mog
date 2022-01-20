import React from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
);

ChartJS.defaults.color = '#E8E6E3';
ChartJS.defaults.font.family = 'Source Sans Pro';
ChartJS.defaults.font.size = 14;

const SalesHistoryChart = (props) => {
  const { labels, quantitySold, pricePerQuantity } = props.data;

  return (
    <Chart
      data={{
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: 'Quantity Sold',
            yAxisID: 'Quantity Sold',
            backgroundColor: '#2D2A25',
            borderwidth: 1,
            data: quantitySold,
            order: 2
          }, 
          {
            type: 'line',
            label: 'Price Per Quantity',
            yAxisID: 'Price Per Quantity',
            backgroundColor: '#008060',
            borderColor: '#574C4D',
            borderwidth: 1,
            data: pricePerQuantity,
            order: 1
          }
        ]
      }}
      options={{
        layout: {
          padding: 15
        },
        scales: {
          'Price Per Quantity': {
            display: true,
            type: 'linear',
            position: 'left',
            ticks: {
              callback: (value, index, ticks) => {
                return value + ' gil';
              }
            }
          },
          'Quantity Sold': {
            display: true,
            type: 'linear',
            position: 'right',
            ticks: {
              max: 99,
              min: 1,
              stepSize: 20,
              callback: (value, index, ticks) => {
                return value + ' units sold';
              }
            }
          },
          x: {
            ticks: {
                callback: function(value, index, ticks) {
                  if(index === 0 || index === (ticks.length - 1)) {
                    return this.getLabelForValue(value).split(',')[0];
                  }
                },
                maxRotation: 0,
                minRotation: 0,
                padding: 10
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                let label = context.dataset.label;
                let value = context.parsed.y;
                let priceLabel = (label === 'Price Per Quantity');
                label += `: ${value}`;
                if(priceLabel) label += ' gil';
                return label;
              } 
            }
          }
        },
        maintainAspectRatio: false
      }}
    />
  );
};

export default SalesHistoryChart;
