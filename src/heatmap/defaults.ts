import { Color, Locale } from "./types";



const DEFAULT_RANGE_COLOR_LIGHT: Color[] = [
  "#ebedf0",
  "#39d353",
  "#26a641",
  "#006d32",
  "#0e4429",
];

const DEFAULT_RANGE_COLOR_DARK: Color[] = [
  "#161b22",
  "#39d353",
  "#26a641",
  "#006d32",
  "#0e4429",
];

// Default locale en-US
// static readonly DEFAULT_LOCALE = 'en-US';
const DEFAULT_LOCALE: Locale = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  less: "Less",
  more: "More",
};

const DEFAULT_TOOLTIP_UNIT = {
  repr: "contribution",
  hasPlural: true,
  plural: "s",
};

// TODO Leap years
const DAYS_IN_ONE_YEAR = 365;
const WEEK_FIRST_DAY = 1;
const SQUARE_SIZE = 11;

export {
  DEFAULT_RANGE_COLOR_LIGHT,
  DEFAULT_RANGE_COLOR_DARK,
  DEFAULT_LOCALE,
  DEFAULT_TOOLTIP_UNIT,
  DAYS_IN_ONE_YEAR,
  WEEK_FIRST_DAY,
  SQUARE_SIZE, 
}