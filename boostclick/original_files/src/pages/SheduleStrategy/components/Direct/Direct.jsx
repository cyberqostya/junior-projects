import MainStore from 'stores/MainStore';
import { DirectForm } from '../DirectForm/DirectForm';
import { Messages } from '../Messages/Messages';
import ToggleText from '../ToggleText/ToggleText';
import './Direct.scss';
import { observer } from 'mobx-react';
import { TotalPrice } from 'components/TotalPrice/TotalPrice';
import Button from 'components/UI/Button/Button';
import getCookie from 'utils/getCookie';
import { Link } from 'react-router-dom';

export const Direct = observer(() => {

  function createProject() {
    const projectData = {
      title: MainStore.strategy.projectTitle,
      linkToAvitoAd: MainStore.linkToAvitoAd,
      category: MainStore.category,
      searchPhrases: MainStore.searchPhrases,
      country: MainStore.country,
      city: MainStore.city,
      activityQuantity: MainStore.calculations.activityQuantity,
      activityFavourites: MainStore.calculations.activityFavourites,
      activityMessages: MainStore.calculations.activityMessages,
      activitySubscribe: MainStore.calculations.activitySubscribe,
      activityPrice: MainStore.calculations.activityPrice,
      totalPrice: MainStore.strategy.totalPrice,

      reportsPriceIsActive: MainStore.calculations.reportsPriceIsActive,
      monitoringPriceIsActive: MainStore.calculations.monitoringPriceIsActive,
      seeNumberPriceIsActive: MainStore.calculations.seeNumberPriceIsActive,
      seePhotoPriceIsActive: MainStore.calculations.seePhotoPriceIsActive,
      showMapPriceIsActive: MainStore.calculations.showMapPriceIsActive,
      feedbackQuantity: MainStore.calculations.feedbackQuantity,

      // свойства от Стратегии размещения
      placement: MainStore.strategy.placement,
      isAutomaticActivityActive: MainStore.strategy.isAutomaticActivityActive,
      isArrivedMessagesActive: MainStore.strategy.isArrivedMessagesActive,
      isExternalTrafficActive: MainStore.strategy.isExternalTrafficActive,

      // TODO
      state: 1,
    };
    if (projectData.isArrivedMessagesActive) {
      projectData.arrivedMessage = MainStore.strategy.arrivedMessage;
    }
    if (projectData.isExternalTrafficActive) {
      projectData.directTitle = MainStore.strategy.directTitle;
      projectData.directDescription = MainStore.strategy.directDescription;
      projectData.directClickQuantity = MainStore.strategy.directClickQuantity;
    }
    if(projectData.placement === 'manual') {
      projectData.calendars = MainStore.strategy.calendars;
    }


    // Добавление проекта в Активные после оплаты
    const paidProjects = getCookie('paidProjects') ? JSON.parse(getCookie('paidProjects')) : [];
    paidProjects.push(projectData);
    document.cookie = `paidProjects=${JSON.stringify(paidProjects)};path=/;max-age=31536000`;
    // Удаление проекта из Черновики
    let projects = JSON.parse(getCookie('projects'));
    projects = projects.filter(i => i.title !== projectData.title);
    document.cookie = `projects=${JSON.stringify(projects)};path=/;max-age=31536000`;


    MainStore.reset();
    MainStore.strategy.reset();
  }

  return (
    <section className="direct">
      <ToggleText
        isActive={MainStore.strategy.isAutomaticActivityActive}
        handler={MainStore.strategy.switchAutomaticActivity}
        title="Автоматическая активность (активность при подъеме объявления)"
        info="Если вы используете платные услуги на Авито, то дополнительная одномоментная активность по объявлению может замедлить скорость опускания объявления и увеличить показы."
      />
      <Messages />
      <DirectForm />
      <div className="direct__total">
        <TotalPrice mode="left" totalPrice={MainStore.strategy.totalPrice} />
        <Link to="/projects">
          <Button title="Оплатить" classes={["wide"]} disabled={MainStore.strategy.payButtonIsDisabled} onClick={createProject} />
        </Link>
      </div>
    </section>
  );
})
