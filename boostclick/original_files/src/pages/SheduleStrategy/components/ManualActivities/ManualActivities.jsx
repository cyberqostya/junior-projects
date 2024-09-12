import { observer } from 'mobx-react';
import './ManualActivities.scss';
import MainStore from 'stores/MainStore';
import hearticon from 'assets/images/hearticon.svg';
import humanicon from 'assets/images/humanicon.svg';
import staricon from 'assets/images/staricon.svg';

export const ManualActivities = observer(() => {
  return (
    <div className="manualactivities">
      <div className="manualactivities__container">
        <div className="manualactivity">
          <span className="manualactivity__predigit">≈</span>
          <span className="manualactivity__digit">{MainStore.calculations.activityFavourites}</span>
          <span className="manualactivity__text">Активность в избранное <img src={hearticon} alt='descr' /></span>
        </div>
        <div className="manualactivity">
          <span className="manualactivity__predigit">≈</span>
          <span className="manualactivity__digit">{MainStore.calculations.activityMessages}</span>
          <span className="manualactivity__text">Активность контакты чат <img src={humanicon} alt='descr' /></span>
        </div>
        <div className="manualactivity">
          <span className="manualactivity__predigit">≈</span>
          <span className="manualactivity__digit">{MainStore.calculations.activitySubscribe}</span>
          <span className="manualactivity__text">Подписаться на&nbsp;продавца <img style={{ width: 16 }} src={staricon} alt='descr' /></span>
        </div>
      </div>
    </div>
  );
});