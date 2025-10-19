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
        },
        {
            name: "Potential Energy (Gravitational)",
            equation: "U = m * g * h",
            variables: {
                "U": "Potential Energy (J)",
                "m": "Mass (kg)",
                "g": "Gravity (m/s²)",
                "h": "Height (m)"
            },
            description: "Energy held by an object because of its position relative to other objects."
        },
        {
            name: "Momentum",
            equation: "p = m * v",
            variables: {
                "p": "Momentum (kg·m/s)",
                "m": "Mass (kg)",
                "v": "Velocity (m/s)"
            },
            description: "The quantity of motion of a moving body, measured as a product of its mass and velocity."
        },
        {
            name: "Work-Energy Theorem",
            equation: "W = K_f - K_i",
            variables: {
                "W": "Work (J)",
                "K_f": "Final Kinetic Energy (J)",
                "K_i": "Initial Kinetic Energy (J)"
            },
            description: "The net work done on an object equals the change in its kinetic energy."
        }
    ],
    "Waves & Optics": [
        {
            name: "Wave Speed",
            equation: "v = f * lambda",
            variables: {
                "v": "Wave Speed (m/s)",
                "f": "Frequency (Hz)",
                "lambda": "Wavelength (m)"
            },
            description: "Relates the speed, frequency, and wavelength of a periodic wave."
        },
        {
            name: "Snell's Law",
            equation: "n1 * sin(theta1) = n2 * sin(theta2)",
            variables: {
                "n1": "Refractive index of medium 1",
                "theta1": "Angle of incidence (rad)",
                "n2": "Refractive index of medium 2",
                "theta2": "Angle of refraction (rad)"
            },
            description: "Describes the relationship between the angles of incidence and refraction for a wave passing through a boundary between two different isotropic media."
        }
    ]
};