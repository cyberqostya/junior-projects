import "./SheduleStrategy.scss";
import Plate from "components/UI/Plate/Plate";
import { useEffect, useState } from "react";
import { ButtonToggler } from "components/UI/ButtonToggler/ButtonToggler";
import List from "./components/List/List";
import { Direct } from "./components/Direct/Direct";
import Answers from "components/Answers/Answers";
import { useParams } from "react-router-dom";
import getCookie from "utils/getCookie";
import MainStore from "stores/MainStore";
import { InteractiveMB } from "components/InteractiveMB/InteractiveMB";
import FAQ from "components/UI/FAQ/FAQ";
import { ManualActivities } from "./components/ManualActivities/ManualActivities";
import { ManualCalendar } from "./components/ManualCalendar/ManualCalendar";
import { observer } from "mobx-react";
import Button from 'components/UI/Button/Button';
import copy from "utils/copy";

export const SheduleStrategy = observer(() => {
  // Прокрутка вверх страницы
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const plateStyle = {
    padding: 60,
    width: "100%",
  };

  // Переключатель "Авто AI / Ручной PRO"
  const [tabs, setTabs] = useState([
    {
      title: "Авто AI",
      isActive: MainStore.strategy.placement === "auto",
      name: "auto",
    },
    {
      title: "Ручной PRO",
      isActive: MainStore.strategy.placement === "manual",
      name: "manual",
    },
  ]);
  const togglerStyle = {
    marginBottom: 60,
    backgroundColor: "#f9f9fb",
  };
  function buttonsHandler(e) {
    const clone = copy(tabs);
    clone.forEach((i) => {
      if (i.title === e.target.textContent) {
        MainStore.strategy.setPlacement(i.name);
        i.isActive = true;
      } else {
        i.isActive = false;
      }
    });
    setTabs(clone);
  }

  // Получение объекта с сервера, который будем редактировать (дополнять)
  const projectId = useParams().id;
  const [currentProject, setCurrentProject] = useState(null);
  useEffect(() => {
    // Сброс предыдущих введённых данных
    MainStore.strategy.reset();
    setTabs([
      {
        title: "Авто AI",
        isActive: true,
        name: "auto",
      },
      {
        title: "Ручной PRO",
        isActive: false,
        name: "manual",
      },
    ]);

    
    const projects = JSON.parse(getCookie("projects"));
    const data = projects.find((i) => i.title.replace(/\D/g, "") === projectId);

    if (data) {
      setCurrentProject(data);
      MainStore.strategy.setProjectTitle(data.title);

      MainStore.setLinkToAvitoAd(data.linkToAvitoAd);
      // MainStore.setCategory(data.category); - перемещен вниз для логики срабатывания
      MainStore.setSearchPhrases(data.searchPhrases);
      MainStore.setCountry(data.country);
      MainStore.setCity(data.city);

      MainStore.calculations.setReportsPriceIsActive(data.reportsPriceIsActive);
      MainStore.calculations.setMonitoringPriceIsActive(
        data.monitoringPriceIsActive
      );
      MainStore.calculations.setSeeNumberPriceIsActive(
        data.seeNumberPriceIsActive
      );
      MainStore.calculations.setSeePhotoPriceIsActive(
        data.seePhotoPriceIsActive
      );
      MainStore.calculations.setShowMapPriceIsActive(data.showMapPriceIsActive);
      MainStore.calculations.setFeedbackQuantity(data.feedbackQuantity);

      // setCategory вызывает calculate()
      MainStore.setCategory(data.category);
      MainStore.calculations.setActivityQuantity(data.activityQuantity);
    }
  }, []);

  // Обработчик ползунка активностей
  // Прибавлять можно
  // убавлять - все стирается
  function interactiveMBhandler(value) {
    // Уменьшаем ползунок
    if (+value < +MainStore.calculations.activityQuantity) {
      MainStore.strategy.resetCalendars();
    }
    MainStore.calculations.setActivityQuantity(value);
    MainStore.strategy.setDirectClickQuantity();
  }

  return (
    <>
      <section className='projects'>
        <div className='projects__inner'>
          <h2 className='projects__title'>Стратегия размещения</h2>

          <Plate style={plateStyle}>
            {currentProject ? (
              <>
                <div className='projects__upper-container'>
                  <ButtonToggler
                    buttons={tabs}
                    style={togglerStyle}
                    onClick={buttonsHandler}
                  />

                  {MainStore.strategy.placement === "manual" && (
                    <>
                      <InteractiveMB
                        title='Стоимость активностей'
                        min={MainStore.calculations.minActivityPrice}
                        max={MainStore.calculations.maxActivityPrice}
                        minBar={MainStore.calculations.activityQuantityMin}
                        maxBar={MainStore.calculations.activityQuantityMax}
                        firstpreprice='от '
                        secondpreprice='до '
                        currency='₽'
                        firstTextCurrency='₽'
                        price={MainStore.calculations.activityPrice}
                        pieces={MainStore.calculations.activityQuantity}
                        secondTextCurrency='действий'
                        handler={interactiveMBhandler}
                        value={MainStore.calculations.activityQuantity}
                        style={{ maxWidth: "none" }}
                      />
                      <div className='projects__upper-text-container'>
                        <p className='projects__upper-text'>
                          Выберите расписание действий
                        </p>
                        <FAQ text='В режиме "Ручной PRO" необходимо самостоятельно распределить весь пакет активностей по времени. Учитывайте при распределение активность вашей аудитории и покупку платных услуг на Авито.' />
                      </div>
                    </>
                  )}
                </div>

                {MainStore.strategy.placement === "auto" && <List />}

                {MainStore.strategy.placement === "manual" && (
                  <>
                    <ManualActivities />
                    {MainStore.strategy.calendars.map((_, key) => (
                      <ManualCalendar key={key} id={key} />
                    ))}
                    <Button title="Добавить неделю" classes={['outlined']} onClick={MainStore.strategy.addCalendar} style={{margin: '0 auto 40px'}} />
                  </>
                )}

                <Direct />
              </>
            ) : (
              <p style={{ textAlign: "center", fontSize: 22 }}>
                Проекта не существует
              </p>
            )}
          </Plate>
        </div>
      </section>
      <Answers />
    </>
  );
});
