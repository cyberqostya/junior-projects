import FormInput from '../FormInput/FormInput';
import './Accordion.scss';
import { useState, useRef, useEffect } from 'react';

export default function Accordion(props) {
  const { title, className } = props;
  const [accIsOpen, setAccIsOpen] = useState(props.isOpen || false);
  const field = useRef();

  function changeIsOpen() {
    setAccIsOpen(!accIsOpen);
  }

  useEffect(() => {
    accIsOpen ? 
      field.current.style.height = field.current.scrollHeight + 'px' :
      field.current.style.height = 0;
  },[accIsOpen]);

  return(
    <div className={`accordion ${className || ''}`}>
      <h4 className={`accordion__title ${accIsOpen ? '_active' : ''}`} onClick={changeIsOpen}>{title}</h4>
      <div 
        ref={field}
        className={`accordion__field ${accIsOpen ? '_active' : ''}`}
      >
        <FormInput type='text' placeholder='Фамилия' className='accordion__input' />
        <FormInput type='text' placeholder='Имя' className='accordion__input' />
        <FormInput type='text' placeholder='Отчество' className='accordion__input' />
        <FormInput type='text' placeholder='Дата рождения' className='accordion__input' />
        <FormInput type='text' placeholder='Серия и номер паспорта' className='accordion__input' />
        <FormInput type='text' placeholder='Когда выдан' className='accordion__input' />
        <FormInput type='text' placeholder='Кем выдан' className='accordion__input' />
      </div>
    </div>
  );
}