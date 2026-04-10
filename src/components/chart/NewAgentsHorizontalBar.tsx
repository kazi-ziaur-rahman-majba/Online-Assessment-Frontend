// NewAgentsHorizontalBar.tsx
import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Tiny plugin to draw values at the end of each horizontal bar (scoped to this chart)
const valueLabels = {
  id: "valueLabels",
  afterDatasetsDraw(chart: any) {
    const { ctx, data } = chart;
    const meta = chart.getDatasetMeta(0);
    ctx.save();
    ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
    ctx.fillStyle = "#1f2544";
    meta.data.forEach((bar: any, i: number) => {
      const value = data.datasets[0].data[i];
      ctx.fillText(String(value), bar.x + 8, bar.y + 4);
    });
    ctx.restore();
  },
};
ChartJS.register(valueLabels);

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function NewAgentsHorizontalBar() {
  const agentValues = [40, 20, 420, 350, 100, 150, 55, 50, 30, 330, 360, 20];

  const barData = useMemo(
    () => ({
      labels: months,
      datasets: [
        {
          label: "Agents",
          data: agentValues,
          backgroundColor: "#E04F16",
          borderRadius: 10,
          barThickness: 14,
        },
      ],
    }),
    []
  );

  const barOptions = useMemo(
    () => ({
      indexAxis: "y" as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items: any[]) => items[0].label,
            label: (item: any) => `New agents: ${item.formattedValue}`,
          },
          displayColors: false,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          suggestedMax: 450,
          grid: { color: "rgba(31, 41, 55, 0.06)", drawBorder: false },
          ticks: { color: "#6b7280" },
        },
        y: {
          grid: { display: false, drawBorder: false },
          ticks: { color: "#6b7280" },
        },
      },
    }),
    []
  );

  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
      <h3 style={{ margin: 0, marginBottom: 12, color: "#111827", fontWeight: 700 }}>
        New added agent
      </h3>
      <div style={{ height: 300 }}>
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}
