import './TourData.scss';
import dog from '../../assets/images/dogicon.svg';
import Tag from '../UI/Tag/Tag';
import { convertPrice } from '../../utils';

export default function TourData(props) {
  const { price, multiplier, className } = props;

  return(
    <section className={`tourdata ${className || ''}`}>

      <Tag title="Групповой" image={dog} counter={10} />
      <h3 className='tourdata__title'>Сёрф-тур для хороших мальчиков</h3>
      
      <div className='tourdata__info-couple-container'>
        <div className='tourdata__info-couple'>
          <p className='tourdata__info _location'>Аэропорт Хайнань</p>
          <p className='tourdata__info _duration'>3 дня / 4 ночи</p>
        </div>
        <div className='tourdata__info-couple'>
          <p className='tourdata__info _date'>31 сентября&nbsp;<span className='_weekday'>пн</span>&nbsp;— 5 ноября&nbsp;<span className='_weekend'>вс</span></p>
          <p className='tourdata__info _animals'>1 пёс + 2 человека</p>
        </div>
      </div>
      
      <a href='/' className='tourdata__link'>Ввести промокод</a>
      <hr className='tourdata__breakline'/>

      <div className='tourdata__price-container'>
        <span className='tourdata__price-title'>Стоимость тура&nbsp;</span>
        <span className='tourdata__price'>{ convertPrice(price) } ₽ x {multiplier}</span>
      </div>
      <div className='tourdata__price-container _total'>
        <span className='tourdata__price-title _total'>Итого к оплате&nbsp;</span>
        <span className='tourdata__price _total'>{ convertPrice(price * multiplier) } ₽</span>
      </div>

      <div></div>
    </section>
  );
}