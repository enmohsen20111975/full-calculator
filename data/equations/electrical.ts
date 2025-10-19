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
      "name": "Power (from V, I)",
      "equation": "P = V * I",
      "variables": { "P": "Power (W)", "V": "Voltage (V)", "I": "Current (A)" },
      "description": "Calculates electrical power from voltage and current."
    },
    {
      "name": "Power (from I, R)",
      "equation": "P = I^2 * R",
      "variables": { "P": "Power (W)", "I": "Current (A)", "R": "Resistance (Ω)" },
      "description": "Calculates power dissipated in a resistor."
    },
    {
      "name": "Power (from V, R)",
      "equation": "P = V^2 / R",
      "variables": { "P": "Power (W)", "V": "Voltage (V)", "R": "Resistance (Ω)" },
      "description": "Calculates power dissipated in a resistor."
    },
    {
      "name": "Capacitor Charge",
      "equation": "Q = C * V",
      "variables": { "Q": "Charge (C)", "C": "Capacitance (F)", "V": "Voltage (V)" },
      "description": "Charge stored on a capacitor."
    },
    {
      "name": "RC Time Constant",
      "equation": "τ = R * C",
      "variables": { "τ": "Time constant (s)", "R": "Resistance (Ω)", "C": "Capacitance (F)" },
      "description": "Time for a capacitor in an RC circuit to charge to ~63.2%."
    },
    {
      "name": "RL Time Constant",
      "equation": "τ = L / R",
      "variables": { "τ": "Time constant (s)", "L": "Inductance (H)", "R": "Resistance (Ω)" },
      "description": "Time for current in an RL circuit to reach ~63.2% of its final value."
    }
  ],
  "AC Circuits": [
    {
      "name": "Inductive Reactance",
      "equation": "X_L = 2 * pi * f * L",
      "variables": { "X_L": "Inductive reactance (Ω)", "f": "Frequency (Hz)", "L": "Inductance (H)" },
      "description": "Opposition of an inductor to alternating current."
    },
    {
      "name": "Capacitive Reactance",
      "equation": "X_C = 1 / (2 * pi * f * C)",
      "variables": { "X_C": "Capacitive reactance (Ω)", "f": "Frequency (Hz)", "C": "Capacitance (F)" },
      "description": "Opposition of a capacitor to alternating current."
    },
    {
      "name": "Series RLC Impedance",
      "equation": "Z = sqrt(R^2 + (X_L - X_C)^2)",
      "variables": { "Z": "Impedance (Ω)", "R": "Resistance (Ω)", "X_L": "Inductive reactance (Ω)", "X_C": "Capacitive reactance (Ω)" },
      "description": "Total opposition to current in a series RLC circuit."
    },
    {
      "name": "Resonant Frequency",
      "equation": "f_0 = 1 / (2 * pi * sqrt(L * C))",
      "variables": { "f_0": "Resonant frequency (Hz)", "L": "Inductance (H)", "C": "Capacitance (F)" },
      "description": "Frequency at which an RLC circuit's impedance is purely resistive."
    }
  ],
  "Power Systems": [
    {
      "name": "Apparent Power (3-Phase)",
      "equation": "S = sqrt(3) * V_L * I_L",
      "variables": { "S": "Apparent power (VA)", "V_L": "Line voltage (V)", "I_L": "Line current (A)" },
      "description": "Total power in a balanced three-phase system."
    },
    {
      "name": "Real Power (3-Phase)",
      "equation": "P = sqrt(3) * V_L * I_L * cos(phi)",
      "variables": { "P": "Real power (W)", "V_L": "Line voltage (V)", "I_L": "Line current (A)", "phi": "Phase angle (rad)" },
      "description": "Actual power consumed in a balanced three-phase system."
    },
    {
      "name": "Power Factor",
      "equation": "pf = P / S",
      "variables": { "pf": "Power factor", "P": "Real Power (W)", "S": "Apparent Power (VA)" },
      "description": "Ratio of real power to apparent power."
    }
  ],
  "Electromagnetism": [
    {
      "name": "Coulomb's Law",
      "equation": "F = k_e * (q1 * q2 / r^2)",
      "variables": { "F": "Force (N)", "k_e": "Coulomb's constant (N·m²/C²)", "q1": "Charge 1 (C)", "q2": "Charge 2 (C)", "r": "Distance (m)" },
      "description": "Force between two point charges."
    },
    {
      "name": "Solenoid Inductance",
      "equation": "L = (mu_0 * N^2 * A) / l",
      "variables": { "L": "Inductance (H)", "mu_0": "Vacuum permeability (H/m)", "N": "Number of turns", "A": "Cross-sectional area (m²)", "l": "Length (m)" },
      "description": "Inductance of an ideal long solenoid."
    }
  ]
};
