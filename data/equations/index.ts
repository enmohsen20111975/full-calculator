import type { Equation } from '../../types';
import { mathEquations } from './math';
import { physicsEquations } from './physics';
import { chemistryEquations } from './chemistry';
import { electricalEquations } from './electrical';
import { mechanicalEquations } from './mechanical';
import { civilEquations } from './civil';
import { statsEquations } from './stats';
import { vectorEquations } from './vector';

export interface EquationCategoryData {
    [subCategory: string]: Equation[];
}

export {
    mathEquations,
    physicsEquations,
    chemistryEquations,
    electricalEquations,
    mechanicalEquations,
    civilEquations,
    statsEquations,
    vectorEquations,
};