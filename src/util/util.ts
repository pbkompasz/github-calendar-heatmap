import type { Color, ColorRgb } from '../heatmap/types';

export const isColor = (color: Color | string) => {
  return !(typeof color === 'string');
}

const hexToRgb = (colorHex: Color): ColorRgb => {
  return  {
    r : parseInt(colorHex.substring(1, 3) , 16),
    g : parseInt(colorHex.substring(3, 5) , 16),
    b : parseInt(colorHex.substring(5, 7) , 16),
  }
}

const rgbToHex = (colorRgb: ColorRgb): Color => {
  return `#${colorRgb.r.toString(16)}${colorRgb.g.toString(16)}${colorRgb.b.toString(16)}`;
}


export const createColorRange = (minColor: ColorRgb, maxColor: ColorRgb, steps: number) => {
  const {r: r1, g: g1, b: b1} = minColor;
  const {r: r2, g: g2, b: b2} = maxColor;
  
  // Calculate the step size for each channel
  const stepSizeR = (r2 - r1) / (steps + 1);
  const stepSizeG = (g2 - g1) / (steps + 1);
  const stepSizeB = (b2 - b1) / (steps + 1);

  // Generate the interpolated colors
  const interpolatedColors = Array.from({ length: steps }, (_, i) => [
      Math.round(r1 + stepSizeR * (i + 1)),
      Math.round(g1 + stepSizeG * (i + 1)),
      Math.round(b1 + stepSizeB * (i + 1))
  ]);

  return interpolatedColors;
}

// Locales
import { Heatmap } from '../heatmap/heatmap';

const getMonthNames = (language = 'en-US') => {
  const months = [];

  const objDate = new Date();
  objDate.setDate(1);

  for (let i = 0; i < 12; i++) {
    objDate.setMonth(i);
    months.push(objDate.toLocaleString(language, { month: "long" }));
  }

  return months;
}

const getWeekdayNames = (language = 'en-US') => {
  const weekdays = [];
  const d = new Date('12/4/2022');

  for (let i = 0; i < 7; i++) {
    weekdays.push(d.toLocaleString(language, {weekday: 'long'}));
    d.setDate(d.getDate() + 1);
  }

  return weekdays;
}

export const getLocale = async (language = 'en-US') => {
    try {
      // TODO i18n
      // const { useI18n } =  require('vue-i18n');
      // const $t = useI18n() ?? {};
      // const userDefinedLocale: Locale = {
      //   months: $t.months ?? Heatmap.DEFAULT_LOCALE.months,
      //   days  : $t.days ?? Heatmap.DEFAULT_LOCALE.days,
      //   on  : $t.on ?? 'on',
      //   less  : $t.less ?? 'Less',
      //   more  : $t.more ?? 'More',
      // };
      // const userDefinedLocale: Locale = {
      //   months: $t?.months,
      //   days  : $t?.days,
      //   on  : $t?.on,
      //   less  : $t?.less,
      //   more  : $t?.more,
      // };

      const locale = {
        months: getMonthNames(language) ?? Heatmap.DEFAULT_LOCALE.months,
        days: getWeekdayNames(language) ?? Heatmap.DEFAULT_LOCALE.months,
        on: Heatmap.DEFAULT_LOCALE.on,
        less: Heatmap.DEFAULT_LOCALE.less,
        more: Heatmap.DEFAULT_LOCALE.more,
      }
      
      return locale;
    } catch (error) {
      console.log(error)
      console.log('No i18n');
    }
  } 
