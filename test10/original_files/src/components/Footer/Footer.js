import './Footer.scss';
import vk from '../../assets/images/vk.svg';
import ok from '../../assets/images/ok.svg';
import tg from '../../assets/images/tg.svg';

export default function Footer() {
  return(
    <footer className='footer'>

      <div className='footer__contacts'>
        <p className='footer__contacts-text'>Горячая лииня</p>
        <a href='tel:+78003339963' className='footer__contacts-text _phone'>8 800 333 99 63</a>
        <a href='mailto:info@sletat.ru' className='footer__contacts-text _email'>info@sletat.ru</a>
      </div>

      <div className='footer__navigation'>
        <nav className='footer__nav'>
          <div className='footer__nav-couple'>
            <a href="/" className='footer__nav-link'>Поиск тура</a>
            <a href="/" className='footer__nav-link'>О компании</a>
          </div>
          <div className='footer__nav-couple'>
            <a href="/" className='footer__nav-link'>Travel блог</a>
            <a href="/" className='footer__nav-link'>Новости</a>
          </div>
          <div className='footer__nav-couple'>
            <a href="/" className='footer__nav-link'>Партнерам</a>
            <a href="/" className='footer__nav-link'>Контакты</a>
          </div>
        </nav>
        <p className='footer__copyright'>
          © 2022 Все права защищены. Используя сайт, вы принимаете условия соглашений :<br/>
          Пользовательское соглашение<br/>
          Об ограничении ответственности<br/>
          Об обработке персональных данных<br/>
          Информация на сайте не является публичной офертой: условия сотрудничества. Результаты проведения СОУТ.<br/>
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>

      <div className='footer__social'>
        <a target='_blank' href='https://vk.com/' className='footer__social-link'><img src={vk} alt='social-icon' className='footer__social-icon _vk' /></a>
        <a target='_blank' href='https://ok.ru/' className='footer__social-link'><img src={ok} alt='social-icon' className='footer__social-icon _ok' /></a>
        <a target='_blank' href='https://web.telegram.org/' className='footer__social-link'><img src={tg} alt='social-icon' className='footer__social-icon _tg' /></a>
      </div>

    </footer>
  );
}