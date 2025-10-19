import { EquationCategoryData } from ".";

export const electricalEquations: EquationCategoryData = {
  "Circuit Theory": [
    {
      "name": "Ohm's Law",
      "equation": "V = I * R",
      "variables": { "V": "Voltage (V)", "I": "Current (A)", "R": "Resistance (Ω)" },
      "description": "Relationship between voltage, current, and resistance."
    },
    {
      "name": "Power from V and I",
      "equation": "P = V * I",
      "variables": { "P": "Power (W)", "V": "Voltage (V)", "I": "Current (A)" },
      "description": "Instantaneous electrical power."
    },
    {
      "name": "Power from I and R",
      "equation": "P = I^2 * R",
      "variables": { "P": "Power (W)", "I": "Current (A)", "R": "Resistance (Ω)" },
      "description": "Power dissipated by a resistor given current."
    },
    {
      "name": "Power from V and R",
      "equation": "P = V^2 / R",
      "variables": { "P": "Power (W)", "V": "Voltage (V)", "R": "Resistance (Ω)" },
      "description": "Power dissipated by a resistor given voltage."
    },
    {
      "name": "Capacitor charge-voltage",
      "equation": "Q = C * V",
      "variables": { "Q": "Charge (C)", "C": "Capacitance (F)", "V": "Voltage (V)" },
      "description": "Charge stored in a capacitor."
    },
    {
      "name": "RC time constant",
      "equation": "τ = R * C",
      "variables": { "τ": "Time constant (s)", "R": "Resistance (Ω)", "C": "Capacitance (F)" },
      "description": "Time constant for first-order RC circuits."
    },
    {
      "name": "RL time constant",
      "equation": "τ = L / R",
      "variables": { "τ": "Time constant (s)", "L": "Inductance (H)", "R": "Resistance (Ω)" },
      "description": "Time constant for first-order RL circuits."
    }
  ],
  "AC Circuits": [
    {
      "name": "Inductive reactance",
      "equation": "X_L = 2 * pi * f * L",
      "variables": { "X_L": "Inductive reactance (Ω)", "f": "Frequency (Hz)", "L": "Inductance (H)" },
      "description": "Reactance of inductor vs frequency."
    },
    {
      "name": "Capacitive reactance",
      "equation": "X_C = 1 / (2 * pi * f * C)",
      "variables": { "X_C": "Capacitive reactance (Ω)", "f": "Frequency (Hz)", "C": "Capacitance (F)" },
      "description": "Reactance of capacitor vs frequency."
    },
    {
      "name": "Series RLC impedance",
      "equation": "Z = sqrt(R^2 + (X_L - X_C)^2)",
      "variables": { "Z": "Impedance (Ω)", "R": "Resistance (Ω)", "X_L": "Inductive reactance (Ω)", "X_C": "Capacitive reactance (Ω)" },
      "description": "Magnitude of impedance in series RLC."
    },
    {
      "name": "Resonant frequency (RLC)",
      "equation": "f_0 = 1 / (2 * pi * sqrt(L * C))",
      "variables": { "f_0": "Resonant frequency (Hz)", "L": "Inductance (H)", "C": "Capacitance (F)" },
      "description": "Natural resonance frequency."
    }
  ],
  "Power Systems": [
    {
      "name": "Three-phase apparent power",
      "equation": "S = sqrt(3) * V_L * I_L",
      "variables": { "S": "Apparent power (VA)", "V_L": "Line voltage (V)", "I_L": "Line current (A)" },
      "description": "Balanced 3-phase apparent power."
    },
    {
      "name": "Three-phase real power",
      "equation": "P = sqrt(3) * V_L * I_L * cos(φ)",
      "variables": { "P": "Real power (W)", "V_L": "Line voltage (V)", "I_L": "Line current (A)", "φ": "Phase angle (rad)" },
      "description": "Balanced 3-phase real power."
    },
    {
      "name": "Power factor",
      "equation": "pf = cos(φ)",
      "variables": { "pf": "Power factor", "φ": "Phase angle (rad)" },
      "description": "Power factor as cosine of phase angle."
    }
  ],
  "Electromagnetism": [
    {
      "name": "Coulomb's law",
      "equation": "F = (1/(4 * pi * ε0)) * (q1 * q2 / r^2)",
      "variables": { "F": "Force (N)", "ε0": "Permittivity (F/m)", "q1": "Charge (C)", "q2": "Charge (C)", "r": "Separation (m)" },
      "description": "Force between two point charges."
    },
    {
      "name": "Solenoid inductance",
      "equation": "L = μ0 * N^2 * A / l",
      "variables": { "L": "Inductance (H)", "μ0": "Permeability (H/m)", "N": "Turns", "A": "Area (m²)", "l": "Length (m)" },
      "description": "Ideal long solenoid inductance."
    }
  ]
};
