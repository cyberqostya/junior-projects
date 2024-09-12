import FAQ from 'components/UI/FAQ/FAQ';
import './InteractiveTDB.scss';

export default function interactiveTDB(props) {

  const faqstyle = {
    position: 'absolute',
    right: 0,
    top: 'calc((100% - 17px) / 2)',
  };

  return (
    <div className="interactiveTDB">
      <div className="interactiveTDB__title-container">
        <p className="interactiveTDB__title">{props.title}</p>
        {props.icon && <img src={props.icon} alt="icon" />}
      </div>
      <div className="interactiveTDB__container">
        <p className="interactiveTDB__digit">
          <span>≈</span>
          <span>{props.digit}</span>
          <span>{props.digitafter && props.digitafter}</span>
        </p>
        <div className="interactiveTDB__bar">
          <div style={{ width: `${props.barWidth}%` }} className="interactiveTDB__bar-progress"></div>
        </div>
        <FAQ style={faqstyle} text={props.info} />
      </div>
    </div>
  );
}
