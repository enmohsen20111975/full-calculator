import { EquationCategoryData } from "./data/equations/index";

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
  equations: EquationCategoryData;
  geometry?: Shape[];
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