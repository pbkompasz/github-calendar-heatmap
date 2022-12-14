<template>
  <div
    :class="{ 'calendar': true, 'calendar--dark': darkMode, 'calendar--no_interact': noInteract, 'calendar--vertical': vertical === true }">

    {{ darkMode }}
    {{monthsLabelWrapperTransform}}
    {{daysLabelWrapperTransform}}
    <svg class="calendar__wrapper" ref="svg" :viewBox="viewbox">

      <!-- MONTHS -->
      <g class="calendar__months" :transform="monthsLabelWrapperTransform">
        <text class="calendar__months__label" :class="{'calendar__months--dark': darkMode}" v-for="(month, index) in heatmap.firstFullWeekOfMonths" :key="index"
          :x="getMonthLabelPosition(month).x" :y="getMonthLabelPosition(month).y">
          {{ lo.months[month.value] }}
        </text>
      </g>

      <!-- DAYS -->
      <g class="calendar__days" :transform="daysLabelWrapperTransform">
        <!-- Days that appear on the left side of the calendar -->
        <template v-for="i in Array(7).keys()" :key="i">
          <text class="calendar__days__label" :class="{'calendar__months--dark': darkMode}" :x="vertical ? SQUARE_SIZE * i : 0"
            :y="vertical ? SQUARE_SIZE - SQUARE_BORDER_SIZE : (8 + i * SQUARE_SIZE)">
            <slot :name="'day-' + i">
              <template v-if="[1, 3, 5].includes(i)">
                {{ lo.days[i] }}
              </template>
            </slot>
          </text>
        </template>
      </g>

      <!-- VERTICAL CALENDAR -->
      <g v-if="vertical" class="vch__legend__wrapper" :transform="legendWrapperTransform">
        <text :x="SQUARE_SIZE * 1.25" y="8">{{ lo.less }}</text>
        <rect v-for="(color, index) in rangeColor" :key="index" :rx="radiusX" :ry="radiusY" :style="{ fill: color }"
          :width="SQUARE_SIZE - SQUARE_BORDER_SIZE" :height="SQUARE_SIZE - SQUARE_BORDER_SIZE" :x="SQUARE_SIZE * 1.75"
          :y="SQUARE_SIZE * (index + 1)" />
        <text :x="SQUARE_SIZE * 1.25" :y="SQUARE_SIZE * (rangeColor.length + 2) - SQUARE_BORDER_SIZE">
          {{ lo.more }}
        </text>
      </g>

      <!-- MAIN CALENDAR -->
      <g
        class="calendar__main__year"
        :transform="yearWrapperTransform"
      >
        <g
          class="calendar__main__year__month"
          v-for="(week, weekIndex) in heatmap.calendar"
          :key="weekIndex"
          :transform="getWeekPosition(weekIndex)"
        >
          <template
            v-for="(day, dayIndex) in week"
            :key="dayIndex"
          >
            <rect
              class="calendar__main__year__month__day"
              :class="{'calendar__main__year__month__day--dark': darkMode}"
              v-if="day.date < now"
              :rx="radiusX"
              :ry="radiusY"
              :transform="getDayPosition(dayIndex)"
              :width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
              :height="SQUARE_SIZE - SQUARE_BORDER_SIZE"
              :style="{ fill: rangeColor[day.colorIndex] }"
              :data-tippy-content="tooltipOptions(day)"
              @click="emitEvent(day)"
            />
          </template>
        </g>
      </g>
    </svg>

    <!-- LEGEND -->
    <slot name="footer">
      <div class="calendar__footer">

      <slot name="footer-link">
        <a
          class="calendar__footer__link"
          :class="{'calendar__footer__link--dark': darkMode}"
          href="link"
        >
          link here
        </a>
              
      </slot>
    <div
      v-if="!vertical"
      :class="`calendar__footer__legend calendar__footer__legend-${(legendDirectionReverse ? (vertical ? 'bottom' : 'left') : (vertical ? 'top' : 'right'))}`"
    >
      <div :class="{'calendar__footer__legend__less--dark': darkMode}">
        <slot name="legend-text-less">
          {{ lo.less }}
        </slot>
      </div>

        <slot name="legend-range">
          <svg
            v-if="!vertical"
            class="vch__external-legend-wrapper"
            :viewBox="legendViewbox"
            :height="SQUARE_SIZE - SQUARE_BORDER_SIZE"
          >
            <g class="vch__legend__wrapper">
              <rect
                v-for="(color, index) in rangeColor"
                :key="index"
                :rx="radiusX"
                :ry="radiusY"
                :style="{ fill: color }"
                :width="SQUARE_SIZE - SQUARE_BORDER_SIZE"
                :height="SQUARE_SIZE - SQUARE_BORDER_SIZE"
                :x="SQUARE_SIZE * index"
              />
            </g>
          </svg>
        </slot>

        <div :class="{'calendar__footer__legend__more--dark': darkMode}">
          <slot name="legend-text-more">
            {{ lo.more }}
          </slot>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted, PropType, ref, toRef, toRefs, watch, computed, useSlots } from 'vue';
import { CalendarItem, Heatmap, Locale, Month, TooltipFormatter, Value } from '@/components/Heatmap';
import Tooltip from '@/components/Tooltip.vue';
import { parseRadius, validateRadius } from '@/util';

const props = defineProps({
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
  rangeColor: {
    type: Array as PropType<string[]>,
    default: Heatmap.DEFAULT_RANGE_COLOR_LIGHT,
  },
  // Main values
  values: {
    type: Array as PropType<Value[]>,
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
    default: '20%',
    validator: (val: string) => {

      return validateRadius(val);

    },
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
  }
});
const SQUARE_BORDER_SIZE = Heatmap.SQUARE_SIZE / 5,
  SQUARE_SIZE = Heatmap.SQUARE_SIZE + SQUARE_BORDER_SIZE,
  LEFT_SECTION_WIDTH = Math.ceil(Heatmap.SQUARE_SIZE * 2.5),
  RIGHT_SECTION_WIDTH = SQUARE_SIZE * 3,
  TOP_SECTION_HEIGHT = Heatmap.SQUARE_SIZE + (Heatmap.SQUARE_SIZE / 2),
  BOTTOM_SECTION_HEIGHT = Heatmap.SQUARE_SIZE + (Heatmap.SQUARE_SIZE / 2),
  yearWrapperTransform = `translate(${LEFT_SECTION_WIDTH}, ${TOP_SECTION_HEIGHT})`,

  svg = ref<null | SVGElement>(null),
  now = ref(new Date()),
  dayPositions = ref([8, 20, 32, 44, 56, 68, 80]),

  width = ref(0),
  height = ref(0),
  daysLabelWrapperTransform = ref(''),
  monthsLabelWrapperTransform = ref('');

const { values, tooltipUnit, tooltipFormatter, noDataText, max, vertical, locale, legendDirectionReverse, rangeColor, darkMode } = toRefs(props);

const slots = useSlots();

const tooltipOptions = (day: CalendarItem) => {
  return;
  // if (props.tooltip && !props.noInteract) {
  //   // slots like: 'tooltip-2022-3-3'
  //   const tooltipForDate = `tooltip-${day.date.getFullYear()}-${day.date.getUTCMonth() + 1}-${day.date.getUTCDate()}`
  //   if (slots[tooltipForDate]) {
  //     console.log(slots[tooltipForDate]?.()[0])
  //     return slots[tooltipForDate]?.()[0].children
  //   }
  //   if (day.count !== undefined) {
  //     if (props.tooltipFormatter) {
  //       return props.tooltipFormatter(day, props.tooltipUnit);
  //     }
  //     if (slots['tooltip-active']) {
  //       return slots['tooltip-active']()[0].children
  //     }
  //     return `<b>${day.count} ${props.tooltipUnit}</b> ${lo.value.on} ${lo.value.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`;
  //   } else if (props.noDataText) {
  //     return `${props.noDataText}`;
  //   } else if (props.noDataText !== false) {
  //     if (slots['tooltip-inactive']) {
  //       return slots['tooltip-inactive']()[0].children
  //     }
  //     return `<b>No ${props.tooltipUnit}</b> ${lo.value.on} ${lo.value.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`;
  //   }
  // }
  // return undefined;
}

const getWeekPosition = (index: number) => {
  if (props.vertical) {
    return `translate(0, ${(SQUARE_SIZE * heatmap.value.weekCount) - ((index + 1) * SQUARE_SIZE)})`;
  }
  return `translate(${index * SQUARE_SIZE}, 0)`;
}

const getDayPosition = (index: number) => {
  if (props.vertical) {
    return `translate(${index * SQUARE_SIZE}, 0)`;
  }
  return `translate(0, ${index * SQUARE_SIZE})`;
}

const getMonthLabelPosition = (month: Month) => {
  if (props.vertical) {
    return { x: 3, y: (SQUARE_SIZE * heatmap.value.weekCount) - (SQUARE_SIZE * (month.index)) - (SQUARE_SIZE / 4) };
  }
  return { x: SQUARE_SIZE * month.index, y: SQUARE_SIZE - SQUARE_BORDER_SIZE };
}

watch([toRef(props, 'rangeColor'), toRef(props, 'darkMode')], ([rc, dm]) => {
  rangeColor.value = rc || (dm ? Heatmap.DEFAULT_RANGE_COLOR_DARK : Heatmap.DEFAULT_RANGE_COLOR_LIGHT);
});

const viewbox = computed(() => {
  return ` 0 0 ${width.value} ${height.value}`
})

const legendWrapperTransform = computed(() => {
  return vertical.value
    ? `translate(${LEFT_SECTION_WIDTH + (SQUARE_SIZE * Heatmap.DAYS_IN_WEEK)}, ${TOP_SECTION_HEIGHT})`
    : `translate(${width.value - (SQUARE_SIZE * rangeColor.value.length) - 30}, ${height.value - BOTTOM_SECTION_HEIGHT})`
})

const legendViewbox = computed(() => {
  return `0 0 ${Heatmap.SQUARE_SIZE * (rangeColor.value.length + 1) ?? 0} ${Heatmap.SQUARE_SIZE ?? 0}`
})

// Locale Months, days, etc.
const lo = computed(() => {
  return locale.value ? { ...Heatmap.DEFAULT_LOCALE, ...locale.value } : Heatmap.DEFAULT_LOCALE
})

const heatmap = computed(() => {
  return new Heatmap(props.endDate, values.value, props.startDate, props.max)
})

watch(vertical, (v) => {
  if (v) {
    width.value = LEFT_SECTION_WIDTH + (SQUARE_SIZE * Heatmap.DAYS_IN_WEEK) + RIGHT_SECTION_WIDTH;
    height.value = TOP_SECTION_HEIGHT + (SQUARE_SIZE * heatmap.value.weekCount) + SQUARE_BORDER_SIZE;
    daysLabelWrapperTransform.value = `translate(${LEFT_SECTION_WIDTH}, 0)`;
    monthsLabelWrapperTransform.value = `translate(0, ${TOP_SECTION_HEIGHT})`;
  } else {
    width.value = LEFT_SECTION_WIDTH + (SQUARE_SIZE * heatmap.value.weekCount) + SQUARE_BORDER_SIZE;
    height.value = TOP_SECTION_HEIGHT + (SQUARE_SIZE * Heatmap.DAYS_IN_WEEK);
    daysLabelWrapperTransform.value = `translate(0, ${TOP_SECTION_HEIGHT})`;
    monthsLabelWrapperTransform.value = `translate(${LEFT_SECTION_WIDTH}, 0)`;
  }
}, { immediate: true });

const emit = defineEmits(['dayClick']);
const emitEvent = (day: any) => {
  if (!props.noInteract)
    emit('dayClick', day)
}

// Radius for every day rectangle
const { radiusX, radiusY, } = parseRadius(props.radius);
</script>

<style lang="scss">

.calendar--no_interact {
  Text-Decoration: None !important;
  pointer-events: none;
}

.calendar {
  max-width: 675px;
}

.calendar--vertical {
  max-width: 145px;
}

.calendar__days, .calendar__months {
  font-size: 9px;
}

.calendar__months__label,
.calendar__days__label,
.vch__legend__wrapper text {
  fill: #767676;
}

.calendar__main__year__month__day:hover {
  stroke: #555;
  stroke-width: 2px;
  paint-order: stroke;
}
.calendar__main__year__month__day:focus {
  outline: none;
}

.calendar__footer {
  display: flex;
  padding-left: 25px;
  padding-right: 10px;
}

.calendar__footer__legend {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: auto;

  &.--left {
    flex-direction: row;
  }
}

.vch__external-legend-wrapper {
  margin: 0 8px;
}

.calendar__wrapper {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 10px;
  width: 100%;

  
}

.calendar--dark,
.calendar__days--dark,
.calendar__months--dark {
  fill: #fff;
}

.calendar__footer__link {
  text-decoration: none;
}

.calendar__footer__link--dark,
.calendar__footer__legend__less--dark,
.calendar__footer__legend__more--dark {
  color: #fff;
}
</style>
