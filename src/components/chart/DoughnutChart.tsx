import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TopCategory {
    category: string;
    sales: number;
}

interface DoughnutChartProps {
    totalCategories: number;
    totalProducts: number;
    topCategories: TopCategory[];
}

const DoughnutChart = ({ totalCategories, totalProducts, topCategories }: DoughnutChartProps) => {
    const chartData = topCategories.map((item: TopCategory) => item.sales);
    const chartLabels = topCategories.map((item: TopCategory) => item.category);
    const chartColors = ['#28c76f', '#1b2850', '#E04F16'];

    const data = {
        labels: chartLabels,
        datasets: [
            {
                data: chartData,
                backgroundColor: chartColors,
                borderWidth: 2,
                borderColor: '#fff',
                borderRadius: 8,
                spacing: 4,
                hoverOffset: 12,
            },
        ],
    };

    const options = {
        cutout: '50%',
        responsive: true,
        layout: {
            padding: 10,
        },
        animation: {
            animateRotate: true,
            duration: 1000,
            easing: 'easeInOutQuad' as const,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${context.raw}`;
                    }
                },
                displayColors: false
            }
        },
        hover: {
            mode: 'nearest' as const,
            animationDuration: 400,
        },
    };

    const legendItems = topCategories.map((item: TopCategory) => ({
        label: item.category,
        value: item.sales,
        color: chartColors[topCategories.indexOf(item)],
    }));

    return (
        <div className='bg-white rounded-lg p-4'>
            <div className="flex items-center justify-between gap-6">
                <div className='h-60'>
                    <Doughnut data={data} options={options} />
                </div>

                <div className="space-y-6">
                    {legendItems.map((item, index: number) => (
                        <div key={index}>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span
                                    className="w-1 h-3 rounded-full inline-block"
                                    style={{ backgroundColor: item.color }}
                                ></span>
                                {item.label}
                            </div>
                            <div className="text-xl font-semibold text-gray-800">
                                {item.value} <span className="text-sm font-normal text-gray-500">Sales</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-4'>
                <p className='text-sm font-semibold'>Category Statistics</p>
                <div className='border border-gray-300 mt-2 rounded'>
                    <div className='flex items-center justify-between border-b border-gray-300'>
                        <p className='p-2 text-sm flex items-center gap-2'>
                            <span
                                className="w-2 h-2 rounded-full inline-block bg-black"
                            ></span>
                            Total Number Of Categories
                        </p>
                        <p className='p-2 text-sm font-semibold'>{totalCategories}</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='p-2 text-sm flex items-center gap-2'>
                            <span
                                className="w-2 h-2 rounded-full inline-block bg-green-500"
                            ></span>
                            Total Number Of Products
                        </p>
                        <p className='p-2 text-sm font-semibold'>{totalProducts}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoughnutChart;
