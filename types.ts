import { EquationCategoryData } from "./data/equations/index";
import { ReactionCategoryData } from './data/chemistry/reactions';

export interface Constant {
  name: string;
  symbol: string;
  value: number;
  unit: string;
}

export interface Equation {
  name: string;
  equation: string; // Renamed from formula, matches new JSON
  variables: { [key: string]: string }; // Changed from Variable[]
  description: string; // Added field
}

export interface ConstantsData {
    [category: string]: Constant[];
}

export interface Shape {
  name: string;
  dimension: '2D' | '3D';
  formulas: { [key: string]: string };
  variables: { [key: string]: string };
}

export interface Category {
  id: string;
  name: string;
  constants: Constant[];
  equations: EquationCategoryData | {}; // Allow empty object for tabs without equations
  geometry?: Shape[];
  reactions?: ReactionCategoryData;
}

export interface MainCategory {
  id: string;
  name: string;
  subCategories: Category[];
}

// Fix: Add missing type definitions for unit conversion data.
export interface ConversionRule {
  from: string;
  to: string;
  factor?: number;
  formula?: string;
}

export interface UnitConversionData {
  [category: string]: ConversionRule[];
}

export interface ChemicalReaction {
  category: string;
  reaction_name: string;
  reactants: string[];
  products: string[];
  balanced_equation: string;
  description: string;
  enthalpy_change?: number; // in kJ/mol
}

export interface PlotParameter {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
}
