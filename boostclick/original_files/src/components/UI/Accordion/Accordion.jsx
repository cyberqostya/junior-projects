import { useEffect, useRef, useState } from 'react';
import './Accordion.scss';

export default function Accordion(props) {
  const { title, text } = props;

  const [isActive, setIsActive] = useState(false);
  function handler() {
    setIsActive(!isActive);
  }

  const ref = useRef();
  const [textStyle, setTextStyle] = useState({});
  useEffect(() => {
    setTextStyle({
      paddingBottom: '30px',
      height: ref.current.scrollHeight,
    });
  }, []);

  return (
    <div
      className={'accordion ' + (isActive ? '_active' : '')}
      onClick={handler}
    >
      <p className="accordion__title">{title}</p>
      <div
        ref={ref}
        className="accordion__text"
        style={isActive ? textStyle : {}}
        dangerouslySetInnerHTML={{ __html: text }}
      >
      </div>
    </div>
  );
}
