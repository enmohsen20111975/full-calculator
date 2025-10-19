import { EquationCategoryData } from ".";

export const civilEquations: EquationCategoryData = {
    "Structural Analysis": [
        {
            name: "Stress",
            equation: "sigma = F / A",
            variables: { "sigma": "Stress (Pa)", "F": "Force (N)", "A": "Cross-sectional Area (m²)" },
            description: "The internal force per unit area within a material."
        },
        {
            name: "Strain",
            equation: "epsilon = dL / L0",
            variables: { "epsilon": "Strain (dimensionless)", "dL": "Change in length (m)", "L0": "Original length (m)" },
            description: "The measure of deformation of a material."
        },
        {
            name: "Young's Modulus",
            equation: "E = sigma / epsilon",
            variables: { "E": "Young's Modulus (Pa)", "sigma": "Stress (Pa)", "epsilon": "Strain (dimensionless)" },
            description: "A measure of a material's stiffness."
        },
        {
            name: "Beam Bending (Max Moment)",
            equation: "M = (w * L^2) / 8",
            variables: { "M": "Max Moment (N·m)", "w": "Uniform load (N/m)", "L": "Beam length (m)"},
            description: "Maximum moment for a simply supported beam with a uniform load."
        }
    ],
    "Fluid Mechanics": [
        {
            name: "Fluid Pressure",
            equation: "P = rho * g * h",
            variables: { "P": "Fluid Pressure (Pa)", "rho": "Fluid density (kg/m³)", "g": "Gravity (m/s²)", "h": "Fluid height (m)" },
            description: "Pressure exerted by a fluid at a certain depth."
        },
        {
            name: "Flow Rate",
            equation: "Q = A * v",
            variables: { "Q": "Flow rate (m³/s)", "A": "Cross-sectional area (m²)", "v": "Flow velocity (m/s)" },
            description: "The volume of fluid which passes per unit time."
        }
    ]
};
