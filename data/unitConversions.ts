import type { UnitConversionData } from '../types';

export const unitConversions: UnitConversionData = {
  "Length": [
    { "from": "meter", "to": "kilometer", "factor": 0.001 },
    { "from": "kilometer", "to": "meter", "factor": 1000.0 },
    { "from": "meter", "to": "centimeter", "factor": 100.0 },
    { "from": "centimeter", "to": "meter", "factor": 0.01 },
    { "from": "meter", "to": "millimeter", "factor": 1000.0 },
    { "from": "millimeter", "to": "meter", "factor": 0.001 },
    { "from": "meter", "to": "inch", "factor": 39.3700787402 },
    { "from": "inch", "to": "meter", "factor": 0.0254 },
    { "from": "meter", "to": "foot", "factor": 3.280839895 },
    { "from": "foot", "to": "meter", "factor": 0.3048 },
    { "from": "meter", "to": "yard", "factor": 1.093613298 },
    { "from": "yard", "to": "meter", "factor": 0.9144 },
    { "from": "meter", "to": "mile", "factor": 0.000621371192 },
    { "from": "mile", "to": "meter", "factor": 1609.344 }
  ],
  "Mass": [
    { "from": "kilogram", "to": "gram", "factor": 1000.0 },
    { "from": "gram", "to": "kilogram", "factor": 0.001 },
    { "from": "kilogram", "to": "milligram", "factor": 1000000.0 },
    { "from": "milligram", "to": "kilogram", "factor": 1e-06 },
    { "from": "kilogram", "to": "pound", "factor": 2.20462262185 },
    { "from": "pound", "to": "kilogram", "factor": 0.45359237 },
    { "from": "kilogram", "to": "ounce", "factor": 35.27396195 },
    { "from": "ounce", "to": "kilogram", "factor": 0.0283495231 }
  ],
  "Time": [
    { "from": "second", "to": "minute", "factor": 0.0166667 },
    { "from": "minute", "to": "second", "factor": 60.0 },
    { "from": "second", "to": "hour", "factor": 0.000277778 },
    { "from": "hour", "to": "second", "factor": 3600.0 },
    { "from": "second", "to": "day", "factor": 1.1574e-05 },
    { "from": "day", "to": "second", "factor": 86400.0 }
  ],
  "Area": [
    { "from": "square_meter", "to": "square_foot", "factor": 10.7639 },
    { "from": "square_foot", "to": "square_meter", "factor": 0.092903 },
    { "from": "square_meter", "to": "square_inch", "factor": 1550.0 },
    { "from": "square_inch", "to": "square_meter", "factor": 0.00064516 },
    { "from": "square_meter", "to": "hectare", "factor": 0.0001 },
    { "from": "hectare", "to": "square_meter", "factor": 10000.0 },
    { "from": "square_meter", "to": "acre", "factor": 0.000247105 },
    { "from": "acre", "to": "square_meter", "factor": 4046.86 }
  ],
  "Volume": [
    { "from": "cubic_meter", "to": "liter", "factor": 1000.0 },
    { "from": "liter", "to": "cubic_meter", "factor": 0.001 },
    { "from": "cubic_meter", "to": "milliliter", "factor": 1000000.0 },
    { "from": "milliliter", "to": "cubic_meter", "factor": 1e-06 },
    { "from": "liter", "to": "gallon_US", "factor": 0.264172 },
    { "from": "gallon_US", "to": "liter", "factor": 3.78541 },
    { "from": "liter", "to": "quart_US", "factor": 1.05669 },
    { "from": "quart_US", "to": "liter", "factor": 0.946353 }
  ],
  "Speed": [
    { "from": "m_per_s", "to": "km_per_h", "factor": 3.6 },
    { "from": "km_per_h", "to": "m_per_s", "factor": 0.277778 },
    { "from": "m_per_s", "to": "mph", "factor": 2.23694 },
    { "from": "mph", "to": "m_per_s", "factor": 0.44704 }
  ],
  "Pressure": [
    { "from": "pascal", "to": "bar", "factor": 1e-05 },
    { "from": "bar", "to": "pascal", "factor": 100000.0 },
    { "from": "pascal", "to": "atm", "factor": 9.8692e-06 },
    { "from": "atm", "to": "pascal", "factor": 101325.0 },
    { "from": "pascal", "to": "psi", "factor": 0.000145038 },
    { "from": "psi", "to": "pascal", "factor": 6894.76 }
  ],
  "Energy": [
    { "from": "joule", "to": "calorie", "factor": 0.239006 },
    { "from": "calorie", "to": "joule", "factor": 4.184 },
    { "from": "joule", "to": "kWh", "factor": 2.7778e-07 },
    { "from": "kWh", "to": "joule", "factor": 3600000.0 },
    { "from": "joule", "to": "BTU_IT", "factor": 0.000947817 },
    { "from": "BTU_IT", "to": "joule", "factor": 1055.06 }
  ],
  "Power": [
    { "from": "watt", "to": "horsepower_ME", "factor": 0.00134102 },
    { "from": "horsepower_ME", "to": "watt", "factor": 745.7 },
    { "from": "watt", "to": "horsepower_metric", "factor": 0.00135962 },
    { "from": "horsepower_metric", "to": "watt", "factor": 735.5 }
  ],
  "Force": [
    { "from": "newton", "to": "lbf", "factor": 0.224809 },
    { "from": "lbf", "to": "newton", "factor": 4.44822 }
  ],
  "Temperature": [
    { "from": "Celsius", "to": "Fahrenheit", "formula": "(x * 9/5) + 32" },
    { "from": "Fahrenheit", "to": "Celsius", "formula": "(x - 32) * 5/9" },
    { "from": "Celsius", "to": "Kelvin", "formula": "x + 273.15" },
    { "from": "Kelvin", "to": "Celsius", "formula": "x - 273.15" },
    { "from": "Fahrenheit", "to": "Kelvin", "formula": "(x - 32) * 5/9 + 273.15" },
    { "from": "Kelvin", "to": "Fahrenheit", "formula": "(x - 273.15) * 9/5 + 32" }
  ]
};
