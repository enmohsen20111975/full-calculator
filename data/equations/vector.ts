import { EquationCategoryData } from ".";

export const vectorEquations: EquationCategoryData = {
    "Core Concepts": [
        {
            name: "Vector Magnitude (3D)",
            equation: "|V| = sqrt(x^2 + y^2 + z^2)",
            variables: {
                "|V|": "Magnitude",
                "x": "x-component",
                "y": "y-component",
                "z": "z-component"
            },
            description: "Calculates the length (norm) of a vector in 3D space."
        },
        {
            name: "Dot Product (Geometric)",
            equation: "A_dot_B = |A| * |B| * cos(theta)",
            variables: {
                "A_dot_B": "Dot Product (A · B)",
                "|A|": "Magnitude of A",
                "|B|": "Magnitude of B",
                "theta": "Angle between A and B (rad)"
            },
            description: "Relates the dot product to the magnitudes of the vectors and the angle between them."
        },
        {
            name: "Dot Product (Algebraic)",
            equation: "A_dot_B = Ax*Bx + Ay*By + Az*Bz",
            variables: {
                "A_dot_B": "Dot Product (A · B)",
                "Ax": "A x-component", "Ay": "A y-component", "Az": "A z-component",
                "Bx": "B x-component", "By": "B y-component", "Bz": "B z-component"
            },
            description: "Calculates the dot product from the components of two vectors."
        },
        {
            name: "Cross Product Magnitude",
            equation: "|AxB| = |A| * |B| * sin(theta)",
            variables: {
                "|AxB|": "Cross Product Magnitude |A × B|",
                "|A|": "Magnitude of A",
                "|B|": "Magnitude of B",
                "theta": "Angle between A and B (rad)"
            },
            description: "Calculates the magnitude of the cross product, which represents the area of the parallelogram formed by the two vectors."
        }
    ]
};