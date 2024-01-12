type ColorRgb = {
  r: number;
  g: number;
  b: number;
  opacity?: number;
}

type ColorHex = `#${string}`

export type Color = ColorHex

export type MapDate = {
  date: Date;
  data: Object | number | string;
  highlight: boolean; 
}

type Language = string

export interface Value {
	date: Date | string;
	count: number;
}

export interface Activity {
	count: number;
	colorIndex: number;
}

export type Activities = Map<string, Activity>;

export interface CalendarItem {
	date: Date;
	count?: number;
	colorIndex: number;
}

export type Calendar = CalendarItem[][];

export interface Month {
	value: number;
	index: number;
}

export interface Locale {
	months: string[];
	days: string[];
	on: string;
	less: string;
	more: string;
}

export type TooltipFormatter = (item: CalendarItem, unit: string, active: boolean) => string;

