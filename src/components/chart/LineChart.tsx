// MonthlyReportsLine.jsx
import React, { useMemo, useRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FiGrid } from "react-icons/fi";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Example data (adjust as needed)
const VALUES = [520, 410, 630, 380, 260, 480, 120, 310, 340, 670, 590, 720];

// Plugin: vertical dashed line on hover from point to bottom only
const hoverLine = {
  id: "hoverLine",
  afterDatasetsDraw(chart) {
    const { ctx, tooltip, chartArea } = chart;
    const active = tooltip?.getActiveElements?.() || [];
    if (!active.length) return;
    const x = active[0].element.x;
    const y = active[0].element.y; // Get the y position of the point

    ctx.save();
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = "#E04F16"; // violet-600-ish
    ctx.beginPath();
    ctx.moveTo(x, y); // Start from the point
    ctx.lineTo(x, chartArea.bottom); // End at the bottom
    ctx.stroke();
    ctx.restore();
  },
};

// Plugin: soft background gradient across chart area (optional)
const areaBackground = {
  id: "areaBackground",
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const { left, right, top, bottom } = chartArea;
    const grad = ctx.createLinearGradient(left, bottom, right, bottom);
    grad.addColorStop(0, "rgba(99, 102, 241, 0.05)");   // indigo-500 @ 5%
    grad.addColorStop(1, "rgba(236, 72, 153, 0.05)");  // pink-500 @ 5%
    ctx.save();
    ctx.fillStyle = grad;
    ctx.fillRect(left, top, right - left, bottom - top);
    ctx.restore();
  },
};

export default function MonthlyReportsLine({
  title = "Customer Reports by Month",
  values = VALUES,
  label = "Insurance",
  lineColor = "#E04F16",
  pointBorder = "#E04F16",
}) {
  const chartRef = useRef(null);

  const data = useMemo(
    () => ({
      labels: months,
      datasets: [
        {
          label,
          data: values,
          tension: 0.35,
          borderColor: lineColor,
          borderWidth: 4,
          pointRadius: 5,
          pointHoverRadius: 5, // Keep same size on hover
          pointBorderWidth: 3,
          pointHoverBorderWidth: 3, // Keep same border width on hover
          pointBackgroundColor: "#ffffff",
          pointBorderColor: pointBorder,
          pointHoverBackgroundColor: "#ffffff", // Keep same background on hover
          pointHoverBorderColor: pointBorder, // Keep same border color on hover
          fill: true,
          backgroundColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: c, chartArea } = chart;
            if (!chartArea) return "rgba(224,79,22,0.15)";
            const grad = c.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            grad.addColorStop(0, "rgba(224,79,22,0.08)");
            grad.addColorStop(1, "rgba(224,79,22,0.28)");
            return grad;
          },

        },
      ],
    }),
    [values, label, lineColor, pointBorder]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          displayColors: false,
          backgroundColor: "#111827", // slate-900
          titleColor: "#D1D5DB",      // gray-300
          bodyColor: "#FFFFFF",
          cornerRadius: 8,
          padding: 12,
          callbacks: {
            title: () => label,
            label: (ctx) => Number(ctx.parsed.y).toLocaleString(),
            labelTextColor: () => "#FFFFFF",
          },
        },
      },
      scales: {
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { color: "#6B7280", font: { size: 12 } }, // gray-500
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(17,24,39,0.06)", // faint grid
            drawBorder: false,
          },
          ticks: {
            color: "#9CA3AF", // gray-400
            font: { size: 12 },
            // keep ticks like 0, 200, 400...
            callback: (v) => v,
          },
          suggestedMax: Math.max(...values) * 1.15,
        },
      },
    }),
    [values, label]
  );

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] p-2 rounded-full">
          <FiGrid size={20} />
        </span>
        <p className="text-2xl font-bold">{title}</p>
      </div>

      <div className="border-b border-gray-300 mb-8"></div>

      <div className="relative h-[320px]">
        <Line ref={chartRef} data={data} options={options} plugins={[hoverLine]} />
      </div>
    </div>
  );
}
