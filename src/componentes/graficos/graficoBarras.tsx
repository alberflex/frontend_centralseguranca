import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarChartProps = {
  arrNomes: string[];
  arrValores: number[];
  definicao: string;
  titulo: string;
};

export const BarChart: React.FC<BarChartProps> = ({ titulo, definicao, arrNomes, arrValores, }) => {
  const data = {
    labels: arrNomes,
    datasets: [
      {
        label: definicao,
        data: arrValores,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: titulo,
      },
    },
  };

  return <Bar options={options} data={data} />;
};