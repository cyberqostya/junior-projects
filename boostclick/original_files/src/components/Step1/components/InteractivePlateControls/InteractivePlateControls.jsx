import Plate from 'components/UI/Plate/Plate';
import InteractiveTDB from '../InteractiveTDB/InteractiveTDB';
import hearticon from 'assets/images/hearticon.svg';
import humanicon from 'assets/images/humanicon.svg';
import staricon from 'assets/images/staricon.svg';
import { InteractiveMB } from '../../../InteractiveMB/InteractiveMB';
import FAQ from 'components/UI/FAQ/FAQ';
import InteractiveToggler from '../InteractiveToggler/InteractiveToggler';
import './InteractivePlateControls.scss';
import { TotalPrice } from 'components/TotalPrice/TotalPrice';
import MainStore from 'stores/MainStore';
import { observer } from 'mobx-react';

export const InteractivePlateControls = observer(() => {
  const plateStyle = {
    padding: '25px 60px 48px',
    gridArea: 'b',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Plate style={plateStyle}>
      <InteractiveTDB
        title="Видимость по запросам"
        digit={MainStore.calculations.vision}
        digitafter="%"
        info="Примерный и условный коэффицент, который показывает, как и какая активность на объявлении повлияет на видимость по поисковым запросам в Авито относительно к объявлениям без активностей.
        При расчете коэффицента и пропорций активности используются данные тематики объявления и конкуренции в ниши, учитывается количество просмотров и скорость добавления объявлений.
        В некоторых не конкурентных тематиках данные могут быть не точными.
        Если вы сомневаетесь в данных, то рекомендуем начинать с минимальной активности."
        barWidth={MainStore.calculations.vision}
      />
      <InteractiveTDB
        title="Активность в избранное"
        digit={MainStore.calculations.activityFavourites}
        icon={hearticon}
        info="Минимальное количество активностей по добавлению в избранное, параметр относится к поведенческим фактором.
        Объявления, которые добавляются в избранное могут более медленно опускаться по поисковым запросам в Авито.
        Отчет можно увидеть в личном кабинете."
        barWidth={MainStore.calculations.barFavouritesWidth}
      />
      <InteractiveTDB
        title="Активность контакты чат"
        digit={MainStore.calculations.activityMessages}
        icon={humanicon}
        info="Минимальное количество активностей в личном чате с контактными данными, параметр относится к поведенческим фактором.
        Объявления по которым пишут чаще (относительно конкурентов) могут более медленно опускаться по поисковым запросам в Авито.
        Отчет можно увидеть в личном кабинете."
        barWidth={MainStore.calculations.barMessagesWidth}
      />
      <InteractiveTDB
        title="Подписаться на продавца"
        digit={MainStore.calculations.activitySubscribe}
        icon={staricon}
        info="Минимальное количество активностей по подписке на продавца. Данный поведенческий фактор повышает доверие со стороны площадки и положительно влияет при комплексном продвижении.
        Отчет можно увидеть в личном кабинете."
        barWidth={MainStore.calculations.barSubscribeWidth}
      />

      <div className="interactiveMB__container">
        <InteractiveMB
          title="Стоимость активностей"
          min={MainStore.calculations.minActivityPrice}
          max={MainStore.calculations.maxActivityPrice}
          minBar={MainStore.calculations.activityQuantityMin}
          maxBar={MainStore.calculations.activityQuantityMax}
          currency="₽"
          firstTextCurrency="₽"
          firstpreprice="от "
          secondpreprice="до "
          price={MainStore.calculations.activityPrice}
          pieces={MainStore.calculations.activityQuantity}
          secondTextCurrency="действий"
          handler={MainStore.calculations.setActivityQuantity}
          value={MainStore.calculations.activityQuantity}
        />
        <FAQ text="Стоимость и рекомендованное количество действий по объявлению с учетом пропорций действий для выбранной категории." />
      </div>

      <InteractiveToggler
        style={{display: 'none'}}
        title="Отчеты исполнителей"
        isActive={MainStore.calculations.reportsPriceIsActive}
        price={MainStore.calculations.REPORTS_PRICE}
        handler={MainStore.calculations.switchReportsPriceIsActive}
      />
      <InteractiveToggler
        style={{display: 'none'}}
        title="Мониторинг позиций"
        isActive={MainStore.calculations.monitoringPriceIsActive}
        price={MainStore.calculations.MONITORING_PRICE}
        handler={MainStore.calculations.switchMonitoringPriceIsActive}
      />
      <InteractiveToggler
        title="Посмотреть номер (без звонка)"
        isActive={MainStore.calculations.seeNumberPriceIsActive}
        price={MainStore.calculations.SEE_NUMBER_PRICE}
        handler={MainStore.calculations.switchSeeNumberPriceIsActive}
      />
      <InteractiveToggler
        title="Просмотреть все фото дольше конкурентов"
        isActive={MainStore.calculations.seePhotoPriceIsActive}
        price={MainStore.calculations.SEE_PHOTO_PRICE}
        handler={MainStore.calculations.switchSeePhotoPriceIsActive}
      />
      <InteractiveToggler
        title="Нажать показать на карте"
        isActive={MainStore.calculations.showMapPriceIsActive}
        price={MainStore.calculations.SHOW_MAP_PRICE}
        handler={MainStore.calculations.switchShowMapPriceIsActive}
      />

      <div className="interactiveMB__container">
        <InteractiveMB
          title="Отзывы"
          min={0}
          max={3}
          price={MainStore.calculations.feedbackTotalPrice}
          pieces={MainStore.calculations.feedbackQuantity}
          handler={MainStore.calculations.setFeedbackQuantity}
          firstTextCurrency="₽"
          secondTextCurrency="шт."
          value={MainStore.calculations.feedbackQuantity}
        />
        <FAQ
          text="Количество отзывов на аккаунте с объявления. Отзывы могут повышать доверие со стороны пользователей и площадки. С одного объявления не больше трех отзывов за один рекламный период.
Отчет можно увидеть в личном кабинете."
        />
      </div>

      <TotalPrice />
    </Plate>
  );
});
