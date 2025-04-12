import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const options = {
  title: "Categories of Blog",
  pieHole: 0.4,
  is3D: true,
};

const PieChart: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/getAnalytics`, {
            method:'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
    
        },
        
        });
        const data=await res.json();
        const newData = [
          ["Task", "Hours per Day"],
          ["Music", data.music],
          ["Movies", data.movies],
          ["Sports", data.sports],
          ["Tech", data.tech],
          ["Fashion", data.fashion],
        ];
        setChartData(newData);
      } catch (error) {
        const newData = [
          ["Task", "Hours per Day"],
          ["Music", 0],
          ["Movies", 0],
          ["Sports", 0],
          ["Tech", 0],
          ["Fashion", 0],
        ];
        setChartData(newData);
      }
    };

    getData();
  }, []);

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="500px"
      data={chartData}
      options={options}
    />
  );
};

export default PieChart;
