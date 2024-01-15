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

export type Calendar = CalendarItem[];

export interface Month {
	value: number;
	index: number;
}

export interface Locale {
	months: string[];
	days: string[];
	less: string;
	more: string;
}

export type TooltipFormatter = (item: CalendarItem, unit: string, active: boolean) => string;

export type Orientation = "row" | "column";

export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ContributionUnit = {
  repr: string;
  hasPlural: boolean;
  plural: string;
};

export type TooltipMessageGenerator = (
  noContributions?: number,
  unit?: string,
  dateAsString?: string
) => string;

export interface Contribution {
  date: Date,
  count: number,
}

