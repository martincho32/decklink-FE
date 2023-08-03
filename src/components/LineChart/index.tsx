/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
import { useMediaQuery } from 'react-responsive';
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
import { Line } from 'react-chartjs-2';
import { IDeck } from '../../types';

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
}

export default function LineChart({ deck, labels, data }: Props) {
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

  const isMobile = useMediaQuery({ maxWidth: 576 });

  const widthNumberDesktop = deck && deck.slides && deck.slides * 15 - 5;
  const widthNumberMobile = deck && deck.slides && deck.slides * 10;

  const widthStringDesktop = `${widthNumberDesktop}rem`;
  const widthStringMobile = `${widthNumberMobile}rem`;

  const desktopStyle = {
    width: widthStringDesktop,
    height: '12rem',
    display: 'flex',
  };
  const mobileStyle = {
    width: widthStringMobile,
    height: '12rem',
    display: 'flex',
  };

  return (
    <div className="chartWrapper" style={isMobile ? mobileStyle : desktopStyle}>
      <Line
        options={{
          responsive: true,
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
        }}
        data={{
          labels: labels,
          datasets: [
            {
              label: deck?.name ?? 'No name provided',
              data: data,
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
  );
}
