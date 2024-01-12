import { getLocale } from "../util/util";
import type { Activities, Calendar, Locale, Month, Value } from "./types";

export class Heatmap {

  // static readonly DEFAULT_RANGE_COLOR_LIGHT = [ '#ebedf0', '#dae2ef', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e' ];
  static readonly DEFAULT_RANGE_COLOR_LIGHT = ['#ebedf0', '#39d353', '#26a641', '#006d32', '#0e4429',];
  static readonly DEFAULT_RANGE_COLOR_DARK = ['#161b22', '#39d353', '#26a641', '#006d32', '#0e4429',];

  // Default locale en-US
  // static readonly DEFAULT_LOCALE = 'en-US';
  static readonly DEFAULT_LOCALE: Locale = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    on: 'on',
    less: 'Less',
    more: 'More'
  };

  static readonly DEFAULT_TOOLTIP_UNIT = 'contributions';
  // TODO Leap years
  static readonly DAYS_IN_ONE_YEAR = 365;
  static readonly DAYS_IN_WEEK = 7;
  static readonly SQUARE_SIZE = 11;

  // Default is 365 from endDate
  startDate: Date;
  endDate: Date;
  // Number that is the max colour
  max: number;
  // TODO 3, 6 months version
  months: number;

  private _values: Value[];
  private _firstFullWeekOfMonths?: Month[];
  private _activities?: Activities;
  private _calendar?: Calendar;

  constructor(endDate: Date | string, values: Value[], startDate?: Date | string, max?: number) {
    this.endDate = this.parseDate(endDate);
    this.max = max ?? Math.ceil((Math.max(...values.map(day => day.count)) / 5) * 4);
    this.startDate = startDate ? this.parseDate(startDate) : this.shiftDate(endDate, -Heatmap.DAYS_IN_ONE_YEAR);
    this._values = values;
    this.months = 12;
    getLocale();
  }

  // NOTE Rewrite to modelValue
  set values(v: Value[]) {
    this.max = Math.ceil((Math.max(...v.map(day => day.count)) / 5) * 4);
    this._values = v;
    this._firstFullWeekOfMonths = undefined;
    this._calendar = undefined;
    this._activities = undefined;
  }

  get values(): Value[] {
    return this._values;
  }

  get activities(): Activities {
    if (!this._activities) {
      this._activities = new Map();
      for (let i = 0, len = this.values.length; i < len; i++) {
        this._activities.set(this.keyDayParser(this.values[i].date), {
          count: this.values[i].count,
          colorIndex: this.getColorIndex(this.values[i].count)
        });
      }
    }
    return this._activities;
  }

  get weekCount() {
    return this.getDaysCount() / Heatmap.DAYS_IN_WEEK;
  }

  get calendar() {
    if (!this._calendar) {
      let date = this.shiftDate(this.startDate, -this.getCountEmptyDaysAtStart());
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      this._calendar = new Array(this.weekCount);
      for (let i = 0, len = this._calendar.length; i < len; i++) {
        this._calendar[i] = new Array(Heatmap.DAYS_IN_WEEK);
        for (let j = 0; j < Heatmap.DAYS_IN_WEEK; j++) {
          const dayValues = this.activities.get(this.keyDayParser(date));
          this._calendar[i][j] = {
            date: new Date(date.valueOf()),
            count: dayValues ? dayValues.count : undefined,
            colorIndex: dayValues ? dayValues.colorIndex : 0
          };
          date.setDate(date.getDate() + 1);
        }
      }
    }
    return this._calendar;
  }

  get firstFullWeekOfMonths(): Month[] {
    if (!this._firstFullWeekOfMonths) {
      const cal = this.calendar;
      this._firstFullWeekOfMonths = [];
      for (let index = 1, len = cal.length; index < len - 1; index++) {
        const lastWeek = cal[index - 1][0].date,
          currentWeek = cal[index][0].date;
        if (lastWeek.getFullYear() < currentWeek.getFullYear() || lastWeek.getMonth() < currentWeek.getMonth()) {
          // @ts-ignore
          this._firstFullWeekOfMonths.push({ value: currentWeek.getMonth(), index });
        }
      }
    }
    return this._firstFullWeekOfMonths;
  }

  getColorIndex(count?: number) {
    if (count === null || count === undefined) {
      return 0;
    } else if (count <= 0) {
      return 1;
    } else if (count >= this.max) {
      return 5;
    } else {
      return (Math.ceil(((count * 100) / this.max) * (0.03))) + 1;
    }
  }

  getCountEmptyDaysAtStart() {
    return this.startDate.getDay();
  }

  getCountEmptyDaysAtEnd() {
    return (Heatmap.DAYS_IN_WEEK - 1) - this.endDate.getDay();
  }

  getDaysCount() {
    return Heatmap.DAYS_IN_ONE_YEAR + 1 + this.getCountEmptyDaysAtStart() + this.getCountEmptyDaysAtEnd();
  }

  private shiftDate(date: Date | string, numDays: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  private parseDate(entry: Date | string) {
    return (entry instanceof Date) ? entry : (new Date(entry));
  }

  private keyDayParser(date: Date | string) {
    const day = this.parseDate(date);
    return String(day.getFullYear()) + String(day.getMonth()).padStart(2, '0') + String(day.getDate()).padStart(2, '0');
  }

}

export class Heatmap2 {

  static getDayOfWeek(date: Date) {
    return date.getDay();
    throw new Error("Method not implemented.");
  }

  static getWeekNo(startDate: Date, date: Date) {

    return -1;
    throw new Error("Method not implemented.");
  }

  // static readonly DEFAULT_RANGE_COLOR_LIGHT = [ '#ebedf0', '#dae2ef', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e' ];
  static readonly DEFAULT_RANGE_COLOR_LIGHT = ['#ebedf0', '#39d353', '#26a641', '#006d32', '#0e4429',];
  static readonly DEFAULT_RANGE_COLOR_DARK = ['#161b22', '#39d353', '#26a641', '#006d32', '#0e4429',];

  // Default locale en-US
  // static readonly DEFAULT_LOCALE = 'en-US';
  static readonly DEFAULT_LANG: Locale = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    on: 'on',
    less: 'Less',
    more: 'More'
  };

  static readonly DEFAULT_TOOLTIP_UNIT = 'contributions';
  // TODO Leap years
  static readonly DAYS_IN_ONE_YEAR = 365;
  static readonly DAYS_IN_WEEK = 7;
  static readonly SQUARE_SIZE = 11;

  // Default is 365 from endDate
  startDate: Date;
  endDate: Date;
  // Number that is the max colour
  max: number;
  // TODO 3, 6 months version
  months: number;

  private _values: Value[];
  private _firstFullWeekOfMonths?: Month[];
  private _activities?: Activities;
  private _calendar?: Calendar;
  width: number;

  constructor(endDate: Date | string, values: Value[], startDate?: Date | string, max?: number) {
    this.endDate = this.parseDate(endDate);
    this.startDate = startDate ? this.parseDate(startDate) : this.shiftDate(endDate, -Heatmap.DAYS_IN_ONE_YEAR);
    this.max = max ?? Math.ceil((Math.max(...values.map(day => day.count)) / 5) * 4);
    this._values = values;
    this.months = 12;
    this.width = 100;
    getLocale();
  }

  // NOTE Rewrite to modelValue
  set values(v: Value[]) {
    this.max = Math.ceil((Math.max(...v.map(day => day.count)) / 5) * 4);
    this._values = v;
    this._firstFullWeekOfMonths = undefined;
    this._calendar = undefined;
    this._activities = undefined;
  }

  get values(): Value[] {
    return this._values;
  }

  get activities(): Activities {
    if (!this._activities) {
      this._activities = new Map();
      for (let i = 0, len = this._values.length; i < len; i++) {
        this._activities.set(this.keyDayParser(this.values[i].date), {
          count: this.values[i].count,
          colorIndex: this.getColorIndex(this.values[i].count)
        });
      }
    }
    return this._activities;
  }

  getMonth(pos: Number) {
    // Return <pos>th month's last and first day in month

  }

  getWeek(pos: Number) {
    if (pos < 0 && pos > 52) {
      throw new Error('Wrong input:');
    }
  }

  get weekCount() {
    return this.getDaysCount() / Heatmap.DAYS_IN_WEEK;
  }

  get calendar() {
    if (!this._calendar) {
      let date = this.shiftDate(this.startDate, -this.getCountEmptyDaysAtStart());
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      this._calendar = new Array(this.weekCount);
      for (let i = 0, len = this._calendar.length; i < len; i++) {
        this._calendar[i] = new Array(Heatmap.DAYS_IN_WEEK);
        for (let j = 0; j < Heatmap.DAYS_IN_WEEK; j++) {
          const dayValues = this.activities.get(this.keyDayParser(date));
          this._calendar[i][j] = {
            date: new Date(date.valueOf()),
            count: dayValues ? dayValues.count : undefined,
            colorIndex: dayValues ? dayValues.colorIndex : 0
          };
          date.setDate(date.getDate() + 1);
        }
      }
    }
    return this._calendar;
  }

  get firstFullWeekOfMonths(): Month[] {
    if (!this._firstFullWeekOfMonths) {
      const cal = this.calendar;
      this._firstFullWeekOfMonths = [];
      for (let index = 1, len = cal.length; index < len - 1; index++) {
        const lastWeek = cal[index - 1][0].date,
          currentWeek = cal[index][0].date;
        if (lastWeek.getFullYear() < currentWeek.getFullYear() || lastWeek.getMonth() < currentWeek.getMonth()) {
          // @ts-ignore
          this._firstFullWeekOfMonths.push({ value: currentWeek.getMonth(), index });
        }
      }
    }
    return this._firstFullWeekOfMonths;
  }

  getColorIndex(count?: number) {
    if (count === null || count === undefined) {
      return 0;
    } else if (count <= 0) {
      return 1;
    } else if (count >= this.max) {
      return 5;
    } else {
      return (Math.ceil(((count * 100) / this.max) * (0.03))) + 1;
    }
  }

  getCountEmptyDaysAtStart() {
    return this.startDate.getDay();
  }

  getCountEmptyDaysAtEnd() {
    return (Heatmap.DAYS_IN_WEEK - 1) - this.endDate.getDay();
  }

  getDaysCount() {
    return Heatmap.DAYS_IN_ONE_YEAR + 1 + this.getCountEmptyDaysAtStart() + this.getCountEmptyDaysAtEnd();
  }

  private shiftDate(date: Date | string, numDays: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  private parseDate(entry: Date | string) {
    return (entry instanceof Date) ? entry : (new Date(entry));
  }

  private keyDayParser(date: Date | string) {
    const day = this.parseDate(date);
    return String(day.getFullYear()) + String(day.getMonth()).padStart(2, '0') + String(day.getDate()).padStart(2, '0');
  }


}

interface BaseDate {
  alias: string;
  marked: boolean;
}

interface Day extends BaseDate {
  date: Date;
};

interface Week extends BaseDate {
  firstDayDate: Date;
  weekNumber: number;
  // Whole week fits into the year
  fullWeek: boolean;
}

interface Month2 extends BaseDate {
  firstDayDate: Date;
  name: string;
  // Number of days in the month
  length: number;
  // Whole month fits into the year
  fullMonth: boolean;
}

/**
 * @brief Frontend of Heatmap
 */
export class HeatmapDraw {
  static readonly SQUARE_SIZE = 11;

  private _heatmap: Heatmap2;

  constructor(heatmap: Heatmap2) {
    this._heatmap = heatmap;
  }

  getDatePosition(dayWeekOrMonth: Day | Week | Month2) {

    const firstDay = Heatmap2.getWeekNo(this._heatmap.startDate, 'date' in dayWeekOrMonth ? dayWeekOrMonth.date : dayWeekOrMonth.firstDayDate) *
      HeatmapDraw.SQUARE_SIZE + Heatmap2.getDayOfWeek('date' in dayWeekOrMonth ? dayWeekOrMonth.date : dayWeekOrMonth.firstDayDate);
  }

  // Assemble SVG
  drawCalendar() {
    const { startDate, endDate } = this._heatmap;
    console.log(document);
    // for (let day in this._heatmap.getDays()) {
    //   const dayPos = this.getDatePosition(day);

    // }
  }

}
