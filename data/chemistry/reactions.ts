
import type { ChemicalReaction } from '../../types';

export interface ReactionCategoryData {
    [subCategory: string]: ChemicalReaction[];
}

export const chemistryReactions: ReactionCategoryData = {
    "General Reactions": [
        {
            category: "General Reactions",
            reaction_name: "Formation of Water",
            reactants: ["H2", "O2"],
            products: ["H2O"],
            balanced_equation: "2H₂ + O₂ → 2H₂O",
            description: "Hydrogen gas reacts with oxygen gas in an exothermic synthesis reaction to form water.",
            enthalpy_change: -285.8
        },
        {
            category: "General Reactions",
            reaction_name: "Haber-Bosch Process",
            reactants: ["N2", "H2"],
            products: ["NH3"],
            balanced_equation: "N₂ + 3H₂ ⇌ 2NH₃",
            description: "The synthesis of ammonia from nitrogen and hydrogen gas, a crucial industrial process for fertilizer production.",
            enthalpy_change: -92.4
        },
        {
            category: "General Reactions",
            reaction_name: "Decomposition of Calcium Carbonate",
            reactants: ["CaCO3"],
            products: ["CaO", "CO2"],
            balanced_equation: "CaCO₃ → CaO + CO₂",
            description: "Heating calcium carbonate (limestone) causes it to decompose into calcium oxide (lime) and carbon dioxide gas.",
            enthalpy_change: 178
        },
        {
            category: "General Reactions",
            reaction_name: "Decomposition of Hydrogen Peroxide",
            reactants: ["H2O2"],
            products: ["H2O", "O2"],
            balanced_equation: "2H₂O₂ → 2H₂O + O₂",
            description: "Hydrogen peroxide decomposes into water and oxygen gas, often accelerated by a catalyst like manganese dioxide.",
            enthalpy_change: -98.2
        }
    ],
    "Displacement Reactions": [
        {
            category: "Displacement Reactions",
            reaction_name: "Zinc in Copper Sulfate",
            reactants: ["Zn", "CuSO4"],
            products: ["ZnSO4", "Cu"],
            balanced_equation: "Zn + CuSO₄ → ZnSO₄ + Cu",
            description: "A single displacement reaction where more reactive zinc displaces copper from a copper(II) sulfate solution.",
            enthalpy_change: -217
        },
        {
            category: "Displacement Reactions",
            reaction_name: "Sodium in Water",
            reactants: ["Na", "H2O"],
            products: ["NaOH", "H2"],
            balanced_equation: "2Na + 2H₂O → 2NaOH + H₂↑",
            description: "A vigorous single displacement reaction where sodium metal reacts with water to produce sodium hydroxide and hydrogen gas.",
            enthalpy_change: -368.6
        },
        {
            category: "Displacement Reactions",
            reaction_name: "Chlorine and Potassium Bromide",
            reactants: ["Cl2", "KBr"],
            products: ["KCl", "Br2"],
            balanced_equation: "Cl₂ + 2KBr → 2KCl + Br₂",
            description: "Chlorine, being more reactive than bromine, displaces it from potassium bromide solution."
        }
    ],
    "Redox Reactions": [
         {
            category: "Redox Reactions",
            reaction_name: "Combustion of Methane",
            reactants: ["CH4", "O2"],
            products: ["CO2", "H2O"],
            balanced_equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
            description: "The complete oxidation of methane (natural gas), a classic combustion reaction that releases a significant amount of energy.",
            enthalpy_change: -890.3
        },
        {
            category: "Redox Reactions",
            reaction_name: "Rusting of Iron",
            reactants: ["Fe", "O2"],
            products: ["Fe2O3"],
            balanced_equation: "4Fe + 3O₂ → 2Fe₂O₃",
            description: "The oxidation of iron, commonly known as rusting, forms iron(III) oxide.",
            enthalpy_change: -824.2
        },
        {
            category: "Redox Reactions",
            reaction_name: "Copper with Nitric Acid",
            reactants: ["Cu", "HNO3"],
            products: ["Cu(NO3)2", "NO2", "H2O"],
            balanced_equation: "Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O",
            description: "Copper reacts with concentrated nitric acid, producing copper(II) nitrate, nitrogen dioxide gas, and water."
        }
    ],
    "Acid-Base Reactions": [
        {
            category: "Acid-Base Reactions",
            reaction_name: "Neutralization of HCl and NaOH",
            reactants: ["HCl", "NaOH"],
            products: ["NaCl", "H2O"],
            balanced_equation: "HCl + NaOH → NaCl + H₂O",
            description: "Hydrochloric acid (a strong acid) reacts with sodium hydroxide (a strong base) to form sodium chloride (a salt) and water.",
            enthalpy_change: -57.1
        },
        {
            category: "Acid-Base Reactions",
            reaction_name: "Vinegar and Baking Soda",
            reactants: ["CH3COOH", "NaHCO3"],
            products: ["CH3COONa", "H2O", "CO2"],
            balanced_equation: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂",
            description: "Acetic acid (vinegar) reacts with sodium bicarbonate (baking soda) to produce sodium acetate, water, and carbon dioxide gas.",
        },
        {
            category: "Acid-Base Reactions",
            reaction_name: "Sulfuric Acid and Potassium Hydroxide",
            reactants: ["H2SO4", "KOH"],
            products: ["K2SO4", "H2O"],
            balanced_equation: "H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O",
            description: "A neutralization reaction between a strong acid (sulfuric acid) and a strong base (potassium hydroxide)."
        }
    ],
    "Precipitation Reactions": [
        {
            category: "Precipitation Reactions",
            reaction_name: "Silver Nitrate and Sodium Chloride",
            reactants: ["AgNO3", "NaCl"],
            products: ["AgCl", "NaNO3"],
            balanced_equation: "AgNO₃ + NaCl → AgCl(s)↓ + NaNO₃",
            description: "An aqueous solution of silver nitrate reacts with sodium chloride to form a white precipitate of silver chloride."
        },
        {
            category: "Precipitation Reactions",
            reaction_name: "Lead(II) Nitrate and Potassium Iodide",
            reactants: ["Pb(NO3)2", "KI"],
            products: ["PbI2", "KNO3"],
            balanced_equation: "Pb(NO₃)₂ + 2KI → PbI₂(s)↓ + 2KNO₃",
            description: "Mixing solutions of lead(II) nitrate and potassium iodide results in a vibrant yellow precipitate of lead(II) iodide."
        }
    ],
    "Organic Reactions": [
        {
            category: "Organic Reactions",
            reaction_name: "Esterification (Fischer)",
            reactants: ["CH3COOH", "C2H5OH"],
            products: ["CH3COOC2H5", "H2O"],
            balanced_equation: "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O",
            description: "An equilibrium reaction where acetic acid and ethanol react, typically with an acid catalyst, to form the ester ethyl acetate and water."
        },
        {
            category: "Organic Reactions",
            reaction_name: "Combustion of Ethanol",
            reactants: ["C2H5OH", "O2"],
            products: ["CO2", "H2O"],
            balanced_equation: "C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O",
            description: "The complete combustion of ethanol in the presence of oxygen, releasing energy, carbon dioxide, and water.",
            enthalpy_change: -1367
        }
    ]
};
