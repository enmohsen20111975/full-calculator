import { EquationCategoryData } from ".";

export const chemistryEquations: EquationCategoryData = {
    "Solutions & Gases": [
        {
            name: "Ideal Gas Law",
            equation: "P*V = n*R*T",
            variables: {
                "P": "Pressure (Pa)",
                "V": "Volume (m³)",
                "n": "Amount of substance (mol)",
                "R": "Ideal gas constant (J/(mol·K))",
                "T": "Temperature (K)"
            },
            description: "A fundamental equation of state that relates the pressure, volume, temperature, and amount of a gas."
        },
        {
            name: "Molarity",
            equation: "M = n / V",
            variables: {
                "M": "Molarity (mol/L)",
                "n": "Moles of solute (mol)",
                "V": "Volume of solution (L)"
            },
            description: "A measure of the concentration of a chemical species, in particular of a solute in a solution, in terms of amount of substance per unit volume of solution."
        },
        {
            name: "Density",
            equation: "rho = m / V",
            variables: {
                "rho": "Density (kg/m³)",
                "m": "Mass (kg)",
                "V": "Volume (m³)"
            },
            description: "The mass of a substance per unit volume. Note: Ensure units are consistent (e.g., g/mL is equivalent to g/cm³)."
        }
    ]
};