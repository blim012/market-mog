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
            backgroundColor: 'blue',
            borderColor: 'rgb(0, 0, 0)',
            borderwidth: 1,
            data: pricePerUnit
          }
        ]
      }}
      options={{
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
        }
      }}
    />
  );
};

export default PricePerUnit;
