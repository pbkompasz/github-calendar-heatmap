import { PropType } from "vue";
import { Heatmap } from "./heatmap";
import type {
  Color,
  Contribution,
  ContributionUnit,
  DayOfWeek,
  Locale,
  Orientation,
  TooltipFormatter,
  TooltipMessageGenerator,
  Value,
} from "./types";
import { validateContributions, validateColor } from "./validate";
import {
  RANGE_COLOR_DARK,
  RANGE_COLOR_LIGHT,
  TOOLTIP_UNIT,
  WEEK_FIRST_DAY,
} from "./defaults";

export default {
  /**
   * Calendar's start date
   * @values new Date(), new Date('2023-05-15');
   * @type Date
   * @example new Date()
   * @default Default value is set by the following rule: contributions ? contributions[0].date : endDate.setFullYear(endDate.getFullYear() -1);
   */
  startDate: {
    type: Date,
    validate: (val: Date) => {
      return !isNaN(val.getTime());
    },
  },

  /**
   * Calendar's end date
   * @values new Date(), new Date('2023-05-15');
   * @type Date
   * @example new Date()
   * @default Default value is set by the following rule: contributions ? contributions[0].date : new Date();
   */
  endDate: {
    type: Date,
    required: false,
    default: new Date(),
  },

  /**
   * This specifies the number of contributions after which a date receives the maxColor.
   * @values A number greater then or equal then 4.
   * @type Number
   * @default 99
   */
  // Max number of events per date
  max: {
    type: Number,
    default: 99,
    validate: (val: number) => {
      return val >= 4;
    },
  },

  /**
   * An object containing a series of object representing each day.
   * This object is sorted by date field and every value outside of [startDate..endDate] range is dropped.
   * See types/Contribution
   * @type Contribution[]
   * @default false
   */
  contributions: {
    type: Array as PropType<Contribution[]>,
    default: [],
    validate: (val: Contribution[]) => validateContributions(val),
  },

  /**
   * An object to specify a personalised locale, it can't overwrite the following values: names of day, names of months, heatmap less and more message
   * See types/CalendarLocale
   * @values CalendarLocale
   * @default DEFAULT_LOCALE
   */
  locale: {
    type: Object as PropType<Partial<Locale>>,
    default: null,
    validate: (val: Object) => {
      return typeof val === "object" && val !== null;
    },
  },

  /**
   * A function to generate tooltip message, with the following arguments: unit: number, dateAsString: string
   * @default TooltipMessageGenerator
   * @default: (unit: number, dateAsString: string) => `${unit} contribution on ${dateAsString}`,
   */
  // Tooltip template
  //
  tooltipMessage: {
    type: Function as PropType<TooltipMessageGenerator>,
    default: (
      noContributions: number,
      unit: ContributionUnit,
      dateAsString: string
    ) =>
      `${noContributions} ${unit.repr}${
        noContributions > 1 && unit?.hasPlural ? unit?.plural : ""
      }  on ${dateAsString}`,
    validate: (fn: TooltipMessageGenerator) => {
      try {
        const resp = fn();
        return typeof resp === "string";
      } catch (error) {}
      return false;
    },
  },

  /**
   * Calendar's state is set to disabled i.e. reactivity is disabled and no events are emited
   * @values Boolean
   * @default false
   */
  noContributionTooltip: {
    type: Function as PropType<TooltipMessageGenerator>,
    default: (
      noContributions: number,
      unit: ContributionUnit,
      dateAsString: string
    ) =>
      `No ${unit.repr}${
        unit?.hasPlural ? unit?.plural : ""
      }  on ${dateAsString}`,
    validate: (fnOrString: string | TooltipMessageGenerator) => {
      try {
        const resp = (fnOrString as () => string)();
        return typeof resp === "string";
      } catch (error) {}
      return false;
    },
  },

  /**
   * Represents the unit of a contribution. Must contain the repr property
   * @values km, job
   * @type ContributionUnit
   * @default defaults/DEFAULT_TOOLTIP_UNIT
   */
  tooltipUnit: {
    type: Object as PropType<ContributionUnit>,
    default: TOOLTIP_UNIT,
    validate: (val: ContributionUnit) => {
      return Object.prototype.hasOwnProperty.call(val, 'repr');
    },
  },

  /**
   * Calendar orientation
   * @values row and column
   * @type Orientation
   * @default false
   */
  // Calendar
  orientation: {
    type: String as PropType<Orientation>,
    default: 'row',
    validate: (or: Orientation) => {
      return ["row", "column"].includes(or);
    },
  },

  /**
   * Show no tooltip for empty dates
   * @values Boolean
   * @default false
   */
  showNoContributionTooltip: {
    type: Boolean,
    default: false,
  },

  /**
   * Specify the radius for a date
   * @values Number >= 0
   * @default 2
   */
  radius: {
    type: Number,
    default: 2,
  },

  /**
   * Trigger dark mode manually. Uses dark mode styling.
   * @values Boolean
   * @default false
   */
  darkmode: Boolean,

  /**
   * Reverse the direction of the legend. Default is right in horizontal mode, top in vertical mode.
   * @values Boolean
   * @default false
   */
  legendDirection: Boolean,

  /**
   * Calendar state is in interactive mode i.e. hover effects work and events are being emitted
   * @values Boolean
   * @default true
   */
  interactiveMode: {
    type: Boolean,
    default: true,
  },

  /**
   * Leave a visual gap between each month
   * @values A numerical value in px unit
   * @default 0
   */
  gapMonths: {
    type: Number,
    default: 0,
    validate: (val: number) => {
      return val > 0;
    }
  },

  /**
   * Leave a visual gap between each week
   * @values A numerical value in px unit
   * @default 0
   */
  gapWeeks: {
    type: Number,
    default: 0,
    validate: (val: number) => {
      return val > 0;
    }
  },

  /**
   * Specify the color palette, 5 values. If not specified palette is generated by interpolating between minColor and maxColor
   * @default defaults/RANGE_COLOR_LIGHT
   */
  colors: {
    type: Array as PropType<Color[]>,
    default: RANGE_COLOR_LIGHT,
    validate: (val: Color[]) => {
      if (!(val.length === 5)) {
        return false;
      }
      return true;
    },
  },

  /**
   * Specify the dark color palette, 5 values. If not specified palette is generated by interpolating between minColorDark and maxColorDark
   * @default Heatmap.DEFAULT_RANGE_COLOR_DARK
   */
  darkColors: {
    type: Array as PropType<Color[]>,
    default: RANGE_COLOR_DARK,
    validate: (val: Color[]) => {
      if (!(val.length === 5)) {
        return false;
      }
      return true;
    },
  },

  /**
   * Set min color for light mode
   */
  minColor: {
    type: Object as PropType<Color>,
    validate: (val: Color) => {
      return validateColor(val);
    },
  },

  /**
   * Set max color for light mode
   */
  maxColor: {
    type: Object as PropType<Color>,
    validate: (val: Color) => {
      return validateColor(val);
    },
  },

  /**
   * Set min color for dark mode
   */
  minColorDark: {
    type: Object as PropType<Color>,
    validate: (val: Color) => {
      return validateColor(val);
    },
  },

  /**
   * Set max color for dark mode
   */
  maxColorDark: {
    type: Object as PropType<Color>,
    validate: (val: Color) => {
      return validateColor(val);
    },
  },

  /**
   * First day of the week
   * Due to cultural and historical reasons in most calendars the start of the week is Saturday, Sunday or Monday.
   * ISO 8601 standard specifies Monday as the first day of the week and is numbered as 1.
   * @values A number between 1 and 7, 1 being Monday, 2 Tuesday, etc.
   * @default 1
   * @see See [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
   */
  weekStart: {
    type: Number,
    default: WEEK_FIRST_DAY,
    validate: (val: DayOfWeek) => {
      return val >= 1 && val <= 7;
    },
  },

  /**
   * Show weeks
   * @default true
   * @see See [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
   */
  hideDaysText: Boolean,

  /**
   * Show weeks
   * @default true
   * @see See [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
   */
  hideMonthsText: Boolean,

  /**
   * Show weeks
   * @default true
   * @see See [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
   */
  hideRange: Boolean,
};
