import './TableHead.scss';
import hearticon from 'assets/images/hearticon.svg';
import humanicon from 'assets/images/humanicon.svg';
import staricon from 'assets/images/staricon.svg';
import yandexicon from 'assets/images/yandexicon.svg';

export default function TableHead({ paidProjects = false }) {
  return (
    <div className={'tablehead' + (paidProjects ? ' _paid' : '')}>
      <div className="_bold">{paidProjects ? 'Активные проекты' : 'Черновики'}</div>
      <div>URL</div>
      <div>Статус</div>

      {paidProjects && <div>Стратегия</div>}

      <div><img style={{ width: 16 }} src={hearticon} alt='heart' /></div>
      <div><img style={{ height: 17 }} src={humanicon} alt='human' /></div>
      <div><img src={staricon} alt='star' /></div>

      {paidProjects && <div><img style={{ width: 20 }} src={yandexicon} alt='yandex' /></div>}

      {!paidProjects && <div className='_price'>Сумма</div>}

      <div></div>
    </div>
  );
}