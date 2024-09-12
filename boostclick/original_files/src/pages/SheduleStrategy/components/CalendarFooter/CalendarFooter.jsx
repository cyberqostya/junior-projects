import { observer } from 'mobx-react';
import './CalendarFooter.scss';
import CalendarCell from '../CalendarCell/CalendarCell';
import MainStore from 'stores/MainStore';

export const CalendarFooter = observer(({ id }) => {
  return (
    <div className="calendarfooter">
      <div className="calendarfooter__total-row">
        <p>Сумма:</p>
        {
          MainStore.strategy.calendars[id].activitySumms.map((day, key) => (
            <div key={key} className="calendarfooter__column" >

              {day.map((activity, key) => <CalendarCell key={key} isTotal={true} value={activity} />)}

            </div>
          ))}
      </div>
      <div className="calendarfooter__day-row">
        {['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'].map((i, key) => (
          <p key={key} className="calendarfooter__day-column">{i}</p>
        ))}
      </div>
    </div>
  );
})