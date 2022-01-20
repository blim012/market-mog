import React from "react";
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

const PricePerUnit = (props) => {
  const { labels, pricePerUnit } = props.data;

  return (
    <Chart
      data={{
        labels: labels,
        datasets: [
          {
            type: 'line',
            label: 'Price Per Unit',
            yAxisID: 'Price Per Unit',
            backgroundColor: '#008060',
            borderColor: '#574C4D',
            data: pricePerUnit
          }
        ]
      }}
      options={{
        layout: {
          padding: 15
        },
        scales: {
          'Price Per Unit': {
            display: true,
            type: 'linear',
            position: 'left',
            ticks: {
              callback: (value, index, ticks) => {
                return value + ' gil/unit';
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
                let value = parseFloat(context.parsed.y).toFixed(2);
                label += `: ${value} gil`;
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

export default PricePerUnit;
