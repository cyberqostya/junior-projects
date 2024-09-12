import { action, makeObservable, observable } from "mobx";
import copy from "utils/copy";

export default class Strategy {
  constructor(mainStore) {
    this.mainStore = mainStore;

    makeObservable(this, {
      projectTitle: observable,
      setProjectTitle: action,

      placement: observable,
      setPlacement: action,


      isAutomaticActivityActive: observable,
      switchAutomaticActivity: action,
      setIsAutomaticActivityActive: action,

      isArrivedMessagesActive: observable,
      switchArrivedMessages: action,
      setIsArrivedMessagesActive: action,
      MESSAGES_WILL_COME: observable,
      arrivedMessage: observable,
      setArrivedMessage: action,
      _resetArrivedMessage: action,

      isExternalTrafficActive: observable,
      switchExternalTraffic: action,
      setIsExternalTrafficActive: action,
      directTitle: observable,
      setDirectTitle: action,
      directDescription: observable,
      setDirectDescription: action,
      directClickQuantity: observable,
      setDirectClickQuantity: action,
      directionClicksPrice: observable,
      totalPrice: observable,
      _setTotalPrice: action,


      times: observable,
      day: observable,
      week: observable,

      calendars: observable,
      addCalendar: action,
      setCalendars: action,
      resetCalendars: action,

      cellHandler: action,

      activitySumms: observable,


      payButtonIsDisabled: observable,
    });
  }

  MESSAGES_WILL_COME = [
    {title: 'Пришлите больше фото на WhatsApp +7 9XX XX XX', isActive: true},
    {title: 'Где можно посмотреть?', isActive: false},
    {title: 'Напишите мне в WhatsApp +7 9XX XX XX', isActive: false},
    {title: 'Еще продаете?', isActive: false},
    {title: 'У меня есть вопросы, позвоните мне на телефон +7 9XX XX XX', isActive: false},
  ];

  ACTIVITY_MAX_CELL_QUANTITY = [
    10, // favourites
    12, // messages
    5 // subscribe
  ]

  DIRECTION_CLICK_PRICE = 100


  // Название проекта
  projectTitle = '';
  setProjectTitle = (value) => { this.projectTitle = value }


  // Стратегия размещения
  placement = 'auto';
  setPlacement(value) {
    this.placement = value;
  }


  // Тогглеры 
  isAutomaticActivityActive = false;
  switchAutomaticActivity = () => {
    this.isAutomaticActivityActive = !this.isAutomaticActivityActive;
  }
  setIsAutomaticActivityActive(boolean) { this.isAutomaticActivityActive = boolean }

  isArrivedMessagesActive = true;
  switchArrivedMessages = () => {
    this.isArrivedMessagesActive = !this.isArrivedMessagesActive;
  }
  setIsArrivedMessagesActive(boolean) { this.isArrivedMessagesActive = boolean; }
  arrivedMessage = [];
  setArrivedMessage(value) {
    const changedItem = this.MESSAGES_WILL_COME.find(i => i.title === value);
    changedItem.isActive = !changedItem.isActive;

    this.arrivedMessage = this.MESSAGES_WILL_COME.filter(i => i.isActive).map(i => i.title);
  }
  _resetArrivedMessage() { 
    this.MESSAGES_WILL_COME.forEach((i, ind) => {
      if(ind === 0) {i.isActive = true }
      else { i.isActive = false }
    });
    this.arrivedMessage = this.MESSAGES_WILL_COME.filter(i => i.isActive).map(i => i.title); 
  }

  isExternalTrafficActive = true;
  switchExternalTraffic = () => {
    this.isExternalTrafficActive = !this.isExternalTrafficActive;
    this.setDirectClickQuantity(this.isExternalTrafficActive ? 7 : 0);

    this.checkValidation();
  }
  setIsExternalTrafficActive(boolean) { this.isExternalTrafficActive = boolean }
  directTitle = '';
  setDirectTitle = (e) => {
    this.directTitle = e.target.value;

    this.checkValidation();
  }
  directDescription = '';
  setDirectDescription = (e) => {
    this.directDescription = e.target.value;

    this.checkValidation();
  }
  directClickQuantity = 7;
  setDirectClickQuantity = (value = this.directClickQuantity) => {
    this.directClickQuantity = value;
    this.setDirectionClicksPrice();
    this._setTotalPrice();
  }
  directionClicksPrice = this.directClickQuantity * this.DIRECTION_CLICK_PRICE;
  setDirectionClicksPrice = () => {
    this.directionClicksPrice = this.directClickQuantity * this.DIRECTION_CLICK_PRICE;
  }
  totalPrice = 12;
  _setTotalPrice() {
    this.totalPrice = this.mainStore.calculations.totalPrice + this.directionClicksPrice;
  }



  // Календарь
  times = ['07:00 - 09:00', '09:00 - 11:00', '11:00 - 13:00', '13:00 - 15:00', '15:00 - 17:00', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00', '23:00 - 01:00', '01:00 - 03:00', '03:00 - 05:00', '05:00 - 07:00'];
  day = [
    Array(this.times.length).fill(0), // favourites
    Array(this.times.length).fill(0), // messages
    Array(this.times.length).fill(0), // subscribe
  ]
  week = Array(7).fill(this.day);

  // [[0,1,2], [0,1,2], ... , [0,1,2]]
  activitySumms = Array(this.week.length).fill(Array(this.day.length).fill(0));

  calendars = [{ week: copy(this.week), activitySumms: copy(this.activitySumms) }];
  addCalendar = () => {
    this.calendars.push({ week: copy(this.week), activitySumms: copy(this.activitySumms) });
  }
  setCalendars(calendars) { this.calendars = calendars }
  resetCalendars() {
    this.calendars = [{ week: copy(this.week), activitySumms: copy(this.activitySumms) }];
  }


  cellHandler = (calendarId, daySerialNumber, activitySerialNumber, timeSerialNumber) => {
    const week = this.calendars[calendarId].week;
    const activitySumms = this.calendars[calendarId].activitySumms;

    // Текущее значение клетки
    const currentCellValue = week[daySerialNumber][activitySerialNumber][timeSerialNumber];

    // Максимальное значение клетки определенной активности favourites, messages или subscribe
    const maxValue = this.ACTIVITY_MAX_CELL_QUANTITY[activitySerialNumber];

    // Сумма определенной активности favourites, messages или subscribe (по всем календарям)
    const certainActivitySumm = this.calendars.reduce((acc, i) => (acc + i.activitySumms.reduce((acc, i) => (acc + i[activitySerialNumber]), 0)), 0)
    // const certainActivitySumm = activitySumms.reduce((acc, i) => (acc + i[activitySerialNumber]), 0);

    // Максимальное значение клеток определенной активности
    const maxValueCertainActivity = [this.mainStore.calculations.activityFavourites, this.mainStore.calculations.activityMessages, this.mainStore.calculations.activitySubscribe][activitySerialNumber];


    if (currentCellValue === maxValue || certainActivitySumm === maxValueCertainActivity) {
      week[daySerialNumber][activitySerialNumber][timeSerialNumber] = 0;

    } else if (certainActivitySumm < maxValueCertainActivity) {
      week[daySerialNumber][activitySerialNumber][timeSerialNumber]++;
    }


    // Подсчёты общей суммы
    week.forEach((day, dayIndex) => {
      day.forEach((activity, activityIndex) => {
        const activitySumm = activity.reduce((acc, cellValue) => (acc + cellValue), 0);
        activitySumms[dayIndex][activityIndex] = activitySumm;
      })
    });
  }


  payButtonIsDisabled = true;
  checkValidation = () => {
    if (this.isExternalTrafficActive) {
      if (this.directTitle.length && this.directDescription.length) {
        this.payButtonIsDisabled = false;
      } else {
        this.payButtonIsDisabled = true;
      }
    } else {
      this.payButtonIsDisabled = false;
    }
  }

  reset() {
    this.setProjectTitle('');
    this.setPlacement('auto');
    this.setIsAutomaticActivityActive(false);
    this.setIsArrivedMessagesActive(true);
    this._resetArrivedMessage();
    this.setIsExternalTrafficActive(true);
    this.setDirectTitle({target: {value: ''}});
    this.setDirectDescription({target: {value: ''}});
    this.setDirectClickQuantity(7);
    this.resetCalendars();
  }

}