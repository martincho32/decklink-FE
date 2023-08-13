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

  // const getOrCreateTooltip = (chart, slideTitle: string) => {
  //   let tooltipEl = chart.canvas.parentNode.querySelector('div');

  //   if (!tooltipEl) {
  //     tooltipEl = document.createElement('div');
  //     tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
  //     tooltipEl.style.borderRadius = '3px';
  //     tooltipEl.style.color = 'white';
  //     tooltipEl.style.opacity = 1;
  //     tooltipEl.style.pointerEvents = 'none';
  //     tooltipEl.style.position = 'absolute';
  //     tooltipEl.style.transform = 'translate(-50%, 0)';
  //     tooltipEl.style.transition = 'all .1s ease';

  //     const div = document.createElement('div');
  //     // div.style.width = '100px';
  //     // div.style.height = '100px';
  //     const pageNumber = slideTitle.replace('Slide ', '');
  //     const component = (
  //       <DeckPreviewMini
  //         fileUrl={deck?.deckUrl}
  //         pageNumber={Number(pageNumber)}
  //         onDocumentLoadSuccess={onDocumentLoadSuccess}
  //       />
  //     );
  //     const htmlString = ReactDOMServer.renderToString(component);
  //     console.log(htmlString);
  //     div.innerHTML = htmlString;
  //     tooltipEl.appendChild(div);
  //     chart.canvas.parentNode.appendChild(tooltipEl);
  //   }
  //   return tooltipEl;
  // };

  // const externalTooltipHandler = (context) => {
  //   // Tooltip Element
  //   const { chart, tooltip } = context;
  //   const tooltipEl = getOrCreateTooltip(chart, tooltip.title[0]);

  //   // Hide if no tooltip
  //   if (tooltip.opacity === 0) {
  //     tooltipEl.style.opacity = 0;
  //     return;
  //   }

  //   // Set Text
  //   // if (tooltip.body) {
  //   //   const titleLines = tooltip.title || [];
  //   //   const bodyLines = tooltip.body.map((b) => b.lines);

  //   //   const tableHead = document.createElement('thead');

  //   //   titleLines.forEach((title) => {
  //   //     const tr = document.createElement('tr');
  //   //     tr.style.borderWidth = 0;

  //   //     const th = document.createElement('th');
  //   //     th.style.borderWidth = 0;
  //   //     const text = document.createTextNode(title);

  //   //     th.appendChild(text);
  //   //     tr.appendChild(th);
  //   //     tableHead.appendChild(tr);
  //   //   });

  //   //   const tableBody = document.createElement('tbody');
  //   //   bodyLines.forEach((body, i) => {
  //   //     const colors = tooltip.labelColors[i];

  //   //     const span = document.createElement('span');
  //   //     span.style.background = colors.backgroundColor;
  //   //     span.style.borderColor = colors.borderColor;
  //   //     span.style.borderWidth = '2px';
  //   //     span.style.marginRight = '10px';
  //   //     span.style.height = '10px';
  //   //     span.style.width = '10px';
  //   //     span.style.display = 'inline-block';

  //   //     const tr = document.createElement('tr');
  //   //     tr.style.backgroundColor = 'inherit';
  //   //     tr.style.borderWidth = 0;

  //   //     const td = document.createElement('td');
  //   //     td.style.borderWidth = 0;

  //   //     const text = document.createTextNode(body);

  //   //     td.appendChild(span);
  //   //     td.appendChild(text);
  //   //     tr.appendChild(td);
  //   //     tableBody.appendChild(tr);
  //   //   });

  //   //   const tableRoot = tooltipEl.querySelector('table');

  //   //   // Remove old children
  //   //   while (tableRoot.firstChild) {
  //   //     tableRoot.firstChild.remove();
  //   //   }

  //   //   // Add new children
  //   //   tableRoot.appendChild(tableHead);
  //   //   tableRoot.appendChild(tableBody);
  //   // }

  //   const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  //   // Display, position, and set styles for font
  //   tooltipEl.style.opacity = 1;
  //   tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  //   tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  //   tooltipEl.style.font = tooltip.options.bodyFont.string;
  //   tooltipEl.style.padding =
  //     tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  // };

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
