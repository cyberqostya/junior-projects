import Calculations from './Calculations';
import Strategy from './Strategy';

const { makeObservable, observable, action } = require('mobx');

class MainStore {

  constructor() {
    this.calculations = new Calculations(this);
    this.strategy = new Strategy(this);

    makeObservable(this, {
      isAuth: observable,
      setIsAuth: action,

      isFormModeLogin: observable,
      setIsFormModeLogin: action,


      linkToAvitoAd: observable,
      setLinkToAvitoAd: action,
      linkToAvitoAdError: observable,

      category: observable,
      setCategory: action,
      categoryError: observable,

      searchPhrases: observable,
      addSearchPhrase: action,
      removeSearchPhrase: action,
      setSearchPhrases: action,
      searchPhrasesError: observable,

      country: observable,
      setCountry: action,
      countryError: observable,

      city: observable,
      setCity: action,
      cityError: observable,


      checkValidation: action,

      _resetCity: action,
      _resetCountry: action,
      _resetSearchPhrases: action,
      _resetLinkToAvitoAd: action,
      _resetCategory: action,
      reset: action,
    });
  }

  // Залогинен ли пользователь
  isAuth = true;
  setIsAuth(bool) {
    this.isAuth = bool;
  }

  // Тип формы
  isFormModeLogin = true;
  setIsFormModeLogin = (isModeLogin) => {
    this.isFormModeLogin = isModeLogin;
  }

  // Первые данные для продвижения
  // Адрес объявления на авито
  linkToAvitoAd = '';
  setLinkToAvitoAd = (value) => {
    this.linkToAvitoAd = value;
    this._validateLinkToAvitoAd();
  };
  _resetLinkToAvitoAd() { this.linkToAvitoAd = ''; this.linkToAvitoAdError = '' }
  linkToAvitoAdError = '';
  _validateLinkToAvitoAd() {
    if (!this.linkToAvitoAd.includes('avito.ru/')) {
      this.linkToAvitoAdError = 'Введите правильную ссылку на объявление Авито';
    } else {
      this.linkToAvitoAdError = '';
    }
    return this.linkToAvitoAdError.length === 0;
  }

  // Категория
  category = '';
  setCategory(value) {
    this.category = value;
    this.calculations.calculate();
    this._validateCategory();
  }
  _resetCategory() { this.category = ''; this.categoryError = ''; }
  categoryError = '';
  _validateCategory() {
    if (this.category.length === 0) {
      this.categoryError = 'Добавьте категорию';
    } else {
      this.categoryError = '';
    }
    return this.categoryError.length === 0;
  }

  // Поисковые фразы
  searchPhrases = [];
  addSearchPhrase(value) {
    this.searchPhrases.push(value);
    this.calculations.calculate();
    this._validateSearchPhrases();
  }
  removeSearchPhrase(removedPhrase) {
    this.searchPhrases = this.searchPhrases.filter(phrase => phrase !== removedPhrase);
    this.calculations.calculate();
    this._validateSearchPhrases();
  }
  setSearchPhrases(array) { this.searchPhrases = array }
  _resetSearchPhrases() { this.searchPhrases = []; this.searchPhrasesError = ''; }
  searchPhrasesError = '';
  _validateSearchPhrases() {
    if (this.searchPhrases.length === 0) {
      this.searchPhrasesError = 'Добавьте поисковую фразу';
    } else {
      this.searchPhrasesError = '';
    }
    return this.searchPhrasesError.length === 0;
  }

  // Страна
  country = 'Россия';
  setCountry = (value) => {
    this.country = value;
    this._validateCountry();
  }
  _resetCountry() { this.country = 'Россия'; this.countryError = ''; }
  countryError = '';
  _validateCountry() {
    if (this.country.length === 0) {
      this.countryError = 'Введите страну';
    } else {
      this.countryError = '';
    }
    return this.countryError.length === 0;
  }

  // Город
  city = '';
  setCity = (value) => {
    this.city = value;
    this._validateCity();
  }
  _resetCity() { this.city = ''; this.cityError = ''; }
  cityError = '';
  _validateCity() {
    if (this.city.length === 0) {
      this.cityError = 'Введите город';
    } else {
      this.cityError = '';
    }
    return this.cityError.length === 0;
  }

  // Проверка заполненных полей
  checkValidation() {
    return [
      this._validateLinkToAvitoAd(),
      this._validateCategory(),
      this._validateSearchPhrases(),
      this._validateCountry(),
      this._validateCity(),
    ].every(i => i === true);
  }

  reset() {
    this._resetCity();
    this._resetCountry();
    this._resetSearchPhrases();
    this._resetLinkToAvitoAd();
    this._resetCategory();

    this.calculations.reset();
  }
}

export default new MainStore();
