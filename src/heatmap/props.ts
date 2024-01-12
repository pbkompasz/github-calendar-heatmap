import { PropType } from "vue";
import { Heatmap } from "./heatmap";
import type { Color, Locale, TooltipFormatter, Value } from "./types";
import { isColor } from "../util/util";

type Orientation = 'row' | 'row-reverse' | 'column' | 'column-reverse';

interface Contribution {

};

export default {
  // Calendar end date
  // If not specified, first day from contributions, if no dates 1 year - today
  startDate: {
    type: Date,
    default: null,
  },
  // If not specified => last day from contribution, if no dates => today
  endDate: {
    type: Date,
    // required: true,
    default: new Date(),
  },
  // Max number of events per date
  max: {
    type: Number,
    default: 999,
  },
  // Main values
  contributions: {
    type: Array as PropType<Contribution[]>,
    default: [],
    required: true
  },
  // Locale object, contains Months, Week, contribution template, no-contribution template, default is english
  locale: {
    type: Object as PropType<Partial<Locale>>,
    default: null,
  },
  // Tooltip template
  // 
  tooltip: {
    type: [String, Boolean, Object as PropType<string>],
    default: true
  },
  noContributionTooltip: {
    type: [String, Function, String],
    default: "No {unit} on {date}",
  },
  tooltipUnit: {
    type: String,
    default: Heatmap.DEFAULT_TOOLTIP_UNIT
  },
  // Custom text format for active/inactive days
  tooltipFormatter: {
    type: Function as PropType<TooltipFormatter>
  },
  // Calendar orientation
  orientation: {
    type: String as PropType<Orientation>,
    default: false,
    validate: (or: Orientation) => {
      return ['row', 'row-reverse', 'column', 'column-reverse'].includes(or); 
    }
  },
  // Show no tooltip for empty dates
  showNoContributionTooltip: {
    type: Boolean,
    default: false,
  },
  // Rounded corner for each date
  // Takes ame values as border-radius html attribute
  radius: {
    type: [String, Number,],
    default: '2',
  },
  darkMode: Boolean,
  // default is right if horizontal, top if vertical
  legendDirection: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },
  // No hover effect, no tooltip, no click event emit
  noInteract: {
    type: Boolean,
    default: false,
  },
  monthWithYear: {
    type: Boolean,
    default: false,
  },
  // Not supported for partials
  gapMonths: {
    type: Number,
    default: 0,
  },
  // day, week, month
  // Show one popup for the group
  groupTooltip: {
    type: String,
    default: 'day',
  },
  // Specify the default color object (5 values) with partial or complete object
  // If not specified => interpolate from minColor..maxColor
  colors: {
    type: Array,
    default: null,
    validate: (val: Color[]) => {
      if (!(val.length === 5)) {
        return false;
      }
      return true;
    }
  },
  // Specify the dark color object with partial or complete object
  // Dark color can be triggered manually, by default it listenes to system
  darkColors: {
    type: Array,
    default: null,
    validate: (val: Color[]) => {
      if (!(val.length === 5)) {
        return false;
      }
      return true;
    }
  },
  // Set max color
  minColor: {
    type: String,
    default: null,
    validate: (val: Color) => {
      return isColor(val);
    }
  },
  // Set max color
  maxColor: {
    type: String,
    default: null,
    validate: (val: Color) => {
      return isColor(val);
    }
  },
  // Set max color w/ dark mode
  minColorDark: {
    type: String,
    default: null,
    validate: (val: Color) => {
      return isColor(val);
    }
  },
  // Set max color w/ dark mode
  maxColorDark: {
    type: String,
    default: null,
    validate: (val: Color) => {
      return isColor(val);
    }
  },

  // px or rem
  monthsGap: {

  },

  // px or rem
  weeksGap: {

  },

  disabled: {
    type: Boolean,
    default: true,
  }
}