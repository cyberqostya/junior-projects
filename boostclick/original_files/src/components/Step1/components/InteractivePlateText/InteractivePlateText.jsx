import Plate from 'components/UI/Plate/Plate';
import './InteractivePlateText.scss';

export default function InteractivePlateText() {
  const plateStyle = {
    padding: '25px 60px',
    gridArea: 'a',
    width: '100%',
  };

  return (
    <Plate style={plateStyle}>
      <ul className="interactive__list">
        <li className="interactive__list-item">
          Разместите объявление на Авито с учетом SEO правил
        </li>
        <li className="interactive__list-item">
          Если объявление размещено, то активируйте платный подъем объявлений
          или сделайте перезалив
        </li>
        <li className="interactive__list-item">
          Копируйте ссылку на ваше объявление и переходите на&nbsp;шаг 2,
          разместив ее в поле ниже
        </li>
      </ul>
    </Plate>
  );
}
