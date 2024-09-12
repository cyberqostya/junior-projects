import { Link } from 'react-router-dom';
import './DropDownMenu.scss';
import MainStore from 'stores/MainStore';
import Button from 'components/UI/Button/Button';

export default function DropDownMenu({ isActive }) {
  return (
    <div className={"dropdownmenu" + (isActive ? " _active" : "")}>
      <div className="dropdownmenu__balance-container">
        <div className="dropdownmenu__balance">
          <p className="dropdownmenu__balance-text">Баланс</p>
          <p className="dropdownmenu__balance-digit">7337 ₽</p>
        </div>
        <Button style={{ padding: '0 35px', fontSize: 14, lineHeight: '17px' }} title="Пополнить" classes={['small']} />
      </div>
      <Link to="/projects" className="dropdownmenu__link">Мои проекты</Link>
      <Link to="/projects" className="dropdownmenu__link">Расходы</Link>
      <Link to="/projects" className="dropdownmenu__link">Добавить проект</Link>
      <Link to="/login" className="dropdownmenu__link">Настройки</Link>
      <Link to="/login" className="dropdownmenu__link" onClick={() => { MainStore.setIsAuth(false) }}>Выход</Link>
    </div>
  );
}