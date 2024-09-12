import { useState } from 'react';
import Plate from '../Plate/Plate';
import './FAQ.scss';

export default function FAQ(props) {
  const { style, text } = props;

  const [platestyle, setPlatestyle] = useState({
    position: 'absolute',
    padding: '14px',
    bottom: 'calc(100% + 12px)',
    left: 'calc((-185px + 17px) / 2)',
    width: '185px',
    borderRadius: '10px',
    transition: 'all 0.3s',
    opacity: 0,
  });

  const [isActive, setIsActive] = useState(false);
  function activate() {
    setIsActive(true);
    setTimeout(() => {
      setPlatestyle({ ...platestyle, opacity: 1 });
    }, 1);
  }
  function deactivate() {
    setPlatestyle({ ...platestyle, opacity: 0 });
    setTimeout(() => {
      setIsActive(false);
    }, 300);
  }

  return (
    <div
      className="faq"
      style={style}
      onMouseOver={activate}
      onMouseLeave={deactivate}
    >
      {isActive && (
        <Plate style={platestyle}>
          <p className="faq__text">{text}</p>
        </Plate>
      )}
    </div>
  );
}
