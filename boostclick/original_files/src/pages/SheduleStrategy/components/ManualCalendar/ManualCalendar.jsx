import { observer } from 'mobx-react';
import './ManualCalendar.scss';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarTimes from '../CalendarTimes/CalendarTimes';
import { CalendarFooter } from '../CalendarFooter/CalendarFooter';
import { CalendarCells } from '../CalendarCells/CalendarCells';
import { CalendarChart } from '../CalendarChart/CalendarChart';
import { useEffect, useRef, useState } from 'react';

export const ManualCalendar = observer(({ id }) => {
  // Анимация раскрытия
  const [isActive, setIsActive] = useState(true);
  function handler() { setIsActive(!isActive) }
  const calendarBody = useRef();
  const [calendarBodyStyle, setCalendarBodyStyle] = useState({});
  useEffect(() => {
    setCalendarBodyStyle({
      height: calendarBody.current.scrollHeight,
    });
  }, []);

  return (
    <>
      <div className="manualcalendar">
        <CalendarHeader isActive={isActive} handler={handler} />
        <div className="calendarbody" ref={calendarBody} style={isActive ? calendarBodyStyle : {}}>
          <CalendarTimes />
          <CalendarCells id={id} />
        </div>
        <CalendarFooter id={id} />
      </div>
      <CalendarChart id={id} />
    </>
  );
})