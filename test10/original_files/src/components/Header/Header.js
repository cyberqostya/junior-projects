import './Header.scss';
import logo from '../../assets/images/logo.svg';
import logoMob from '../../assets/images/logo_mob.svg';
import { useState } from 'react';

export default function Header() {
  const [isPhonesActive, setIsPhonesActive] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  function phoneActivate(e) { 
    e.stopPropagation();
    setIsPhonesActive(true);
    document.body.addEventListener('click', phoneDeactivate);
  }
  function phoneDeactivate(e) {
    if(!e.target.closest('.header__phones-container')) {
      setIsPhonesActive(false);
      document.body.removeEventListener('click', phoneDeactivate);
    }    
  }

  function burgerActivate() {
    setIsBurgerActive(true);
  }
  function burgerDeactivate() {
    setIsBurgerActive(false);
  }


  return(
    <header className="header">
      <a className="header__logo-link" href="/">
        <img src={document.body.clientWidth > 650 ? logo : logoMob} className="header__logo" alt="logotype" />
      </a>

      <div className={`header__data ${isBurgerActive ? '_active' : ''}`}>
        <button className="header__close" onClick={burgerDeactivate}></button>
        <div className="header__phone-block">
          <span className="header__phone-text" onClick={phoneActivate}>8 (812) 309-26-66</span>
          <div className={`header__phones-container ${isPhonesActive ? '_active' : ''}`}>
            <a className="header__phone" href="tel:+78123092666">8 (812) 309-26-66</a>
            <a className="header__phone" href="tel:+78123092666">8 (812) 309-26-66</a>
          </div>
        </div>

        <a className="header__login" href="/">Войти</a>
      </div>

      <button className="header__burger" onClick={burgerActivate}></button>
    </header>
  );
}