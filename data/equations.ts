
import type { Equation } from '../types';

export const physicsEquations: Equation[] = [
  {
    name: "Ohm's Law",
    equation: "V = I * R",
    variables: {
      "V": "Voltage (V)",
      "I": "Current (A)",
      "R": "Resistance (Ω)",
    },
    description: "Relationship between voltage, current, and resistance."
  },
  {
    name: "Newton's Second Law",
    equation: "F = m * a",
    variables: {
      "F": "Force (N)",
      "m": "Mass (kg)",
      "a": "Acceleration (m/s²)",
    },
    description: "The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass."
  },
];

export const chemistryEquations: Equation[] = [
    {
      name: "Ideal Gas Law",
      equation: "P*V = n*R*T",
      variables: {
        "P": "Pressure (Pa)",
        "V": "Volume (m³)",
        "n": "Amount of substance (mol)",
        "R": "Ideal gas constant (J/(mol·K))",
        "T": "Temperature (K)",
      },
      description: "A fundamental equation of state that relates the pressure, volume, temperature, and amount of a gas."
    },
];

export const mathEquations: Equation[] = [
    {
        name: "Pythagorean Theorem",
        equation: "a^2 + b^2 = c^2",
        variables: {
            "a": "Side a",
            "b": "Side b",
            "c": "Hypotenuse c"
        },
        description: "In a right-angled triangle, the square of the hypotenuse side is equal to the sum of squares of the other two sides."
    }
];
