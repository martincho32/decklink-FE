/* eslint-disable @typescript-eslint/dot-notation */
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
  // CoreChartOptions,
  // ElementChartOptions,
  // PluginChartOptions,
  // DatasetChartOptions,
  // ScaleChartOptions,
  // LineControllerChartOptions,
  // TooltipModel,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IDeck, IDeckView } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const options: Partial<
//   CoreChartOptions<'line'> &
//     ElementChartOptions<'line'> &
//     PluginChartOptions<'line'> &
//     DatasetChartOptions<'line'> &
//     ScaleChartOptions &
//     LineControllerChartOptions
// > = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//     scales: {
//       y: {
//         min: 0,
//       },
//       x: {
//         ticks: {
//           color: 'blue',
//         },
//       },
//     },
//   },
//   onHover: (event, elements) => {
//     console.log('hover!!');
//     console.log(event);
//     console.log(elements);
//     // const canvas = event.target;
//     // if (elements.length > 0) {
//     //   // Cambiar la imagen cuando se hace hover sobre un punto
//     //   canvas.style.cursor = 'pointer';
//     //   canvas.src = image; // Reemplaza 'imagen-hover.png' con la ruta de la imagen que deseas mostrar en hover
//     // } else {
//     //   // Restaurar la imagen cuando no se hace hover sobre un punto
//     //   canvas.style.cursor = 'default';
//     //   canvas.src = image; // Reemplaza 'imagen-normal.png' con la ruta de la imagen original del gráfico
//     // }
//   },
// };

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: mockedData,
//       tension: 0.5,
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       pointRadius: 5,
//       pointBorderColor: 'rgba(255, 99, 132)',
//       pointBackgroundColor: 'rgba(255, 99, 132)',
//     },
//   ],
// };

interface Props {
  deck: Partial<IDeck> | null;
  deckViews: IDeckView[] | null;
}

export default function LineChart({ deck, deckViews }: Props) {
  // const labels = [
  //   'Slide1',
  //   'Slide2',
  //   'Slide3',
  //   'Slide4',
  //   'Slide5',
  //   'Slide6',
  //   'Slide7',
  //   'Slide8',
  //   'Slide9',
  //   'Slide10',
  //   'Slide11',
  //   'Slide12',
  //   'Slide13',
  //   'Slide14',
  //   'Slide15',
  //   'Slide16',
  // ];
  // TODO maybe use Array.from here?
  const labels =
    deckViews &&
    deckViews[0].deckSlidesStats.map((slide) => {
      return `Slide ${slide.slideNumber}`;
    });

  const data =
    deckViews &&
    deckViews.reduce((accumulator, currentValue, currentIndex) => {
      return {
        ...accumulator,
        [currentIndex]: currentValue.deckSlidesStats,
      };
    }, {});

  // const mockedData = [2, 4, 5, 6, 8, 1, 6, 6, 7, 1, 10, 4, 6, 1, 5, 20]; // this will be the view time in seconds of each slide
  let auxMockedData: number[] = [];
  labels?.forEach((_slideName, index) => {
    Object.values(data!).forEach((slide) => {
      if (auxMockedData[index]) {
        auxMockedData[index] += (slide as [])[index]['viewingTime'];
      } else {
        auxMockedData[index] = (slide as [])[index]['viewingTime'];
      }
    });
  });
  const mockedData = auxMockedData.map(
    (totalMiliseconds) => totalMiliseconds / 1000 / Object.values(data!).length
  );
  // TODO maybe do this but in the last iteration of labels.forEach
  console.log('mockedData: ', mockedData);
  return (
    <div>
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart',
            },
            tooltip: {
              enabled: false,
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
          labels: labels as any,
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
