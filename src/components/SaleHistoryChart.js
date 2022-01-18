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
            backgroundColor: 'red',
            borderColor: 'rgb(0, 0, 0)',
            borderwidth: 1,
            data: quantitySold,
            order: 2
          }, 
          {
            type: 'line',
            label: 'Price Per Quantity',
            yAxisID: 'Price Per Quantity',
            backgroundColor: 'blue',
            borderColor: 'rgb(0, 0, 0)',
            borderwidth: 1,
            data: pricePerQuantity,
            order: 1
          }
        ]
      }}
      options={{
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
              stepSize: 3,
              callback: (value, index, ticks) => {
                return value + ' units sold';
              }
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
        }
      }}
    />
  );
};

export default SalesHistoryChart;
