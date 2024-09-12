import './Button.scss';

export default function Button(props) {
  const { text, className } = props;

  return(
    <button className={`button ${className || ''}`}>{text}</button>
  );
}