import './Plate.scss';

export default function Plate(props) {
  const { style, className = '' } = props;

  return (
    <div className={'plate ' + className} style={style}>
      {props.children}
    </div>
  );
}
