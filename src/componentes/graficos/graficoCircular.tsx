import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type DoughnutChartProps = {
  labels: string[];
  values: number[];
  titulo: string;
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({ labels, values, titulo }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Total',
        data: values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: titulo,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
