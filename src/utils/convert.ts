// src/utils/convert.ts
import { CategoryDef, UnitDef } from "@/constants/units";

// ---------- Temperature (does NOT use factor math) ----------
function celsiusToFahrenheit(c: number) {
  return (c * 9) / 5 + 32;
}
function fahrenheitToCelsius(f: number) {
  return ((f - 32) * 5) / 9;
}
function celsiusToKelvin(c: number) {
  return c + 273.15;
}
function kelvinToCelsius(k: number) {
  return k - 273.15;
}

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;

  // Normalize input to Celsius first
  let celsius: number;
  if (from === "C") celsius = value;
  else if (from === "F") celsius = fahrenheitToCelsius(value);
  else celsius = kelvinToCelsius(value); // from === "K"

  // Then convert Celsius to the target unit
  if (to === "C") return celsius;
  if (to === "F") return celsiusToFahrenheit(celsius);
  return celsiusToKelvin(celsius); // to === "K"
}

// Kelvin (and its Celsius/Fahrenheit equivalents) can never go below absolute zero
export function isValidTemperature(value: number, unit: string): boolean {
  if (unit === "K") return value >= 0;
  if (unit === "C") return value >= -273.15;
  if (unit === "F") return value >= -459.67;
  return true;
}

// ---------- General factor-based conversion (Length, Weight, Area, Volume, Speed, Time, Digital) ----------
// General formula: Result = Input × FromFactor ÷ ToFactor  (via the category's base unit)
function convertByFactor(value: number, fromUnit: UnitDef, toUnit: UnitDef): number {
  return (value * fromUnit.factor) / toUnit.factor;
}

// ---------- Public entry point ----------
export function convertValue(
  category: CategoryDef,
  value: number,
  fromUnitValue: string,
  toUnitValue: string
): number | null {
  if (isNaN(value)) return null;

  if (category.isTemperature) {
    if (!isValidTemperature(value, fromUnitValue)) return null;
    return convertTemperature(value, fromUnitValue, toUnitValue);
  }

  const fromUnit = category.units.find((u) => u.value === fromUnitValue);
  const toUnit = category.units.find((u) => u.value === toUnitValue);
  if (!fromUnit || !toUnit) return null;

  return convertByFactor(value, fromUnit, toUnit);
}

// ---------- Display formatting ----------
// Rounds ONLY for display — never during intermediate calculation.
// Trims trailing zeros: 6.0000 -> "6", 6.2500 -> "6.25"
export function formatResult(value: number, decimalPlaces: number): string {
  if (!isFinite(value)) return "—";

  const abs = Math.abs(value);

  // Extremely large/small values use scientific notation
  if (value !== 0 && (abs >= 1e9 || abs < 1e-6)) {
    return value.toExponential(decimalPlaces);
  }

  const fixed = value.toFixed(decimalPlaces);
  // Strip trailing zeros, then a trailing dot if left over
  return fixed.replace(/\.?0+$/, "") || "0";
}