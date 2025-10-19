import { EquationCategoryData } from ".";

export const mechanicalEquations: EquationCategoryData = {
    "Statics & Dynamics": [
        {
            name: "Torque",
            equation: "τ = r * F * sin(θ)",
            variables: {
                "τ": "Torque (N·m)",
                "r": "Distance from axis (m)",
                "F": "Force (N)",
                "θ": "Angle (rad)"
            },
            description: "The rotational equivalent of linear force."
        }
    ]
};
