import type { Color, ColorRgb } from './types';

// Styles

const createColor = (init: string = 'null'): ColorRgb => {
  if (init === 'null') {
    return {
      r: 0,
      g: 0,
      b: 0,
      opacity: 1,
    }
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    opacity: 1,
  }
}

const isColor = (color: Color | string) => {
  return !(typeof color === 'string');
}

const subtractColor = (color1: ColorRgb, color2: ColorRgb) => {
  return {
    r: color1.r - color2.r,
    g: color1.g - color2.g,
    b: color1.b - color2.b,
    o: color1.opacity - color2.opacity,
  }
}

const addColor = (color1: ColorRgb, color2: ColorRgb) => {
  return {
    r: color1.r + color2.r,
    g: color1.g + color2.g,
    b: color1.b + color2.b,
    o: color1.opacity + color2.opacity,
  }
}

export const createColorRange = (maxColor: Color | string) => {
  const startColor = createColor();
  maxColor = !(typeof maxColor === 'string') ? maxColor : createColor(maxColor);
}

export const getNames = (locale: `${string}-${string}`) => {
  return null;
}

export const parseRadius = (radiusRaw: string | number) => {
  return {
    radiusX: 0,
    radiusY: 0,
  }
}

export const validateRadius = (radiusRaw: string | number) => {
  return true;
  const radiusRawString = String(radiusRaw);
  if (radiusRawString.search(/%/i) === 0) {
    const value = +radiusRawString.substring(0, radiusRawString.length - 1);
    return (value >= 0 && value <= 100)
  }
  if (radiusRawString.search(/px/i) === 0) {
    const value = +radiusRawString.substring(0, radiusRawString.length - 2);
    return (value >= 0 && value <= 10)
  }
  return false;
}

// Locales
import { Heatmap } from './components/Heatmap';

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
