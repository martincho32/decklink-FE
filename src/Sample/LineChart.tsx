import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
    scales: {
      y: {
        min: 0,
      },
      x: {
        ticks: {
          color: 'blue',
        },
      },
    },
  },
};

const labels = [
  'Slide1',
  'Slide2',
  'Slide3',
  'Slide4',
  'Slide5',
  'Slide6',
  'Slide7',
  'Slide8',
  'Slide9',
  'Slide10',
  'Slide11',
  'Slide12',
  'Slide13',
  'Slide14',
  'Slide15',
  'Slide16',
];

const mockedData = [2, 4, 5, 6, 8, 1, 6, 6, 7, 1, 10, 4, 6, 1, 5, 8];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: mockedData,
      tension: 0.5,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      pointRadius: 5,
      pointBorderColor: 'rgba(255, 99, 132)',
      pointBackgroundColor: 'rgba(255, 99, 132)',
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}
