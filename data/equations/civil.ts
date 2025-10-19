import { EquationCategoryData } from ".";

export const civilEquations: EquationCategoryData = {
    "Structural Analysis": [
        {
            name: "Stress",
            equation: "σ = F / A",
            variables: {
                "σ": "Stress (Pa)",
                "F": "Force (N)",
                "A": "Area (m²)"
            },
            description: "The internal forces that adjacent particles of a continuous material exert on each other."
        }
    ]
};
