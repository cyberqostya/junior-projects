import './PhraseTag.scss';

export default function PhraseTag({ title }) {
  return (
    <div className="phrase__tag">
      <p className="phrase__tag-title">{title}</p>
      <button className="phrase__tag-close"></button>
    </div>
  );
}
