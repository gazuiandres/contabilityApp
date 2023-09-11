import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutProps = {
  data: ChartData<"doughnut">;
};

const DoughnutChart = ({ data }: DoughnutProps) => {
  return <Doughnut data={data} />;
};

export default DoughnutChart;
