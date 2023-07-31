/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
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
  mockedData: number[] | undefined;
}

export default function LineChart({ deck, labels, mockedData }: Props) {
  return (
    <div>
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            // title: {
            //   display: true,
            //   text: 'Chart.js Line Chart',
            // },
            tooltip: {
              enabled: true,
              // external(args) {
              //   console.log(args);
              // },
              // external: function (context) {
              //   // console.log('context: ', context);
              //   // Tooltip Element
              //   let tooltipEl = document.getElementById('chartjs-tooltip');

              //   // Create element on first render
              //   if (!tooltipEl) {
              //     tooltipEl = document.createElement('div');
              //     tooltipEl.id = 'chartjs-tooltip';
              //     tooltipEl.innerHTML = '<span>Hello tincho</span>';
              //     document.body.appendChild(tooltipEl);
              //   }

              //   // // Hide if no tooltip
              //   // const tooltipModel: TooltipModel<'line'> = context.tooltip;
              //   // if (tooltipModel.opacity === 0) {
              //   //   tooltipEl.style.opacity = '0';
              //   //   return;
              //   // }

              //   // // Set caret Position
              //   // tooltipEl.classList.remove('above', 'below', 'no-transform');
              //   // if (tooltipModel.yAlign) {
              //   //   tooltipEl.classList.add(tooltipModel.yAlign);
              //   // } else {
              //   //   tooltipEl.classList.add('no-transform');
              //   // }

              //   // function getBody(bodyItem) {
              //   //   return bodyItem.lines;
              //   // }

              //   // // Set Text
              //   // if (tooltipModel.body) {
              //   //   const titleLines = tooltipModel.title || [];
              //   //   const bodyLines = tooltipModel.body.map(getBody);

              //   //   let innerHtml = '<thead>';

              //   //   titleLines.forEach(function (title) {
              //   //     innerHtml += '<tr><th>' + title + '</th></tr>';
              //   //   });
              //   //   innerHtml += '</thead><tbody>';

              //   //   bodyLines.forEach(function (body, i) {
              //   //     const colors = tooltipModel.labelColors[i];
              //   //     let style = 'background:' + colors.backgroundColor;
              //   //     style += '; border-color:' + colors.borderColor;
              //   //     style += '; border-width: 2px';
              //   //     const span =
              //   //       '<span style="' + style + '">' + body + '</span>';
              //   //     innerHtml += '<tr><td>' + span + '</td></tr>';
              //   //   });
              //   //   innerHtml += '</tbody>';

              //   //   let tableRoot = tooltipEl.querySelector('table');
              //   //   tableRoot!.innerHTML = innerHtml;
              //   // }

              //   // const position = context.chart.canvas.getBoundingClientRect();
              //   // // const bodyFont = ChartJS.helpers.toFont(
              //   // //   tooltipModel.options.bodyFont
              //   // // );

              //   // // Display, position, and set styles for font
              //   // tooltipEl.style.opacity = '1';
              //   // tooltipEl.style.position = 'absolute';
              //   // tooltipEl.style.left =
              //   //   position.left +
              //   //   window.pageXOffset +
              //   //   tooltipModel.caretX +
              //   //   'px';
              //   // tooltipEl.style.top =
              //   //   position.top +
              //   //   window.pageYOffset +
              //   //   tooltipModel.caretY +
              //   //   'px';
              //   // // tooltipEl.style.font = bodyFont.string;
              //   // // tooltipEl.style.padding =
              //   // //   tooltipModel. + 'px ' + tooltipModel.padding + 'px';
              //   // tooltipEl.style.pointerEvents = 'none';
              // },
            },
          },
          // onHover: (event, elements) => {
          //   // console.log('hover!!');
          //   // console.log('event: ', event);
          //   // console.log('elements: ', elements);
          //   // const canvas = event.;
          //   // if (elements.length > 0) {
          //   //   // Cambiar la imagen cuando se hace hover sobre un punto
          //   //   canvas.style.cursor = 'pointer';
          //   //   canvas.src = image; // Reemplaza 'imagen-hover.png' con la ruta de la imagen que deseas mostrar en hover
          //   // }
          //   // else {
          //   //   // Restaurar la imagen cuando no se hace hover sobre un punto
          //   //   canvas.style.cursor = 'default';
          //   //   canvas.src = image; // Reemplaza 'imagen-normal.png' con la ruta de la imagen original del gráfico
          //   // }
          // },
        }}
        data={{
          labels: labels,
          datasets: [
            {
              label: deck?.name ?? 'No name provided',
              data: mockedData,
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
