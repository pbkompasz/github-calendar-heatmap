import { h } from "vue";
import {
  RANGE_COLOR_LIGHT,
  LOCALE,
  MAX,
  RANGE_COLOR_DARK,
  SQUARE_SIZE,
  WEEK_FIRST_DAY,
  WEEKS_GAP,
  MONTHS_GAP,
} from "./defaults";
import type {
  Activities,
  Calendar,
  Color,
  Contribution,
  DayOfWeek,
  Locale,
  Month,
  Style,
} from "./types";

export class Heatmap {
  startDate: Date;
  endDate: Date;
  max: number;
  // TODO 3, 6 months version
  months: number;
  locale: Locale;
  colorPalette: Color[];
  weekStartDay: DayOfWeek;
  darkmode: boolean;

  private _contributions: Contribution[];
  private _firstFullWeekOfMonths?: Month[];
  private _activities?: Activities;
  private _calendar?: Calendar;

  constructor(
    contributions: Contribution[],
    endDate: Date,
    startDate: Date,
    max: number = MAX,
    locale: Locale = LOCALE,
    darkmode: boolean,
    colorPalette: Color[],
    weekStartDay: DayOfWeek = WEEK_FIRST_DAY
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
    this.colorPalette =
      colorPalette ?? darkmode ? RANGE_COLOR_LIGHT : RANGE_COLOR_DARK;
    this.weekStartDay = weekStartDay;
    this.darkmode = darkmode;
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

  public static createCalendarDescriptor(heatmap: Heatmap) {
    const { startDate, endDate, weekStartDay } = heatmap;
    const calendar = [];

    // First "maybe" partial week
    let numberInWeek = new Date(startDate).getDay() - 1;
    console.log(new Date(startDate));
    console.log(new Date(endDate));
    for (let i = numberInWeek; i <= 6; i++) {
      // TODO 1 is margin
      calendar.push([WEEKS_GAP, MONTHS_GAP + i * (SQUARE_SIZE + 1)]);
    }

    // Full weeks between
    const oneDay = 24 * 60 * 60 * 1000;
    const timestamp1 = startDate.getTime();
    const timestamp2 = endDate.getTime();
    const days = Math.round(Math.abs((timestamp1 - timestamp2) / oneDay));
    const weeksInBetween = Math.round(days / 7);
    for (let i = 1; i <= weeksInBetween; i++) {
      for (let j = 0; j <= 6; j++) {
        calendar.push([
          WEEKS_GAP + i * (SQUARE_SIZE + 1),
          MONTHS_GAP + j * (SQUARE_SIZE + 1),
        ]);
      }
    }

    // Last "maybe" partial week
    // TODO Add startOfTheWeek
    numberInWeek = endDate.getDay() + 1;
    console.log(numberInWeek);
    for (let i = 0; i <= numberInWeek; i++) {
      // TODO 1 is margin
      calendar.push([
        WEEKS_GAP + (weeksInBetween + 1) * (SQUARE_SIZE + 1),
        MONTHS_GAP + i * (SQUARE_SIZE + 1),
      ]);
    }

    return calendar;
  }

  // NOTE svgContgainer
  public static createCalendarHTML(
    calendar: number[][],
    style: Style,
    containerWidth: number | string = "100%",
    containerHeight: number | string = "100%",
    heatmapWidth: number | string = "700px",
    heatmapHeight: number | string = "150px"
  ) {
    const rectangles = [];

    for (let r of calendar) {
      const rect = h("rect", {
        height: String(SQUARE_SIZE),
        width: String(SQUARE_SIZE),
        x: String(r[0]),
        y: String(r[1]),
        fill: style.colorPalette[0],
        style: {
          margin: "1px",
        },
        onMouseover() {
          console.log(`[${r[0]}] [${r[1]}]`)
        }
      });
      rectangles.push(rect);
    }

    const svg = h(
      "svg",
      {
        style: {
          width: heatmapWidth,
          height: heatmapHeight,
        },
      },
      rectangles
    );

    const svgContainer = h(
      "div",
      {
        style: {
          overflowX: "scroll",
          width: '100%',
        },
      },
      [svg]
    );

    const divBottom = h(
      "div",
      {
        style: {
          width: "100%",
          height: "50px",
          border: '1px solid'
        },
      },
      "Bottom shit"
    );

    const container = h(
      "div",
      {
        style: {
          width: containerWidth,
          height: containerHeight,
        },
      },
      [svgContainer, divBottom]
    );

    return container;
  }
}
