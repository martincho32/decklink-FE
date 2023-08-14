/* eslint-disable object-shorthand */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Viewer,
  Worker,
  ScrollMode,
  PageLayout,
  SpecialZoomLevel,
} from '@react-pdf-viewer/core';
import { Line } from 'react-chartjs-2';
import { IDeck } from '../../types';
import './LineChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  deck: Partial<IDeck> | null;
  labels: string[] | undefined;
  data: number[] | undefined;
  pdfFile: any;
}

export default function LineChart({ deck, labels, data, pdfFile }: Props) {
  const pageLayout: PageLayout = {
    buildPageStyles: () => ({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    }),
    transformSize: ({ size }) => ({
      height: size.height,
      width: size.width + 5,
    }),
  };

  const widthNumberDesktop = deck && deck.slides && deck.slides * 300.5;

  const widthStringDesktop = `${widthNumberDesktop}px`;

  const desktopStyle = {
    width: widthStringDesktop,
    height: '12rem',
    display: 'flex',
  };
  const previewDeckWidthNumber = deck && deck.slides && deck.slides * 300 + 100;

  return (
    <div className="">
      <div
        className="chartWrapper flex !w-full !h-auto mt-4"
        style={desktopStyle}
      >
        <div className="w-9 h-[12rem] [&>*]:!w-9 [&>*]:!h-[12rem] z-10 bg-white">
          <Line
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false,
                },
              },
              maintainAspectRatio: false,
              layout: {
                padding: {
                  bottom: 28.5,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  afterFit: (ctx) => {
                    ctx.width = 32;
                  },
                  grid: {
                    drawTicks: false,
                    // display: false,
                  },
                },
                x: {
                  beginAtZero: true,
                  ticks: {
                    display: false,
                  },
                  grid: {
                    drawTicks: false,
                    display: false,
                  },
                },
              },
            }}
            data={{
              labels: labels,
              datasets: [
                {
                  data: data,
                  fill: false,
                  borderColor: 'rgb(241, 81, 27)',
                  backgroundColor: 'rgb(241, 81, 27)',
                  pointRadius: 0,
                  showLine: false,
                },
              ],
            }}
          />
        </div>
        <div
          style={{ maxWidth: widthStringDesktop }}
          className="overflow-x-scroll h-auto ml-[-1rem] z-0"
        >
          <div
            style={{ width: `calc(${widthNumberDesktop}px + 100px)` }} // Perform the subtraction with a numerical value
            className="h-[12rem] [&>*]:!h-[12rem]"
          >
            <Line
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: true,
                    // position: 'nearest',
                    // external: externalTooltipHandler,
                  },
                },
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    top: 10,
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      display: false,
                    },
                    grid: {
                      drawTicks: false,
                    },
                  },
                },
              }}
              data={{
                labels: ['', ...(labels as string[]), ''],
                datasets: [
                  {
                    label: 'Seconds',
                    data: [null, ...(data as number[]), null],
                    tension: 0.5,
                    borderColor: 'rgb(241, 81, 27)',
                    backgroundColor: 'rgba(241, 81, 27, 0.5)',
                    pointRadius: 5,
                    pointBorderColor: 'rgba(241, 81, 27)',
                    pointBackgroundColor: 'rgba(241, 81, 27)',
                  },
                ],
              }}
            />
          </div>
          <div
            className="deckLineChartPreview"
            style={{
              height: '11rem',
              marginTop: '1rem',
              marginBottom: '1rem',
              marginLeft: '150px',
              width: `${previewDeckWidthNumber}px`,
              overflowX: 'hidden',
            }}
          >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
              <Viewer
                scrollMode={ScrollMode.Horizontal}
                fileUrl={pdfFile} // Pass the PDF file URL to Viewer
                enableSmoothScroll={false}
                pageLayout={pageLayout}
                defaultScale={SpecialZoomLevel.PageFit}
                characterMap={{
                  isCompressed: true,
                  url: 'https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js',
                }}
              />
            </Worker>
          </div>
        </div>
      </div>
    </div>
  );
}
