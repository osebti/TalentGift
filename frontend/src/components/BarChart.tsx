import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

interface BarChartProps {
    id: string;
    labels: string[];
    dataset: number[];
    barColors?: string[];
}

const BarChart = (props: BarChartProps) => {
    const { 
        id, 
        labels, 
        dataset, 
        barColors = ["#5d805950", "#77407750", "#b766a350"]
    } = props;

    // Get ChartJS components
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip
    );

    // Build bar chart
    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                data: dataset,
                backgroundColor: barColors,
            },
        ],
    };

    return (
        <div id={`${id}-bar-chart`} data-testid={`${id}-bar-chart`} className="w-full h-full">
            <Bar data={data} options={options} />
        </div>
    );
}

export default BarChart;