import { useRef, useEffect } from 'react';
import { Chart, ChartConfiguration, Tooltip } from 'chart.js';
import { extractSets, VennDiagramChart } from 'chartjs-chart-venn';
Chart.register(Tooltip, VennDiagramChart)

interface DataSet {
    label: string;
    values: string[];
}

interface VennDiagramColors {
    colorA: string;
    colorB: string;
    colorC: string;
    colorD: string;
    colorAB: string;
    colorAC: string;
    colorAD: string;
    colorBC: string;
    colorBD: string;
    colorCD: string;
    colorABC: string;
    colorABD: string;
    colorACD: string;
    colorBCD: string;
    colorABCD: string;
}

interface VennDiagramProps {
    id: string;
    datasets: DataSet[];
    backgroundColors?: VennDiagramColors;
    padding?: number;
}

// function that returns a background color (from colors, for applicable sizes),
// for a venn diagram of size 1-5, 
// given an index
function getColor(colors: VennDiagramColors, size: number, index: number) {
    if (size === 4) {
        switch (index % 15) {
            case 0:
                return colors.colorA;
            case 1:
                return colors.colorB;
            case 2:
                return colors.colorC;
            case 3:
                return colors.colorD;
            case 4:
                return colors.colorAB;
            case 5:
                return colors.colorAC;
            case 6:
                return colors.colorAD;
            case 7:
                return colors.colorBC;
            case 8:
                return colors.colorBD;
            case 9:
                return colors.colorCD;
            case 10:
                return colors.colorABC;
            case 11:
                return colors.colorABD;
            case 12:
                return colors.colorACD;
            case 13:
                return colors.colorBCD;
            case 14:
                return colors.colorABCD;
        }
    } else if (size === 3) {
        switch (index % 7) {
            case 0:
                return colors.colorA;
            case 1:
                return colors.colorB;
            case 2:
                return colors.colorC;
            case 3:
                return colors.colorAB;
            case 4:
                return colors.colorAC;
            case 5:
                return colors.colorBC;
            case 6:
                return colors.colorABC;
        }
    } else if (size === 2) {
        switch (index % 3) {
            case 0:
                return colors.colorB;
            case 1:
                return colors.colorC;
            case 2:
                return colors.colorBC;
        }
    } else {
        return "#1d1d1d22";
    }
}

const VennDiagram = (props: VennDiagramProps) => {
    // Parse datasets from props
    const { 
        id, 
        datasets, 
        backgroundColors = {
            "colorA": "#77407750",
            "colorB": "#b766a350",
            "colorC": "#5d805950",
            "colorD": "#90b76650",
            "colorAB": "#97538d50",
            "colorAC": "#6a606850",
            "colorAD": "#847c6f50",
            "colorBC": "#8a737e50",
            "colorBD": "#a48f8550",
            "colorCD": "#779c6050",
            "colorABC": "#895f8050",
            "colorABD": "#9e718950",
            "colorACD": "#717e6450",
            "colorBCD": "#81886f50",
            "colorABCD": "#92738150"
        },
        padding = 32,
    } = props;

    const data: ChartConfiguration<'venn'>['data'] = extractSets(
        datasets,
    );

    // Add venn diagram to a canvas element
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (canvas) {
            const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
            if (ctx) {
                const diagram = new VennDiagramChart(ctx, {
                    data: data,
                    options: {
                        backgroundColor: function(context) {
                            const index = context.dataIndex;
                            return getColor(backgroundColors, datasets.length, index);
                        },
                        borderColor: "transparent",
                        layout: {
                            padding: padding,
                        }
                    }
                });

                // destroy chart when component unmounts
                return () => {
                    diagram.destroy();
                }
            }
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    // Return canvas element with venn diagram
    return (
        <canvas 
            id={`${id}-venn-diagram`}
            data-testid={`${id}-venn-diagram`}
            ref={canvasRef}
            className="w-full h-full"
        />
    );
}

export default VennDiagram;