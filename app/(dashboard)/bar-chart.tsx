import { WeekCollection } from "@/lib/types";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarChartProps {
  bookingData: WeekCollection[];
}

export default function BarChart({ bookingData }: BarChartProps) {
  const dateArray = [];
  const amountArray = [];

  for (const obj of bookingData) {
    dateArray.push(obj.date);
    amountArray.push(obj.total);
  }

  const options = {
    responsive: true,
  };

  const labels = dateArray;

  const data = {
    labels,
    datasets: [
      {
        label: "Last 7 days",
        data: amountArray,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
