import Toggler from 'components/UI/Toggler/Toggler';
import './InteractiveToggler.scss';

export default function InteractiveToggler({ title, isActive, price, handler, style = {} }) {
  return (
    <div className="interactivetoggler" style={style}>
      <Toggler isActive={isActive} handler={handler} />
      <p className="interactivetoggler__title">{title}</p>
      <p className="interactivetoggler__price">
        {price !== 0 ? price + ' ₽' : 'Бесплатно'}
      </p>
    </div>
  );
}
