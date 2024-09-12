import './Toggler.scss';

export default function Toggler({ isActive, handler }) {
  return (
    <button className={'toggler ' + (isActive ? '_active' : '')} onClick={handler}>
      <div className="toggler__thumb"></div>
    </button>
  );
}
