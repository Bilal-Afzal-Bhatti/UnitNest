// src/constants/units.ts

export type UnitDef = {
  label: string;   // e.g. "Kilometer (km)"
  value: string;   // e.g. "km" — unique key
  factor: number;  // factor to the category's base unit (ignored for temperature)
};

export type CategoryDef = {
  id: string;
  name: string;          // e.g. "Length"
  baseUnit: string;
  units: UnitDef[];
  defaultFrom: string;
  defaultTo: string;
  isTemperature?: boolean;
};

export const CATEGORIES: Record<string, CategoryDef> = {
  length: {
    id: "length",
    name: "Length",
    baseUnit: "meter",
    defaultFrom: "m",
    defaultTo: "ft", // per spec: "App defaults to Meters → Feet"
    units: [
      { label: "Millimeter (mm)", value: "mm", factor: 0.001 },
      { label: "Centimeter (cm)", value: "cm", factor: 0.01 },
      { label: "Meter (m)", value: "m", factor: 1 },
      { label: "Kilometer (km)", value: "km", factor: 1000 },
      { label: "Inch (in)", value: "in", factor: 0.0254 },
      { label: "Foot (ft)", value: "ft", factor: 0.3048 },
      { label: "Yard (yd)", value: "yd", factor: 0.9144 },
      { label: "Mile (mi)", value: "mi", factor: 1609.344 },
    ],
  },

  weight: {
    id: "weight",
    name: "Weight",
    baseUnit: "kilogram",
    defaultFrom: "kg",
    defaultTo: "lb",
    units: [
      { label: "Milligram (mg)", value: "mg", factor: 0.000001 },
      { label: "Gram (g)", value: "g", factor: 0.001 },
      { label: "Kilogram (kg)", value: "kg", factor: 1 },
      { label: "Metric Ton (t)", value: "t", factor: 1000 },
      { label: "Ounce (oz)", value: "oz", factor: 0.028349523125 },
      { label: "Pound (lb)", value: "lb", factor: 0.45359237 },
      { label: "Stone (st)", value: "st", factor: 6.35029318 },
    ],
  },

  temperature: {
    id: "temperature",
    name: "Temperature",
    baseUnit: "celsius",
    defaultFrom: "C",
    defaultTo: "F",
    isTemperature: true,
    units: [
      { label: "Celsius (°C)", value: "C", factor: 1 },
      { label: "Fahrenheit (°F)", value: "F", factor: 1 },
      { label: "Kelvin (K)", value: "K", factor: 1 },
    ],
  },

  area: {
    id: "area",
    name: "Area",
    baseUnit: "square meter",
    defaultFrom: "m2",
    defaultTo: "ft2",
    units: [
      { label: "Square Centimeter (cm²)", value: "cm2", factor: 0.0001 },
      { label: "Square Meter (m²)", value: "m2", factor: 1 },
      { label: "Square Kilometer (km²)", value: "km2", factor: 1000000 },
      { label: "Square Inch (in²)", value: "in2", factor: 0.00064516 },
      { label: "Square Foot (ft²)", value: "ft2", factor: 0.09290304 },
      { label: "Square Yard (yd²)", value: "yd2", factor: 0.83612736 },
      { label: "Acre (ac)", value: "ac", factor: 4046.8564224 },
      { label: "Hectare (ha)", value: "ha", factor: 10000 },
      { label: "Square Mile (mi²)", value: "mi2", factor: 2589988.110336 },
    ],
  },

  volume: {
    id: "volume",
    name: "Volume",
    baseUnit: "liter",
    defaultFrom: "L",
    defaultTo: "us_gal",
    units: [
      { label: "Milliliter (mL)", value: "mL", factor: 0.001 },
      { label: "Liter (L)", value: "L", factor: 1 },
      { label: "Cubic Meter (m³)", value: "m3", factor: 1000 },
      { label: "US Teaspoon (tsp)", value: "us_tsp", factor: 0.00492892159375 },
      { label: "US Tablespoon (tbsp)", value: "us_tbsp", factor: 0.01478676478125 },
      { label: "US Fluid Ounce (fl oz)", value: "us_floz", factor: 0.0295735295625 },
      { label: "US Cup (cup)", value: "us_cup", factor: 0.2365882365 },
      { label: "US Pint (pt)", value: "us_pt", factor: 0.473176473 },
      { label: "US Quart (qt)", value: "us_qt", factor: 0.946352946 },
      { label: "US Gallon (gal)", value: "us_gal", factor: 3.785411784 },
      { label: "UK Gallon (imp gal)", value: "uk_gal", factor: 4.54609 },
    ],
  },

  speed: {
    id: "speed",
    name: "Speed",
    baseUnit: "meter per second",
    defaultFrom: "km/h",
    defaultTo: "mph",
    units: [
      { label: "Meter per Second (m/s)", value: "m/s", factor: 1 },
      { label: "Kilometer per Hour (km/h)", value: "km/h", factor: 0.2777777777778 },
      { label: "Mile per Hour (mph)", value: "mph", factor: 0.44704 },
      { label: "Foot per Second (ft/s)", value: "ft/s", factor: 0.3048 },
      { label: "Knot (kn)", value: "kn", factor: 0.514444444444 },
    ],
  },

  time: {
    id: "time",
    name: "Time",
    baseUnit: "second",
    defaultFrom: "hr",
    defaultTo: "min",
    units: [
      { label: "Millisecond (ms)", value: "ms", factor: 0.001 },
      { label: "Second (s)", value: "s", factor: 1 },
      { label: "Minute (min)", value: "min", factor: 60 },
      { label: "Hour (hr)", value: "hr", factor: 3600 },
      { label: "Day", value: "day", factor: 86400 },
      { label: "Week", value: "week", factor: 604800 },
    ],
  },

  digital: {
    id: "digital",
    name: "Digital Storage",
    baseUnit: "byte",
    defaultFrom: "GB",
    defaultTo: "MB",
    units: [
      { label: "Bit", value: "bit", factor: 0.125 },
      { label: "Byte", value: "byte", factor: 1 },
      { label: "Kilobyte (KB)", value: "KB", factor: 1000 },
      { label: "Megabyte (MB)", value: "MB", factor: 1000000 },
      { label: "Gigabyte (GB)", value: "GB", factor: 1000000000 },
      { label: "Terabyte (TB)", value: "TB", factor: 1000000000000 },
      { label: "Kibibyte (KiB)", value: "KiB", factor: 1024 },
      { label: "Mebibyte (MiB)", value: "MiB", factor: 1048576 },
      { label: "Gibibyte (GiB)", value: "GiB", factor: 1073741824 },
    ],
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);