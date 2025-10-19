import { EquationCategoryData } from ".";

export const mechanicalEquations: EquationCategoryData = {
    "Kinematics": [
        {
            name: "Final Velocity",
            equation: "v = v0 + a * t",
            variables: { "v": "Final velocity (m/s)", "v0": "Initial velocity (m/s)", "a": "Acceleration (m/s²)", "t": "Time (s)"},
            description: "Calculates final velocity under constant acceleration."
        },
        {
            name: "Displacement",
            equation: "d = v0 * t + 0.5 * a * t^2",
            variables: { "d": "Displacement (m)", "v0": "Initial velocity (m/s)", "a": "Acceleration (m/s²)", "t": "Time (s)"},
            description: "Calculates displacement under constant acceleration."
        }
    ],
    "Statics & Dynamics": [
        {
            name: "Torque",
            equation: "tau = r * F * sin(theta)",
            variables: { "tau": "Torque (N·m)", "r": "Lever arm length (m)", "F": "Force (N)", "theta": "Angle (rad)" },
            description: "The rotational equivalent of linear force."
        },
        {
            name: "Friction Force",
            equation: "f = mu * N",
            variables: { "f": "Friction force (N)", "mu": "Coefficient of friction", "N": "Normal force (N)" },
            description: "The force resisting the relative motion between surfaces."
        }
    ],
    "Work, Energy & Power": [
        {
            name: "Work",
            equation: "W = F * d * cos(theta)",
            variables: { "W": "Work (J)", "F": "Force (N)", "d": "Displacement (m)", "theta": "Angle (rad)" },
            description: "Energy transferred by a force acting over a distance."
        },
        {
            name: "Mechanical Power",
            equation: "P = W / t",
            variables: { "P": "Power (W)", "W": "Work (J)", "t": "Time (s)" },
            description: "The rate at which work is done."
        },
        {
            name: "Efficiency",
            equation: "eta = P_out / P_in",
            variables: { "eta": "Efficiency (ratio)", "P_out": "Output power (W)", "P_in": "Input power (W)"},
            description: "The ratio of useful power output to total power input."
        }
    ],
    "Fluid Mechanics": [
         {
            name: "Pressure",
            equation: "P = F / A",
            variables: { "P": "Pressure (Pa)", "F": "Force (N)", "A": "Area (m²)" },
            description: "Force applied perpendicular to the surface of an object per unit area."
        },
        {
            name: "Density",
            equation: "rho = m / V",
            variables: { "rho": "Density (kg/m³)", "m": "Mass (kg)", "V": "Volume (m³)" },
            description: "The mass of a substance per unit volume."
        }
    ],
    "Thermodynamics": [
        {
            name: "Heat Transfer",
            equation: "Q = m * c * dT",
            variables: {
                "Q": "Heat transferred (J)",
                "m": "Mass (kg)",
                "c": "Specific heat capacity (J/kg·K)",
                "dT": "Change in temperature (K or °C)"
            },
            description: "Calculates the heat energy absorbed or released by a substance during a temperature change."
        }
    ]
};