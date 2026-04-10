import React, { useMemo, useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FiGrid } from "react-icons/fi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const valueLabels = {
  id: "valueLabels",
  afterDatasetsDraw(chart: any, args: any, pluginOptions: any) {
    const dataset = chart?.data?.datasets?.[0];
    if (!dataset) return;

    const { ctx, chartArea } = chart;
    const meta = chart.getDatasetMeta(0);
    ctx.save();
    ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
    ctx.fillStyle = pluginOptions?.color || "#1f2544";

    meta.data.forEach((bar: any, i: number) => {
      const v = dataset.data[i];
      if (v == null) return;
      const x = Math.min(bar.x + 8, chartArea.right - 16);
      const y = bar.y + 4;
      ctx.fillText(String(v), x, y);
    });

    ctx.restore();
  },
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Example data matching screenshot
const DATA_2022 = [40, 20, 350, 350, 100, 150, 55, 50, 30, 330, 360, 20];
const DATA_2021 = [30, 15, 280, 220, 90, 120, 40, 35, 25, 200, 240, 18];

export default function NewAgentsBar({
  title = "New added agent",
  data2022 = DATA_2022,
  data2021 = DATA_2021,
  barColor = "#E04F16",
  cardBg = "#ffffff",
}) {
  const [year, setYear] = useState(2022);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const values = year === 2022 ? data2022 : data2021;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const suggestedMax = Math.ceil(Math.max(...values) * 1.1);

  const data = useMemo(
    () => ({
      labels: months,
      datasets: [
        {
          data: values,
          backgroundColor: barColor,
          borderRadius: {
            topRight: windowWidth < 768 ? 6 : 10,
            bottomRight: windowWidth < 768 ? 6 : 10,
            topLeft: 0,
            bottomLeft: 0,
          },
          borderSkipped: false,
          barThickness: windowWidth < 768 ? 10 : windowWidth < 1024 ? 12 : 14,
          maxBarThickness: windowWidth < 768 ? 14 : windowWidth < 1024 ? 16 : 20,
        },
      ],
    }),
    [values, barColor, windowWidth]
  );

  const options = useMemo(
    () => ({
      indexAxis: "y" as const,
      responsive: true,
      maintainAspectRatio: false,
      layout: { 
        padding: { 
          top: 8, 
          right: 8, 
          bottom: 8, 
          left: 8 
        } 
      },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        valueLabels: { color: "#1f2544" },
      },
      scales: {
        x: {
          display: false,
          grid: { display: false, drawBorder: false },
          min: 0,
          suggestedMax,
        },
        y: {
          grid: { display: false, drawBorder: false },
          ticks: { 
            color: "#6b7280", 
            font: { 
              size: windowWidth < 768 ? 10 : 12 
            }, 
            padding: windowWidth < 768 ? 4 : 8 
          },
        },
      },
    }),
    [suggestedMax, windowWidth]
  );

  return (
    <div
      className="w-full rounded-2xl shadow-sm"
      style={{
        background: cardBg,
        padding: windowWidth < 768 ? 12 : 16,
      }}
    >
      <div className="flex flex-col lg:flex-row items-start gap-3 lg:gap-4">
        <div className="w-full">
          <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
            <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] p-1.5 lg:p-2 rounded-full">
              <FiGrid size={windowWidth < 768 ? 16 : 20} />
            </span>
            <p className="text-lg lg:text-xl font-bold">{title}</p>
          </div>

          <div className="border-b border-gray-300 mb-3 lg:mb-4"></div>

          <div 
            className="relative w-full"
            style={{ 
              height: windowWidth < 768 ? 280 : windowWidth < 1024 ? 320 : 360 
            }}
          >
            <Bar data={data} options={options} plugins={[valueLabels]} />
          </div>
        </div>


        {/* <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={() => setYear(2022)}
            style={{
              border: "1px solid #e5e7eb",
              background: year === 2022 ? "#FCEFEA" : "#fff",
              color: year === 2022 ? "#E04F16" : "#374151",
              borderRadius: 10,
              padding: "6px 10px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            2022
          </button>
          <button
            onClick={() => setYear(2021)}
            style={{
              border: "1px solid #e5e7eb",
              background: year === 2021 ? "#FCEFEA" : "#fff",
              color: year === 2021 ? "#E04F16" : "#6b7280",
              borderRadius: 10,
              padding: "6px 10px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            2021
          </button>
        </div> */}
      </div>
    </div>
  );
}
