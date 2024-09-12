import { observer } from 'mobx-react';
import './CalendarCells.scss';
import MainStore from 'stores/MainStore';
import CalendarCell from '../CalendarCell/CalendarCell';

export const CalendarCells = observer(({ id }) => {
  return (
    <div className="calendarcells">
      {MainStore.strategy.calendars[id].week.map((day, daySerialNumber) => (
        <div key={daySerialNumber} className="calendarcells__column" >

          {day.map((activity, activitySerialNumber) => (
            <div key={activitySerialNumber} className="calendarcells__subcolumn" >

              {activity.map((counter, timeSerialNumber) => (
                <CalendarCell value={counter} key={timeSerialNumber} onClick={() => {
                  MainStore.strategy.cellHandler(id, daySerialNumber, activitySerialNumber, timeSerialNumber);
                }} />
              ))}

            </div>
          ))}

        </div>
      ))}
    </div>
  );
})