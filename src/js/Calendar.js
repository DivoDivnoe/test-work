const monthDays = isLeap => [
  31,
  isLeap ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];

// Класс Календарь, содержит текущую дату, месяц, который в данный момент отрисован на экране, а также методы для навигации по месяцам
export default class Calendar {
  constructor() {
    const now = new Date();
    this.today = {
      day: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
      isLeap: !(now.getFullYear() % 4)
    };
    this.currentState = {
      currentMonth: this.initialState
    };
    this.getPrevMonth();
    this.getNextMonth();
  }

  get initialState() {
    const month = this.today.month;
    const year = this.today.year;
    const isLeap = this.today.isLeap;
    const days = monthDays(isLeap)[month];
    const firstWeakDay = this.getWeakDay(year, month, 1);
    const lastWeakDay = this.getWeakDay(year, month, days);
    const isCurrentMonth = true;

    return {
      month,
      year,
      days,
      isLeap,
      firstWeakDay,
      lastWeakDay,
      isCurrentMonth
    };
  }

  get month() {
    return this.currentState.currentMonth.month; //
  }
  set month(anotherMonth) {
    this.currentState.currentMonth.month = anotherMonth;
  }

  get year() {
    return this.currentState.currentMonth.year; //
  }
  set year(anotherYear) {
    this.currentState.currentMonth.year = anotherYear;
  }

  get days() {
    return this.currentState.currentMonth.days; //
  }
  set days(anotherMonthDays) {
    this.currentState.currentMonth.days = anotherMonthDays;
  }
  get prevMonthDays() {
    return this.currentState.prevMonth.days; //
  }
  get nextMonthDays() {
    return this.currentState.nextMonth.days;
  }

  get firstWeakDay() {
    return this.currentState.currentMonth.firstWeakDay; //
  }
  get lastWeakDay() {
    return this.currentState.currentMonth.lastWeakDay; //
  }

  get isCurrentMonth() {
    return this.currentState.currentMonth.isCurrentMonth; //
  }

  get todayDate() {
    return this.today.day; //
  }

  prev() {
    this.currentState.nextMonth = Object.create(this.currentState.currentMonth);
    this.currentState.currentMonth = Object.create(this.currentState.prevMonth);
    this.currentState.prevMonth = Object.create(this.getPrevMonth());

    this.changeDateHandler(this);
  }

  next() {
    this.currentState.prevMonth = Object.create(this.currentState.currentMonth);
    this.currentState.currentMonth = Object.create(this.currentState.nextMonth);
    this.currentState.nextMonth = Object.create(this.getNextMonth());

    this.changeDateHandler(this);
  }

  reset() {
    this.currentState.currentMonth = this.initialState;
    this.getPrevMonth();
    this.getNextMonth();

    this.changeDateHandler(this);
  }

  getPrevMonth() {
    const month = this.month ? this.month - 1 : 11;
    const year = this.year - (month ? 0 : 1);
    const isLeap =
      month === 11 ? !(year % 4) : this.currentState.currentMonth.isLeap;
    const days = monthDays(isLeap)[month];
    const firstWeakDay = this.getWeakDay(year, month, 1);
    const lastWeakDay = this.getWeakDay(year, month, days);
    const isCurrentMonth =
      month === this.today.month && year === this.today.year;

    this.currentState.prevMonth = {
      month,
      year,
      days,
      isLeap,
      firstWeakDay,
      lastWeakDay,
      isCurrentMonth
    };

    return this.currentState.prevMonth;
  }

  getNextMonth() {
    const month = this.month === 11 ? 0 : this.month + 1;
    const year = this.year + (month === 11 ? 1 : 0);
    const isLeap = month ? this.currentState.currentMonth.isLeap : !(year % 4);
    const days = monthDays(isLeap)[month];
    const firstWeakDay = this.getWeakDay(year, month, 1);
    const lastWeakDay = this.getWeakDay(year, month, days);
    const isCurrentMonth =
      month === this.today.month && year === this.today.year;

    this.currentState.nextMonth = {
      month,
      year,
      days,
      isLeap,
      firstWeakDay,
      lastWeakDay,
      isCurrentMonth
    };

    return this.currentState.nextMonth;
  }

  getWeakDay(year, month, day) {
    const weakDay = new Date(year, month, day).getDay();

    return weakDay ? weakDay : 7;
  }

  changeDateHandler(calendar) {
    return calendar;
  }
}
