import { observer } from 'mobx-react';
import './CalendarChart.scss';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import MainStore from 'stores/MainStore';

export const CalendarChart = observer(({ id }) => {
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

  return (
    <div className="calendarchart">
      <Line
        datasetIdKey='id'
        data={{
          labels: ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'],
          datasets: [
            {
              id: 1,
              data: MainStore.strategy.calendars[id].activitySumms.map((i, key) => i.reduce((acc, item) => (acc + item), 0)),
              backgroundColor: '#FED40030',
              borderColor: '#FED400',
              fill: true,
              cubicInterpolationMode: 'monotone',
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Время',
                align: 'end'
              },
              grid: {
                display: false,
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Активность',
                align: 'end',
              },
              grid: {
                display: false,
              },
              min: 0,
            }

          }
        }}
      />
    </div>
  );
});