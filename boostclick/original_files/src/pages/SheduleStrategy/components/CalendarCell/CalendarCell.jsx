import './CalendarCell.scss';

export default function CalendarCell({ isTotal = false, onClick = () => { }, value = 0 }) {
  return (
    <button
      onClick={onClick}
      className={'calendarcell' + (value > 0 ? ' _active' : '') + (isTotal ? ' _total' : '')}
    >
      {value === 0 ? (isTotal ? '' : '-') : value}
    </button>
  );
}
