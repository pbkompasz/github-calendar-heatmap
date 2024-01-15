import { getLocale } from "../util/util";
import { DAYS_IN_ONE_YEAR, DEFAULT_RANGE_COLOR_LIGHT, SQUARE_SIZE } from "./defaults";
import type {
  Activities,
  Calendar,
  Color,
  Contribution,
  Locale,
  Month,
  Value,
} from "./types";

export class Heatmap {
  startDate: Date;
  endDate: Date;
  max: number;
  // TODO 3, 6 months version
  months: number;
  locale: Locale;
  colorPalette: Color[];

  private _contributions: Contribution[];
  private _firstFullWeekOfMonths?: Month[];
  private _activities?: Activities;
  private _calendar?: Calendar;

  constructor(
    contributions: Contribution[],
    endDate: Date,
    startDate: Date,
    max: number,
    locale: Locale,
    colorPalette: Color[]
  ) {
    // contributions.sort((c1: Contribution, c2: Contribution) => {
    //   return +new Date(c1.date) - +new Date(c2.date);
    // });

    this.endDate = endDate;
    this.startDate = startDate;
    this._contributions = contributions;
    this.max = max;
    this.months = 12;
    this.locale = locale;
    this.colorPalette = colorPalette;
  }

  set contributions(c: Contribution) {
    this._contributions.push(c);
    this._calendar = Heatmap.updateCalendar(this, c);
  }

  get contributions(): Contribution[] {
    return this._contributions;
  }

  public static updateCalendar(
    heatmap: Heatmap,
    newContribution: Contribution
  ) {
    return [];
  }

  public static createCalendarObject(heatmap: Heatmap) {
    const { startDate, endDate } = heatmap;
    const calendar = [];

    // First "maybe" partial week
    let numberInWeek = new Date(startDate).getDay();
    console.log(new Date(startDate))
    console.log(new Date(endDate))
    for (let i = numberInWeek; i <= 6; i++) {
      // TODO 1 is margin
      calendar.push([0, i * (SQUARE_SIZE + 1)]);
    }

    // Full weeks between
    const oneDay = 24 * 60 * 60 * 1000;
    const timestamp1 = startDate.getTime();
    const timestamp2 = endDate.getTime();
    const days = Math.round(Math.abs((timestamp1 - timestamp2) / oneDay));
    const weeksInBetween = Math.round(days / 7);
    for (let i = 1; i <= weeksInBetween; i++) {
      for (let j = 0; j <= 6; j++) {
        calendar.push([i * (SQUARE_SIZE + 1), j * (SQUARE_SIZE + 1)]);
      }
    }

    // Last "maybe" partial week
    numberInWeek = endDate.getDay();
    console.log(numberInWeek);
    for (let i = 0; i <= numberInWeek; i++) {
      // TODO 1 is margin
      calendar.push([(weeksInBetween + 1) * (SQUARE_SIZE + 1), i * (SQUARE_SIZE + 1)]);
    }

    return calendar;
  }

  public static drawCalendar(
    calendar: number[][],
    width: number,
    height: number
  ) {
    const ns = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(ns, "svg");
    svg.setAttributeNS(null, "width", String(width));
    svg.setAttributeNS(null, "height", String(height));
    for (let r of calendar) {
      const rect = document.createElementNS(ns, "rect");
      rect.setAttributeNS(null, "height", String(SQUARE_SIZE));
      rect.setAttributeNS(null, "width", String(SQUARE_SIZE));
      rect.setAttributeNS(null, "x", String(r[0]));
      rect.setAttributeNS(null, "y", String(r[1]));
      rect.setAttributeNS(null, "fill", DEFAULT_RANGE_COLOR_LIGHT[0]);
      rect.style.margin = '1px';
      rect.addEventListener('mouseover', () => {
        console.log(`[${r[0]}] [${r[1]}]`)
      })
      svg.appendChild(rect);
    }

    return svg;
  }
}
