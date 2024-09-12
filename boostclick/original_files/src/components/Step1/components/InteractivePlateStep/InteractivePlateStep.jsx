import Plate from 'components/UI/Plate/Plate';
import {TextInput} from 'components/UI/TextInput/TextInput';
import './InteractivePlateStep.scss';
import FAQ from 'components/UI/FAQ/FAQ';
import SelectInput from '../SelectInput/SelectInput';
import { Phrase } from '../Phrase/Phrase';
import Button from 'components/UI/Button/Button';
import MainStore from 'stores/MainStore';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getCookie from 'utils/getCookie';

export const InteractivePlateStep = observer(() => {
  const plateStyle = {
    padding: '48px 60px',
    gridArea: 'c',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const countryStyle = { marginTop: 30 };
  const cityStyle = { marginTop: 20, marginBottom: 30 };

  // Для FAQ
  const categoryfaqstyle = {
    marginLeft: 'auto',
  };
  const categoryfaqtext = "Укажите категорию в которой находится ваше объявление, так его будет легче найти.";
  const searchPhrasesfaqtext = "Укажите до четырех поисковых фраз, по которым вы хотите получить больше активностей. Больше четырех фраз нельзя добавить, так как может быть переспам объявления, что негативно скажется на позициях.";
  const cityfaqtext = "На одно объявление можно выбрать один город. Город должен совпадать с городом указанным в объявлении Авито.";

  // Стили кнопки "создать"
  const buttonStyle = {
    margin: 'auto auto 0',
  };

  // Запись созданного проекта на сервер
  const navigate = useNavigate();
  function createProject() {

    // Не прошли валидацию
    if(!MainStore.checkValidation()) {
      return;
    }

    const projectData = {
      title: `Активность в Авито (№${Math.round(100000 + Math.random() * 899999)})`,
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
      totalPrice: MainStore.calculations.totalPrice,

      reportsPriceIsActive: MainStore.calculations.reportsPriceIsActive,
      monitoringPriceIsActive: MainStore.calculations.monitoringPriceIsActive,
      seeNumberPriceIsActive: MainStore.calculations.seeNumberPriceIsActive,
      seePhotoPriceIsActive: MainStore.calculations.seePhotoPriceIsActive,
      showMapPriceIsActive: MainStore.calculations.showMapPriceIsActive,
      feedbackQuantity: MainStore.calculations.feedbackQuantity,

      state: 'Ждёт оплаты',
    };
    const projects = getCookie('projects') ? JSON.parse(getCookie('projects')) : [];
    projects.push(projectData);
    document.cookie = `projects=${JSON.stringify(projects)};path=/;max-age=31536000`;

    MainStore.reset();
    navigate('/projects');
  }

  useEffect(() => {
    MainStore.reset();
  }, []);

  // Обработчики ввода
  function setLinkToAvitoAd(e) { MainStore.setLinkToAvitoAd(e.target.value) }
  function setCountry(e) { 
    // Меняем только для категории Недвижимость
    if(MainStore.category === 'Недвижимость') {
      MainStore.setCountry(e.target.value) 
    }

  }
  function setCity(e) { MainStore.setCity(e.target.value) }

  return (
    <Plate style={plateStyle}>
      <p className="interactive__form-title">Шаг 01</p>
      <TextInput placeholder="Cсылка на объявление Авито, которое планируете продвигать" value={MainStore.linkToAvitoAd} onChange={setLinkToAvitoAd} errortext={MainStore.linkToAvitoAdError} />

      <div className="formstep__item">
        <div className="formstep__item-title">
          В какой категории надо продвинуть поисковую фразу?
          <FAQ style={categoryfaqstyle} text={categoryfaqtext} />
        </div>

        <SelectInput errortext={MainStore.categoryError} />
      </div>

      <div className="formstep__item">
        <div className="formstep__item-title">
          Какую поисковую фразу надо продвинуть в Авито?
          <FAQ style={categoryfaqstyle} text={searchPhrasesfaqtext} />
        </div>

        <Phrase />
      </div>

      <div className="formstep__item">
        <div className="formstep__item-title">
          В каком городе надо продвинуть поисковую фразу?
          <FAQ style={categoryfaqstyle} text={cityfaqtext} />
        </div>

        <TextInput placeholder="Укажите страну" value={MainStore.country} onChange={setCountry} style={countryStyle} errortext={MainStore.countryError} />
        <TextInput placeholder="Укажите город" value={MainStore.city} onChange={setCity} style={cityStyle} errortext={MainStore.cityError} />
      </div>

      <Button
        style={buttonStyle}
        onClick={createProject}
        title={'Создать проект'}
        classes={['outlined']}
        disabled={MainStore.createProjectButtonIsDisable}
      />
    </Plate>
  );
})
