import './Header.scss';
import logo from 'assets/images/logo.svg';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';
import { Link, useLocation } from 'react-router-dom';
import DropDownMenu from 'components/DropDownMenu/DropDownMenu';
import { useEffect, useState } from 'react';

export default function Header() {
  // Ссылки на страницы
  const buttons = [
    {
      title: 'Услуги',
      link: '/',
    },
    {
      title: 'Мои проекты',
      link: '/projects',
    },
  ];
  const location = useLocation();

  // Выпадающее меню
  const [dropDownMenuIsActive, setDropDownMenuIsActive] = useState(false);
  function openDropDownMenu() {
    setDropDownMenuIsActive(true);
  }
  const closeDropDownMenu = () => {
    setDropDownMenuIsActive(false);
  };
  useEffect(() => {
    if(document.querySelector('.dropdownmenu')) {
      document.body.addEventListener('click', (e) => {
        if (
          (!e.target.closest('.dropdownmenu') &&
            !e.target.closest('.header__user') &&
            document.querySelector('.dropdownmenu').className.includes('_active')) ||
          e.target.closest('.dropdownmenu__link')
        ) {
          closeDropDownMenu();
        }
      });
    }
  }, []);

  return (
    <header className="header">
      <div
        className="header__inner"
        style={
          location.pathname !== '/login' ? {} : { justifyContent: 'center' }
        }
      >
        <a href="https://aggo.ru/">
          <img src={logo} alt="logo" className="header__logo" />
        </a>

        {location.pathname !== '/login' && (
          <>
            {buttons.map((i, ind) => (
              <Link
                to={i.link}
                key={ind}
                className={
                  'header__link' +
                  (location.pathname === i.link ? ' _active' : '')
                }
              >
                {i.title}
              </Link>
            ))}

            <a href="#answers" className="header__link">
              Обучение
            </a>

            <div className="header__auth-container">
              {MainStore.isAuth ? (
                <div className="header__user" onClick={openDropDownMenu}>
                  <span>Илья</span>
                  <DropDownMenu
                    isActive={dropDownMenuIsActive}
                    closeDropDownMenu={setDropDownMenuIsActive}
                  />
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      title="Вход"
                      classes={['small']}
                      onClick={() => {
                        MainStore.setIsFormModeLogin(true);
                      }}
                    />
                  </Link>
                  <Link to="/login">
                    <Button
                      title="Регистрация"
                      classes={['outlined', 'small']}
                      onClick={() => {
                        MainStore.setIsFormModeLogin(false);
                      }}
                    />
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
