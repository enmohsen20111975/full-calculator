export interface Unit {
  symbol: string;
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface UnitCategory {
  name: string;
  baseUnit: string;
  units: Unit[];
}

export const unitData: { [key: string]: UnitCategory } = {
  length: {
    name: "Length",
    baseUnit: "m",
    units: [
      { symbol: "m", name: "Meter", toBase: v => v, fromBase: v => v },
      { symbol: "km", name: "Kilometer", toBase: v => v * 1000, fromBase: v => v / 1000 },
      { symbol: "cm", name: "Centimeter", toBase: v => v / 100, fromBase: v => v * 100 },
      { symbol: "mm", name: "Millimeter", toBase: v => v / 1000, fromBase: v => v * 1000 },
      { symbol: "μm", name: "Micrometer", toBase: v => v / 1e6, fromBase: v => v * 1e6 },
      { symbol: "nm", name: "Nanometer", toBase: v => v / 1e9, fromBase: v => v * 1e9 },
      { symbol: "in", name: "Inch", toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      { symbol: "ft", name: "Foot", toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      { symbol: "yd", name: "Yard", toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      { symbol: "mi", name: "Mile", toBase: v => v * 1609.34, fromBase: v => v / 1609.34 },
    ],
  },

  area: {
    name: "Area",
    baseUnit: "m²",
    units: [
      { symbol: "m²", name: "Square Meter", toBase: v => v, fromBase: v => v },
      { symbol: "cm²", name: "Square Centimeter", toBase: v => v / 1e4, fromBase: v => v * 1e4 },
      { symbol: "mm²", name: "Square Millimeter", toBase: v => v / 1e6, fromBase: v => v * 1e6 },
      { symbol: "km²", name: "Square Kilometer", toBase: v => v * 1e6, fromBase: v => v / 1e6 },
      { symbol: "in²", name: "Square Inch", toBase: v => v * 0.00064516, fromBase: v => v / 0.00064516 },
      { symbol: "ft²", name: "Square Foot", toBase: v => v * 0.092903, fromBase: v => v / 0.092903 },
      { symbol: "acre", name: "Acre", toBase: v => v * 4046.86, fromBase: v => v / 4046.86 },
      { symbol: "ha", name: "Hectare", toBase: v => v * 10000, fromBase: v => v / 10000 },
    ],
  },

  volume: {
    name: "Volume",
    baseUnit: "m³",
    units: [
      { symbol: "m³", name: "Cubic Meter", toBase: v => v, fromBase: v => v },
      { symbol: "l", name: "Liter", toBase: v => v / 1000, fromBase: v => v * 1000 },
      { symbol: "ml", name: "Milliliter", toBase: v => v / 1e6, fromBase: v => v * 1e6 },
      { symbol: "cm³", name: "Cubic Centimeter", toBase: v => v / 1e6, fromBase: v => v * 1e6 },
      { symbol: "in³", name: "Cubic Inch", toBase: v => v * 1.6387e-5, fromBase: v => v / 1.6387e-5 },
      { symbol: "ft³", name: "Cubic Foot", toBase: v => v * 0.0283168, fromBase: v => v / 0.0283168 },
      { symbol: "gal", name: "Gallon (US)", toBase: v => v * 0.00378541, fromBase: v => v / 0.00378541 },
      { symbol: "qt", name: "Quart (US)", toBase: v => v * 0.000946353, fromBase: v => v / 0.000946353 },
    ],
  },

  mass: {
    name: "Mass",
    baseUnit: "kg",
    units: [
      { symbol: "kg", name: "Kilogram", toBase: v => v, fromBase: v => v },
      { symbol: "g", name: "Gram", toBase: v => v / 1000, fromBase: v => v * 1000 },
      { symbol: "mg", name: "Milligram", toBase: v => v / 1e6, fromBase: v => v * 1e6 },
      { symbol: "μg", name: "Microgram", toBase: v => v / 1e9, fromBase: v => v * 1e9 },
      { symbol: "lb", name: "Pound", toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
      { symbol: "oz", name: "Ounce", toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
      { symbol: "ton", name: "Metric Ton", toBase: v => v * 1000, fromBase: v => v / 1000 },
    ],
  },

  force: {
    name: "Force",
    baseUnit: "N",
    units: [
      { symbol: "N", name: "Newton", toBase: v => v, fromBase: v => v },
      { symbol: "kN", name: "Kilonewton", toBase: v => v * 1000, fromBase: v => v / 1000 },
      { symbol: "lbf", name: "Pound-force", toBase: v => v * 4.44822, fromBase: v => v / 4.44822 },
      { symbol: "dyn", name: "Dyne", toBase: v => v / 1e5, fromBase: v => v * 1e5 },
    ],
  },

  pressure: {
    name: "Pressure",
    baseUnit: "Pa",
    units: [
      { symbol: "Pa", name: "Pascal", toBase: v => v, fromBase: v => v },
      { symbol: "bar", name: "Bar", toBase: v => v * 1e5, fromBase: v => v / 1e5 },
      { symbol: "atm", name: "Atmosphere", toBase: v => v * 101325, fromBase: v => v / 101325 },
      { symbol: "psi", name: "Pound per Square Inch", toBase: v => v * 6894.76, fromBase: v => v / 6894.76 },
      { symbol: "mmHg", name: "Millimeter of Mercury", toBase: v => v * 133.322, fromBase: v => v / 133.322 },
    ],
  },

  energy: {
    name: "Energy",
    baseUnit: "J",
    units: [
      { symbol: "J", name: "Joule", toBase: v => v, fromBase: v => v },
      { symbol: "kJ", name: "Kilojoule", toBase: v => v * 1000, fromBase: v => v / 1000 },
      { symbol: "cal", name: "Calorie", toBase: v => v * 4.184, fromBase: v => v / 4.184 },
      { symbol: "kcal", name: "Kilocalorie", toBase: v => v * 4184, fromBase: v => v / 4184 },
      { symbol: "BTU", name: "British Thermal Unit", toBase: v => v * 1055.06, fromBase: v => v / 1055.06 },
      { symbol: "kWh", name: "Kilowatt-hour", toBase: v => v * 3.6e6, fromBase: v => v / 3.6e6 },
    ],
  },

  power: {
    name: "Power",
    baseUnit: "W",
    units: [
      { symbol: "W", name: "Watt", toBase: v => v, fromBase: v => v },
      { symbol: "kW", name: "Kilowatt", toBase: v => v * 1000, fromBase: v => v / 1000 },
      { symbol: "MW", name: "Megawatt", toBase: v => v * 1e6, fromBase: v => v / 1e6 },
      { symbol: "hp", name: "Horsepower", toBase: v => v * 745.7, fromBase: v => v / 745.7 },
    ],
  },

  temperature: {
    name: "Temperature",
    baseUnit: "K",
    units: [
      { symbol: "K", name: "Kelvin", toBase: v => v, fromBase: v => v },
      { symbol: "°C", name: "Celsius", toBase: v => v + 273.15, fromBase: v => v - 273.15 },
      { symbol: "°F", name: "Fahrenheit", toBase: v => (v - 32) * 5/9 + 273.15, fromBase: v => (v - 273.15) * 9/5 + 32 },
    ],
  },

  speed: {
    name: "Speed",
    baseUnit: "m/s",
    units: [
      { symbol: "m/s", name: "Meters per Second", toBase: v => v, fromBase: v => v },
      { symbol: "km/h", name: "Kilometers per Hour", toBase: v => v / 3.6, fromBase: v => v * 3.6 },
      { symbol: "mph", name: "Miles per Hour", toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
      { symbol: "ft/s", name: "Feet per Second", toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    ],
  },

  time: {
    name: "Time",
    baseUnit: "s",
    units: [
      { symbol: "s", name: "Second", toBase: v => v, fromBase: v => v },
      { symbol: "min", name: "Minute", toBase: v => v * 60, fromBase: v => v / 60 },
      { symbol: "h", name: "Hour", toBase: v => v * 3600, fromBase: v => v / 3600 },
      { symbol: "day", name: "Day", toBase: v => v * 86400, fromBase: v => v / 86400 },
    ],
  },

  voltage: {
    name: "Voltage",
    baseUnit: "V",
    units: [
      { symbol: "V", name: "Volt", toBase: v => v, fromBase: v => v },
      { symbol: "kV", name: "Kilovolt", toBase: v => v * 1000, fromBase: v => v / 1000 },
      { symbol: "mV", name: "Millivolt", toBase: v => v / 1000, fromBase: v => v * 1000 },
    ],
  },

  current: {
    name: "Current",
    baseUnit: "A",
    units: [
      { symbol: "A", name: "Ampere", toBase: v => v, fromBase: v => v },
      { symbol: "mA", name: "Milliampere", toBase: v => v / 1000, fromBase: v => v * 1000 },
      { symbol: "μA", name: "Microampere", toBase: v => v / 1e6, fromBase: v => v * 1e6 },
    ],
  },
  
  resistance: {
    name: "Resistance",
    baseUnit: "Ω",
    units: [
      { symbol: "Ω", name: "Ohm", toBase: v => v, fromBase: v => v },
      { symbol: "kΩ", name: "Kiloohm", toBase: v => v * 1000, fromBase: v => v / 1000 },
      { symbol: "MΩ", name: "Megaohm", toBase: v => v * 1e6, fromBase: v => v / 1e6 },
    ],
  },

  angular: {
    name: "Angular",
    baseUnit: "rad",
    units: [
      { symbol: "rad", name: "Radian", toBase: v => v, fromBase: v => v },
      { symbol: "deg", name: "Degree", toBase: v => v * Math.PI / 180, fromBase: v => v * 180 / Math.PI },
      { symbol: "rev", name: "Revolution", toBase: v => v * 2 * Math.PI, fromBase: v => v / (2 * Math.PI) },
    ],
  },

  density: {
    name: "Density",
    baseUnit: "kg/m³",
    units: [
      { symbol: "kg/m³", name: "Kilogram per Cubic Meter", toBase: v => v, fromBase: v => v },
      { symbol: "g/cm³", name: "Gram per Cubic Centimeter", toBase: v => v * 1000, fromBase: v => v / 1000 },
      { symbol: "lb/ft³", name: "Pound per Cubic Foot", toBase: v => v * 16.0185, fromBase: v => v / 16.0185 },
    ],
  },
};
