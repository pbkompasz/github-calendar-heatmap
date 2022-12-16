import { PropType } from "vue";
import { Heatmap } from "./Heatmap";
import type { Color, Locale, TooltipFormatter, Value } from "@/types";

export default {
  // Calendar end date
  endDate: {
    type: Date,
    // required: true,
    default: new Date(),
  },
  startDate: {
    type: Date,
    default: null,
  },
  // DUNNO
  max: {
    type: Number
  },
  // Main values
  values: {
    type: Array as PropType<Value[]>,
    default: [],
    required: true
  },
  locale: {
    type: Object as PropType<Partial<Locale>>,
    default: null,
  },
  // Show tooltip
  tooltip: {
    type: Boolean,
    default: true
  },
  tooltipUnit: {
    type: String,
    default: Heatmap.DEFAULT_TOOLTIP_UNIT
  },
  tooltipFormatter: {
    type: Function as PropType<TooltipFormatter>
  },
  // Calendar orientation
  vertical: {
    type: Boolean,
    default: false
  },
  // Tooltip text on date with no data
  noDataText: {
    type: [Boolean, String,],
    default: null
  },
  // Show no tooltip for empty dates
  noDataTooltip: {
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
  legendDirectionReverse: {
    type: Boolean,
    default: false,
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
  gapMonths: {
    type: Number,
    default: 0,
  },
  // day, week, month
  // Show one popup for the group
  groupBy: {
    type: String,
    default: 'day',
  },
  // Overwrite colors for any scenario
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
  lightColors: {
    type: Array,
    default: null,
    validate: (val: Color[]) => {
      if (!(val.length === 5)) {
        return false;
      }
      return true;
    }
  },
}