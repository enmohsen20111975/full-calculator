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
                "T": "Temperature (K)"
            },
            description: "A fundamental equation of state that relates the pressure, volume, temperature, and amount of a gas."
        }
    ]
};
