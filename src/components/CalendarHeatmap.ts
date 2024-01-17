// <template>
//   <div>

//   </div>
// </template>

// <script setup lang="ts">
// import { defineComponent, nextTick, onBeforeUnmount, onMounted, PropType, ref, toRef, toRefs, watch, computed, useSlots } from 'vue';
// import { Heatmap, } from '../heatmap/heatmap';
// import type { CalendarItem, Locale, Month, TooltipFormatter, Value } from '../heatmap/types';
// import { Ref } from 'vue';
// import Props from '../heatmap/props';
// // import tippy from 'tippy.js';
// // import 'tippy.js/dist/tippy.css';

// type Color = `#${string}`;

// const props = defineProps(Props);

// const SQUARE_BORDER_SIZE = Heatmap.SQUARE_SIZE / 5,
//   SQUARE_SIZE = Heatmap.SQUARE_SIZE + SQUARE_BORDER_SIZE,
//   LEFT_SECTION_WIDTH = Math.ceil(Heatmap.SQUARE_SIZE * 2.5),
//   RIGHT_SECTION_WIDTH = SQUARE_SIZE * 3,
//   TOP_SECTION_HEIGHT = Heatmap.SQUARE_SIZE + (Heatmap.SQUARE_SIZE / 2),
//   BOTTOM_SECTION_HEIGHT = Heatmap.SQUARE_SIZE + (Heatmap.SQUARE_SIZE / 2),
//   yearWrapperTransform = `translate(${LEFT_SECTION_WIDTH}, ${TOP_SECTION_HEIGHT})`,

//   svg = ref<null | SVGElement>(null),
//   now = ref(new Date()),
//   dayPositions = ref([8, 20, 32, 44, 56, 68, 80]),

//   width = ref(0),
//   height = ref(0),
//   daysLabelWrapperTransform = ref(''),
//   monthsLabelWrapperTransform = ref('');

// const { contributions, tooltipUnit, tooltipFormatter, noDataText, max, vertical, locale, legendDirectionReverse, darkMode, radius, colors, darkColors, lightColors, } = toRefs(props);

// const rangeColor = ref(Heatmap.DEFAULT_RANGE_COLOR_LIGHT) as Ref<Color[]>;

// const language = computed(() => {
//   // const locale = Heatmap.DEFAULT_LOCALE;
//   let language = 'en-US';

//   if (navigator.languages && navigator.languages.length > 0) {
//     language = navigator.languages[0];
//   } else if (navigator.language) {
//     language = navigator.language;
//   }

//   return language;
// })

// onMounted(() => {
//   const createTooltip = (dateOrAlias: string | Date) => {
//     let id;
//     if (typeof dateOrAlias === 'string') {
//       id = dateOrAlias
//     } else {
//       id = `_${dateOrAlias.valueOf()}`;
//     }
//     return id;
//   }
//   // tippy(`#${createTooltip(new Date(2022, 0, 23))}`, {
//   //   content: 'My tooltip!',
//   // });
// })

// const slots = useSlots();

// const tooltipOptions = (day: CalendarItem) => {
//   return;
//   // if (props.tooltip && !props.noInteract) {
//   //   // slots like: 'tooltip-2022-3-3'
//   //   const tooltipForDate = `tooltip-${day.date.getFullYear()}-${day.date.getUTCMonth() + 1}-${day.date.getUTCDate()}`
//   //   if (slots[tooltipForDate]) {
//   //     console.log(slots[tooltipForDate]?.()[0])
//   //     return slots[tooltipForDate]?.()[0].children
//   //   }
//   //   if (day.count !== undefined) {
//   //     if (props.tooltipFormatter) {
//   //       return props.tooltipFormatter(day, props.tooltipUnit);
//   //     }
//   //     if (slots['tooltip-active']) {
//   //       return slots['tooltip-active']()[0].children
//   //     }
//   //     return `<b>${day.count} ${props.tooltipUnit}</b> ${lo.value.on} ${lo.value.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`;
//   //   } else if (props.noDataText) {
//   //     return `${props.noDataText}`;
//   //   } else if (props.noDataText !== false) {
//   //     if (slots['tooltip-inactive']) {
//   //       return slots['tooltip-inactive']()[0].children
//   //     }
//   //     return `<b>No ${props.tooltipUnit}</b> ${lo.value.on} ${lo.value.months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`;
//   //   }
//   // }
//   // return undefined;
// }

// const getWeekPosition = (index: number) => {
//   if (props.vertical) {
//     return `translate(0, ${(SQUARE_SIZE * heatmap.value.weekCount) - ((index + 1) * SQUARE_SIZE)})`;
//   }
//   // TODO
//   const weekGap = 0;
//   return `translate(${index * (SQUARE_SIZE + weekGap)}, 0)`;
// }

// const getDayPosition = (index: number) => {
//   if (props.vertical) {
//     return `translate(${index * SQUARE_SIZE}, 0)`;
//   }
//   return `translate(0, ${index * SQUARE_SIZE})`;
// }

// const getMonthLabelPosition = (month: Month) => {
//   if (props.vertical) {
//     return { x: 3, y: (SQUARE_SIZE * heatmap.value.weekCount) - (SQUARE_SIZE * (month.index)) - (SQUARE_SIZE / 4) };
//   }
//   return { x: SQUARE_SIZE * month.index, y: SQUARE_SIZE - SQUARE_BORDER_SIZE };
// }

// watch([colors, darkColors, lightColors, toRef(props, 'darkMode')], ([c, darkC, lightC, darkMode]) => {
//   console.log(darkMode);
//   if (colors.value) {
//     rangeColor.value = colors.value as Color[];
//     return;
//   }
//   if (darkMode) {
//     rangeColor.value = darkC as Color[] ?? Heatmap.DEFAULT_RANGE_COLOR_DARK;
//   } else {
//     rangeColor.value = lightC as Color[] ?? Heatmap.DEFAULT_RANGE_COLOR_LIGHT;
//   }
//   console.log(rangeColor);
// });

// const viewbox = computed(() => {
//   return ` 0 0 ${width.value} ${height.value}`
// })

// const legendWrapperTransform = computed(() => {
//   return vertical.value
//     ? `translate(${LEFT_SECTION_WIDTH + (SQUARE_SIZE * Heatmap.DAYS_IN_WEEK)}, ${TOP_SECTION_HEIGHT})`
//     : `translate(${width.value - (SQUARE_SIZE * rangeColor.value.length) - 30}, ${height.value - BOTTOM_SECTION_HEIGHT})`
// })

// const legendViewbox = computed(() => {
//   return `0 0 ${Heatmap.SQUARE_SIZE * (rangeColor.value.length + 1) ?? 0} ${Heatmap.SQUARE_SIZE ?? 0}`
// })

// // Locale Months, days, etc.
// const lo = computed(() => {
//   return locale.value ? { ...Heatmap.DEFAULT_LOCALE, ...locale.value } : Heatmap.DEFAULT_LOCALE
// })

// const heatmap = computed(() => {
//   return new Heatmap(props.endDate, contributions.value, props.startDate, props.max)
// })

// watch(vertical, (v) => {
//   if (v) {
//     width.value = LEFT_SECTION_WIDTH + (SQUARE_SIZE * Heatmap.DAYS_IN_WEEK) + RIGHT_SECTION_WIDTH;
//     height.value = TOP_SECTION_HEIGHT + (SQUARE_SIZE * heatmap.value.weekCount) + SQUARE_BORDER_SIZE;
//     daysLabelWrapperTransform.value = `translate(${LEFT_SECTION_WIDTH}, 0)`;
//     monthsLabelWrapperTransform.value = `translate(0, ${TOP_SECTION_HEIGHT})`;
//   } else {
//     width.value = LEFT_SECTION_WIDTH + (SQUARE_SIZE * heatmap.value.weekCount) + SQUARE_BORDER_SIZE;
//     height.value = TOP_SECTION_HEIGHT + (SQUARE_SIZE * Heatmap.DAYS_IN_WEEK);
//     daysLabelWrapperTransform.value = `translate(0, ${TOP_SECTION_HEIGHT})`;
//     monthsLabelWrapperTransform.value = `translate(${LEFT_SECTION_WIDTH}, 0)`;
//   }
// }, { immediate: true });

// const emit = defineEmits(['dayClick']);
// const emitEvent = (day: any) => {
//   if (!props.noInteract)
//     emit('dayClick', day)
// }

// // A day can be accessed by alias or date e.g. '<YEAR>-<MONTH>-<DAY>'
// const createId = (day: any) => {
//   if (day?.alias) return day.alias;
//   const id = `_${day.date.valueOf()}`;
//   return id;
// }

// </script>

// <style lang="scss">
// .calendar--no_interact {
//   Text-Decoration: None !important;
//   pointer-events: none;
// }

// .calendar {
//   max-width: 675px;
//   overflow-x: scroll;
// }

// .calendar__wrapper {
//   min-width: 650px;
//   max-width: 650px;
// }

// .calendar--vertical {
//   max-width: 145px;
// }

// .calendar__days,
// .calendar__months {
//   font-size: 9px;
// }

// .calendar__days {
//   position: absolute;
// }

// @media only screen and (max-width: 675px) {
//   .calendar {
//     background-color: lightblue;
//   }

//   .calendar__footer__legend {
//     position: fixed;
//     right: 15px;
//   }

//   .calendar__footer__link {
//     position: fixed;
//   }

//   .calendar__footer {
//     min-height: 14px;
//   }

//   .calendar__wrapper {
//     left: 25px;
//   }

//   .days {
//     background-color: lightblue;
//   }
// }

// .days {
//   position: absolute;
// }

// .calendar__months__label,
// .calendar__days__label,
// .vch__legend__wrapper text {
//   fill: #767676;
// }

// .calendar__main__year__month__day:hover {
//   stroke: #555;
//   stroke-width: 2px;
//   paint-order: stroke;
// }

// .calendar__main__year__month__day:focus {
//   outline: none;
// }

// .calendar__footer {
//   display: flex;
//   padding-left: 25px;
//   padding-right: 10px;
// }

// .calendar__footer__legend {
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   margin-left: auto;

//   &.--left {
//     flex-direction: row;
//   }
// }

// .vch__external-legend-wrapper {
//   margin: 0 8px;
// }

// .calendar__wrapper {
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//   line-height: 10px;
//   width: 100%;

// }

// .calendar--dark,
// .calendar__days--dark,
// .calendar__months--dark {
//   fill: #fff;
// }

// .calendar__footer__link {
//   text-decoration: none;
// }

// .calendar__footer__link--dark,
// .calendar__footer__legend__less--dark,
// .calendar__footer__legend__more--dark {
//   color: #fff;
// }

// ::-webkit-scrollbar {
//   height: 7px;
// }

// /* Handle */
// ::-webkit-scrollbar-thumb {
//   background: grey;
// }

// .svg {
//   display: inline;
// }
// </style>
// ../heatmap/types../heatmap/props

import { h, ref, computed, watch, defineComponent, toRefs } from "vue";
import Props from "../heatmap/props";
import { Heatmap } from "../heatmap/heatmap";
import { LOCALE, RANGE_COLOR_LIGHT, SQUARE_SIZE } from "../heatmap/defaults";

/**
 * Calendar Heatmap
 * @displayName CalendarHeatmap
 */
export default defineComponent(
  (props) => {
    // use Composition API here like in <script setup>
    const count = ref(0);
    const endDate = ref(new Date("2024-1-1"));
    const startDate = ref(new Date("2024-12-31"));
    const heatmap = new Heatmap(
      [],
      endDate.value as Date,
      startDate.value as Date,
      5,
      LOCALE,
      false,
      RANGE_COLOR_LIGHT,
      1
    );

    return () => {
      const calendar = Heatmap.createCalendarDescriptor(heatmap);
      const svg = Heatmap.createCalendarHTML(calendar, {
        colorPalette: RANGE_COLOR_LIGHT,
      });
      return svg;
    };
  },
  {
    props: Props,
  }
);
