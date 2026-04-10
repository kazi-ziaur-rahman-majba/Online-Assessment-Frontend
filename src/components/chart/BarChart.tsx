import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FiBarChart2 } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface MonthlySalesCommissionDataProps {
  month: string;
  totalSales: string;
  totalCommission: string;
}

interface SalesPurchaseChartProps {
  monthlySalesCommissionData: MonthlySalesCommissionDataProps[];
}

const SalesPurchaseChart = ({ monthlySalesCommissionData }: SalesPurchaseChartProps) => {
  const monthlySales = Array(12).fill(0);
  const monthlyCommissions = Array(12).fill(0);

  monthlySalesCommissionData.forEach((entry: any) => {
    const monthIndex = new Date(entry.month + '-01').getMonth();
    monthlySales[monthIndex] = parseFloat(entry.totalSales);
    monthlyCommissions[monthIndex] = parseFloat(entry.totalCommission);
  });

  const data = {
    labels: monthNames,
    datasets: [
      {
        label: 'Total Sales',
        data: monthlySales,
        backgroundColor: '#E04F16',
        stack: 'stack1',
      },
      {
        label: 'Total Commission',
        data: monthlyCommissions,
        backgroundColor: '#F9C1A4',
        borderRadius: 8,
        stack: 'stack1',
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 0,
        right: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
          enabled: true,
          displayColors: false,
          callbacks: {
            label: (context: any) => {
              const label = context.dataset.label || '';
              const value = context.parsed.y || 0;
              return `${label}: $${value.toLocaleString()}`;
            },
          },
        },
        datalabels: {
          display: false, // 🚀 turn off numbers on bars
        },
    },
    interaction: {
      mode: 'nearest' as const,
      intersect: true,
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `$${value}`,
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#E5E7EB',
          borderDash: [4, 4],
        },
      },
    },
  };

  const totalSales = monthlySales.reduce((acc, val) => acc + val, 0);
  const totalCommissions = monthlyCommissions.reduce((acc, val) => acc + val, 0);

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <p className="text-2xl font-bold flex items-center gap-3">
          <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] p-2 rounded-full">
            <FiBarChart2 size={22} />
          </span>
          Sales vs Commissions
        </p>
      </div>

      <div className="border-b border-gray-300 mb-8"></div>

      <div className="flex gap-6 mb-8">
        <div className="text-md border border-gray-300 rounded-md p-2 w-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></span>
            <span>Total Sales</span>
          </div>
          <p className="font-bold text-xl ml-4">${totalSales.toLocaleString()}</p>
        </div>

        <div className="text-md border border-gray-300 rounded-md p-2 w-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f9c1a4]"></span>
            <span>Total Commissions</span>
          </div>
          <p className="font-bold text-xl ml-4">${totalCommissions.toLocaleString()}</p>
        </div>
      </div>

      <div className="relative w-full h-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesPurchaseChart;
