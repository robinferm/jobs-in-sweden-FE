import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface Props {
  searchString: string;
}

const StatisticsVerticalBar = (props: Props) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: "{{searchString}}",
      },
    },
  };
  
  const labels = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
  
  const data = {
    labels,
    datasets: [
      {
        label: "Annonser relaterat till " + props.searchString,
        data: labels.map(() => getRandomInt(1000)),
        backgroundColor: 'rgba(39, 38, 53, .8)',
      }
    ],
  };
  return <Bar options={options} data={data} />;
};

export default StatisticsVerticalBar;


