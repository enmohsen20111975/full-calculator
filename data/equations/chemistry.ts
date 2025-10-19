import { EquationCategoryData } from ".";

export const chemistryEquations: EquationCategoryData = {
    "Gas Laws": [
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
            description: "Relates the pressure, volume, temperature, and amount of an ideal gas."
        },
        {
            name: "Boyle's Law",
            equation: "P1*V1 = P2*V2",
            variables: {
                "P1": "Initial Pressure",
                "V1": "Initial Volume",
                "P2": "Final Pressure",
                "V2": "Final Volume"
            },
            description: "The pressure of a gas is inversely proportional to its volume at constant temperature."
        }
    ],
    "Solutions": [
        {
            name: "Molarity",
            equation: "M = n / V",
            variables: {
                "M": "Molarity (mol/L)",
                "n": "Moles of solute (mol)",
                "V": "Volume of solution (L)"
            },
            description: "The concentration of a solution expressed as the number of moles of solute per liter of solution."
        },
        {
            name: "Dilution",
            equation: "M1*V1 = M2*V2",
            variables: {
                "M1": "Initial Molarity (mol/L)",
                "V1": "Initial Volume (L)",
                "M2": "Final Molarity (mol/L)",
                "V2": "Final Volume (L)"
            },
            description: "Calculates the concentration of a solution after dilution."
        }
    ]
};