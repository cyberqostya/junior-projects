import { useState } from 'react';
import './Agreement.scss';

export default function Agreement(props) {
  const { isFull, className } = props;
  const text = <>Я согласен на обработку своих персональных данных согласно <a href='/' target='_blank'>политике конфиденциальности</a> {isFull && <>и с условиями <a href="/">оферты</a></>}</>;
  const [isChecked, setIsChecked] = useState(true);

  function changeChecked() {
    setIsChecked(!isChecked);
  }

  return(
    <div className={`agreement ${className || ''}`} onClick={changeChecked}>
      <div className={`agreement__checkbox${isChecked ? ' _checked' : ''}`}></div>
      <p className='agreement__checkbox-text'>{text}</p>
    </div>
  );
}