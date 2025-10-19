import { EquationCategoryData } from ".";

export const physicsEquations: EquationCategoryData = {
    "Classical Mechanics": [
        {
            name: "Newton's Second Law",
            equation: "F = m * a",
            variables: {
                "F": "Force (N)",
                "m": "Mass (kg)",
                "a": "Acceleration (m/s²)"
            },
            description: "The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass."
        },
        {
            name: "Kinetic Energy",
            equation: "K = 0.5 * m * v^2",
            variables: {
                "K": "Kinetic Energy (J)",
                "m": "Mass (kg)",
                "v": "Velocity (m/s)"
            },
            description: "The energy which an object possesses due to its motion."
        }
    ]
};
