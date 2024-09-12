import './CalendarHeader.scss';
import hearticon from 'assets/images/hearticon-grey.svg';
import humanicon from 'assets/images/humanicom-grey.svg';
import staricon from 'assets/images/staricon-grey.svg';

export default function CalendarHeader({ isActive, handler }) {
  return (
    <div className={"calendarheader" + (isActive ? " _active" : "")}>
      <button className="calendarheader__roll" onClick={handler}></button>
      {Array(7).fill().map((_, key) => (
        <div key={key} className="calendarheader__column" >
          <div><img src={hearticon} alt="columntype" /></div>
          <div><img src={humanicon} alt="columntype" /></div>
          <div><img src={staricon} alt="columntype" /></div>
        </div>
      ))}
    </div >
  );
}