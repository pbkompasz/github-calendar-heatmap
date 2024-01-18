import { h } from "vue";
import {
  RANGE_COLOR_LIGHT,
  LOCALE,
  MAX,
  RANGE_COLOR_DARK,
  SQUARE_SIZE,
  WEEK_FIRST_DAY,
  DAYS_TEXT_GAP,
  MONTHS_TEXT_GAP,
  SQUARE_MARGIN,
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
  hideDaysText: boolean;
  hideMonthsText: boolean;
  hideRange: boolean;

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
    weekStartDay: DayOfWeek = WEEK_FIRST_DAY,
    hideDaysText: boolean = false,
    hideMonthsText: boolean = false,
    hideRange: boolean = false
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
    this.hideDaysText = hideDaysText;
    this.hideMonthsText = hideMonthsText;
    this.hideRange = hideRange;
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
    const { startDate, endDate, weekStartDay, hideDaysText, hideMonthsText } =
      heatmap;
    const calendar = [];

    const actualDaysTextGap = hideDaysText ? 0 : DAYS_TEXT_GAP;
    const actualMonthsTextGap = hideMonthsText ? 0 : MONTHS_TEXT_GAP;

    let heatmapWidth = actualDaysTextGap;
    let heatmapHeight = actualMonthsTextGap + 7 * (SQUARE_SIZE + SQUARE_MARGIN);

    // First "maybe" partial week
    let numberInWeek = new Date(startDate).getDay() - 1 + (weekStartDay % 7 - 1);
    for (let i = numberInWeek; i <= 6; i++) {
      // TODO 1 is margin
      calendar.push([
        actualDaysTextGap,
        actualMonthsTextGap + i * (SQUARE_SIZE + 1),
      ]);
    }
    heatmapWidth += SQUARE_SIZE + SQUARE_MARGIN;

    // Full weeks between
    const oneDay = 24 * 60 * 60 * 1000;
    const timestamp1 = startDate.getTime();
    const timestamp2 = endDate.getTime();
    const days = Math.round(Math.abs((timestamp1 - timestamp2) / oneDay));
    const weeksInBetween = Math.round(days / 7) - 1;
    for (let i = 1; i <= weeksInBetween; i++) {
      for (let j = 0; j <= 6; j++) {
        calendar.push([
          actualDaysTextGap + i * (SQUARE_SIZE + 1),
          actualMonthsTextGap + j * (SQUARE_SIZE + 1),
        ]);
      }
    }
    heatmapWidth += weeksInBetween * (SQUARE_SIZE + SQUARE_MARGIN);

    // Last "maybe" partial week
    // TODO Add startOfTheWeek
    numberInWeek = endDate.getDay() + 1;
    for (let i = 0; i <= numberInWeek; i++) {
      // TODO 1 is margin
      calendar.push([
        actualDaysTextGap + (weeksInBetween + 1) * (SQUARE_SIZE + 1),
        actualMonthsTextGap + i * (SQUARE_SIZE + 1),
      ]);
    }
    heatmapWidth += SQUARE_SIZE + SQUARE_MARGIN;

    let daysTexts = [
      [
        0,
        actualMonthsTextGap +
          new Date(startDate).getDay() * (SQUARE_SIZE + SQUARE_MARGIN),
        "Mon",
      ],
      [
        0,
        actualMonthsTextGap +
          (new Date(startDate).getDay() + 2) * (SQUARE_SIZE + SQUARE_MARGIN),
        "Wed",
      ],
      [
        0,
        actualMonthsTextGap +
          (new Date(startDate).getDay() + 4) * (SQUARE_SIZE + SQUARE_MARGIN),
        "Fri",
      ],
    ];
    const months = [
      { name: 'Jan', weeks: 0 },
      { name: "Feb", weeks: 5 },
      { name: "Mar", weeks: 9 },
      { name: "Apr", weeks: 14 },
      { name: "May", weeks: 18 },
      { name: "Jun", weeks: 23 },
      { name: "Jul", weeks: 27 },
      { name: "Aug", weeks: 31 },
      { name: "Sep", weeks: 36 },
      { name: "Oct", weeks: 40 },
      { name: "Nov", weeks: 44 },
      { name: "Dec", weeks: 49 },
    ];
    const monthsTexts = months.map(month => [
      actualDaysTextGap + month.weeks * (SQUARE_SIZE + SQUARE_MARGIN),
      actualMonthsTextGap - 2,
      month.name,
    ]);

    return {
      calendar,
      heatmapWidth,
      heatmapHeight,
      daysTexts,
      monthsTexts,
    };
  }

  // NOTE svgContgainer
  public static createCalendarHTML(
    obj: { calendar: number[][]; heatmapWidth: number; heatmapHeight: number, daysTexts: [][], monthsTexts: [][], },
    style: Style,
    containerWidth: number | string = "100%",
    containerHeight: number | string = "100%"
  ) {
    const rectangles = [];
    const texts = [];

    const { calendar, heatmapHeight, heatmapWidth, daysTexts, monthsTexts } =
      obj;

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
          console.log(`${((r[0] - 30) / 12) * 7 + (r[1] - 20) / 12}`);
        },
      });
      rectangles.push(rect);
    }

    for (let t of daysTexts.concat(monthsTexts)) {
      const text = h("text", {
        // @ts-ignore
        x: String(t[0]),
        // @ts-ignore
        y: String(t[1]),
        // @ts-ignore
        innerHTML: t[2],
        style: {
          fontSize: "12px",
          fontWeight: "400",
        },
      });
      texts.push(text);
    }

    const svg = h(
      "svg",
      {
        style: {
          width: heatmapWidth,
          height: heatmapHeight,
        },
      },
      [rectangles, texts]
    );

    const svgContainer = h(
      "div",
      {
        style: {
          overflowX: "scroll",
          width: "100%",
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
          border: "1px solid",
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
