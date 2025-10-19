import type { ConstantsData } from '../types';

export const constants: ConstantsData = {
  "Universal": [
    { "name": "Speed of light in vacuum", "symbol": "c", "value": 299792458, "unit": "m/s" },
    { "name": "Gravitational constant", "symbol": "G", "value": 6.6743e-11, "unit": "N·m²/kg²" },
    { "name": "Planck constant", "symbol": "h", "value": 6.62607015e-34, "unit": "J·s" },
    { "name": "Reduced Planck constant", "symbol": "ħ", "value": 1.054571817e-34, "unit": "J·s" },
    { "name": "Boltzmann constant", "symbol": "k_B", "value": 1.380649e-23, "unit": "J/K" },
    { "name": "Stefan-Boltzmann constant", "symbol": "σ", "value": 5.670374419e-8, "unit": "W/(m²·K⁴)" },
    { "name": "Gas constant", "symbol": "R", "value": 8.314462618, "unit": "J/(mol·K)" }
  ],
  "Electromagnetism": [
    { "name": "Elementary charge", "symbol": "e", "value": 1.602176634e-19, "unit": "C" },
    { "name": "Vacuum permittivity", "symbol": "ε₀", "value": 8.8541878128e-12, "unit": "F/m" },
    { "name": "Vacuum permeability", "symbol": "μ₀", "value": 1.25663706212e-6, "unit": "H/m" },
    { "name": "Coulomb's constant", "symbol": "k_e", "value": 8.9875517923e9, "unit": "N·m²/C²" },
    { "name": "Josephson constant", "symbol": "K_J", "value": 483597.8484e9, "unit": "Hz/V" },
    { "name": "von Klitzing constant", "symbol": "R_K", "value": 25812.80745, "unit": "Ω" },
    { "name": "Magnetic flux quantum", "symbol": "Φ₀", "value": 2.067833848e-15, "unit": "Wb" }
  ],
   "Atomic & Nuclear": [
    { "name": "Electron mass", "symbol": "m_e", "value": 9.1093837015e-31, "unit": "kg" },
    { "name": "Proton mass", "symbol": "m_p", "value": 1.67262192369e-27, "unit": "kg" },
    { "name": "Neutron mass", "symbol": "m_n", "value": 1.67492749804e-27, "unit": "kg" },
    { "name": "Bohr radius", "symbol": "a₀", "value": 5.29177210903e-11, "unit": "m" },
    { "name": "Rydberg constant", "symbol": "R_∞", "value": 10973731.568160, "unit": "m⁻¹" },
    { "name": "Fine-structure constant", "symbol": "α", "value": 7.2973525693e-3, "unit": "dimensionless" },
    { "name": "Atomic mass unit", "symbol": "u", "value": 1.66053906660e-27, "unit": "kg" }
  ],
  "Chemistry": [
    { "name": "Avogadro constant", "symbol": "N_A", "value": 6.02214076e23, "unit": "mol⁻¹" },
    { "name": "Faraday constant", "symbol": "F", "value": 96485.33212, "unit": "C/mol" },
    { "name": "Molar volume (ideal gas, 1 atm, 0°C)", "symbol": "V_m", "value": 0.022413962, "unit": "m³/mol" }
  ],
  "Thermodynamics": [
    { "name": "Gas constant", "symbol": "R", "value": 8.314462618, "unit": "J/(mol·K)" },
    { "name": "Specific heat of water (liquid)", "symbol": "c_water", "value": 4186, "unit": "J/(kg·K)" },
    { "name": "Specific heat of air (cp)", "symbol": "c_p_air", "value": 1005, "unit": "J/(kg·K)" },
    { "name": "Specific heat of copper", "symbol": "c_copper", "value": 385, "unit": "J/(kg·K)" },
    { "name": "Thermal conductivity of water", "symbol": "k_water", "value": 0.6, "unit": "W/(m·K)" },
    { "name": "Thermal conductivity of air", "symbol": "k_air", "value": 0.026, "unit": "W/(m·K)" },
    { "name": "Thermal conductivity of copper", "symbol": "k_copper", "value": 401, "unit": "W/(m·K)" }
  ],
  "Mechanical": [
    { "name": "Standard gravity", "symbol": "g₀", "value": 9.80665, "unit": "m/s²" },
    { "name": "Air density (sea level, 15°C)", "symbol": "ρ_air", "value": 1.225, "unit": "kg/m³" },
    { "name": "Standard atmosphere", "symbol": "atm", "value": 101325, "unit": "Pa" }
  ],
  "Math": [
    { "name": "Pi", "symbol": "π", "value": 3.141592653589793, "unit": "dimensionless" },
    { "name": "Euler's number", "symbol": "e", "value": 2.718281828459045, "unit": "dimensionless" },
    { "name": "Golden ratio", "symbol": "φ", "value": 1.618033988749895, "unit": "dimensionless" }
  ]
};