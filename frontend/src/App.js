import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from "recharts";

import "./App.css";

const App = () => {
  const [memoryData, setMemoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.102.32:3001/gpu-memory-usage");
        const gpuMemoryData = response.data;

        const newTime = new Date().toLocaleTimeString();

        setMemoryData((prevData) => {
          const newData = [
            ...prevData,
            { time: newTime, memoryUsage: gpuMemoryData[0]["Memory Used (GB)"] },
          ];
          const newDataLimited = newData.slice(Math.max(newData.length - 30, 0));
          return newDataLimited;
        });
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const xMin = new Date(Math.min(...memoryData.map((dataPoint) => new Date(dataPoint.time))));
  const xMax = new Date(Math.max(...memoryData.map((dataPoint) => new Date(dataPoint.time))));

  const yMin = 0;
  const yMax = 48;

  return (
    <div className="app-container">
      <div className="cyber-card">
        <h1>GPU2サーバ 使用率状況</h1>
        <LineChart width={800} height={400} data={memoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey="time"
            domain={[xMin, xMax]}
            stroke="#ffffff"
            tick={{ fontSize: 14 }}
          />
          <YAxis
            className="y-label"
            domain={[yMin, yMax]} // 縦軸の表示範囲を設定
            stroke="#ffffff"
            color="white"
            tick={{ fontSize: 14 }}
            label={
              <Label
                value="メモリ使用率 (GB)"
                position="insideLeft"
                angle={-90}
                dy={40}
                style={{ fill: "white" }}
              />
            }
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="memoryUsage" stroke="#ff6080" activeDot={{ r: 8 }} name="メモリ使用率(GB)" />
        </LineChart>
      </div>
    </div>
  );
};

export default App;