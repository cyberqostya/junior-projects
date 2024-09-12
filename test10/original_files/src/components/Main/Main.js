import TourData from '../TourData/TourData';
import Accordion from '../UI/Accordion/Accordion';
import FormInput from '../UI/FormInput/FormInput';
import './Main.scss';
import { convertPrice } from '../../utils';
import Agreement from '../UI/Agreement/Agreement';
import Button from '../UI/Button/Button';

export default function Main() {
  const price = 100000;
  const multiplier = 2;

  return(
    <main className='main'>
      <div className='main__inner'>
        <h2 className='main__title'>Бронирование тура</h2>

        <form className='main__form'>
          <h3 className='main__form-title'>Данные покупателя</h3>
          <div className='main__input-field'>
            <FormInput type="email" placeholder="Email" />
            <FormInput type="tel" placeholder="Телефон" />
          </div>

          <h3 className='main__form-title'>Информация о туристах</h3>
          <p className='main__form-text'>Пусть это заполнят твои двуногие</p>

          <Accordion title='Данные о первом двуногом' className='main__accordion' isOpen={true} />
          <Accordion title='Данные о втором двуногом' className='main__accordion' />

          <div className='main__form-end'>
            <div className='main__form-end-price-container'>
              <p className='main__form-end-text'>К оплате</p>
              <p className='main__form-end-price'>{ convertPrice(price * multiplier) } <span>₽</span></p>
            </div>
            <div className='main__form-end-agreement-container'>
              <Button text='Забронировать' className='main__form-button' />
              <Agreement isFull={true} className='main__form-end-agreement' />
            </div>
          </div>
        </form>

        <aside className='main__aside'>
          <TourData price={price} multiplier={multiplier} className='main__tourdata' />
          <p className='main__needhelp-title'>Нужна помощь?</p>
          <a href='tel:+78003339963' className='main__needhelp-phone'>8 800 333 99 63</a>
        </aside>
      </div>
    </main>
  );
}