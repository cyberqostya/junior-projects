import './SelectTag.scss';

export default function SelectTag({ title }) {
  return (
    <div className="select__tag">
      <p className="select__tag-title">{title}</p>
      <button className="select__tag-close"></button>
    </div>
  );
}
