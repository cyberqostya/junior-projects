import MainStore from 'stores/MainStore';
import './CalendarTimes.scss';

export default function CalendarTimes() {
  return (
    <div className="calendartimes">
      {MainStore.strategy.times.map((i, key) => (
        <p className="calendartimes__time" key={key}>{i}</p>
      ))}
    </div>
  );
}