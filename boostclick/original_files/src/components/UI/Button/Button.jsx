import './Button.scss';

export default function Button({ title, classes = [], style = {}, onClick = () => { }, disabled = false }) {
  // classes: [outlined, small, wide]

  return (
    <button disabled={disabled} style={style} className={'button ' + classes.join(' ')} onClick={onClick}>
      {title}
    </button>
  );
}
