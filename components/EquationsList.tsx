import React, { useState, useMemo } from 'react';
import * as math from 'mathjs';
import type { Equation } from '../types';
// Fix: Correct import path for EquationCategoryData
import { EquationCategoryData } from '../data/equations/index';
import Input from './ui/Input';
import Button from './ui/Button';

interface EquationsListProps {
  equationsData: EquationCategoryData;
}

const EquationSolverModule: React.FC<{ equation: Equation }> = ({ equation }) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const variableNames = Object.keys(equation.variables);

  const handleValueChange = (symbol: string, value: string) => {
    setValues(prev => ({ ...prev, [symbol]: value }));
    setResult(null);
    setError(null);
  };
  
  const unknownVariable = useMemo(() => {
    const emptyFields = variableNames.filter(key => !values[key] || values[key].trim() === '');
    if (emptyFields.length === 1) {
      return emptyFields[0];
    }
    return null;
  }, [values, variableNames]);

  const solve = () => {
    if (!unknownVariable) {
        setError(`Please provide values for all but one variable.`);
        return;
    }

    try {
        const [lhs, rhs] = equation.equation.split('=').map(s => s.trim());
        const expression = `(${lhs}) - (${rhs})`;
        
        const scope: { [key: string]: number } = {};
        for(const key in values) {
            if(values[key] && key !== unknownVariable) {
                scope[key] = parseFloat(values[key]);
            }
        }
        
        const node = math.parse(expression);
        const simplifiedNode = node.transform(function (node) {
            if (math.isSymbolNode(node) && scope.hasOwnProperty(node.name)) {
                return new math.ConstantNode(scope[node.name]);
            }
            return node;
        });

        let solved = false;
        
        // 1. Try linear solve (ax + b = 0)
        try {
            const rationalized = math.rationalize(simplifiedNode, {}, true) as { coefficients: (number|math.MathType)[] };
            if (rationalized.coefficients && rationalized.coefficients.length <= 2 && rationalized.coefficients.length > 0) {
                const b = rationalized.coefficients[0];
                const a = rationalized.coefficients.length > 1 ? rationalized.coefficients[1] : 0;
                
                if (!math.equal(a, 0)) {
                    const calculation = math.divide(math.unaryMinus(b), a);
                    const unit = equation.variables[unknownVariable].match(/\(([^)]+)\)/)?.[1] || '';
                    setResult(`${unknownVariable} = ${math.format(calculation, {precision: 6})} ${unit}`);
                    setError(null);
                    solved = true;
                }
            }
        } catch (e) { /* Fall through to next solver */ }


        // 2. If not solved, try quadratic solve (ax^2 + bx + c = 0)
        if (!solved) {
            try {
                const rationalized = math.rationalize(simplifiedNode, {[unknownVariable]: true}, true) as { coefficients: (number|math.MathType)[], variables: string[] };

                if (rationalized.coefficients && rationalized.variables.includes(unknownVariable)) {
                    const c = rationalized.coefficients[0] || 0;
                    const b = rationalized.coefficients[1] || 0;
                    const a = rationalized.coefficients[2] || 0;

                    if (!math.equal(a, 0)) { // It's a quadratic
                        const discriminant = math.subtract(math.multiply(b, b), math.multiply(4, math.multiply(a, c)));

                        if (math.smaller(discriminant, 0)) {
                              setError("No real solutions (discriminant is negative).");
                              return;
                        }

                        // Fix: The type of `discriminant` is `MathType`, which is too broad for TypeScript.
                        // `math.re` was used to help with type inference but causes other issues.
                        // Since we've checked that discriminant is not negative,
                        // we can safely call math.sqrt after casting to a number.
                        const sqrtDiscriminant = math.sqrt(discriminant as number);
                        const twoA = math.multiply(2, a);

                        const x1 = math.divide(math.add(math.unaryMinus(b), sqrtDiscriminant), twoA);
                        const x2 = math.divide(math.subtract(math.unaryMinus(b), sqrtDiscriminant), twoA);

                        const unit = equation.variables[unknownVariable].match(/\(([^)]+)\)/)?.[1] || '';
                        
                        if (math.equal(x1, x2)) {
                            setResult(`${unknownVariable} = ${math.format(x1, {precision: 6})} ${unit}`);
                        } else {
                            const resultText = `${unknownVariable}₁ = ${math.format(x1, {precision: 6})} ${unit}, ${unknownVariable}₂ = ${math.format(x2, {precision: 6})} ${unit}`;
                            setResult(resultText.replace(/₁/g, '₁').replace(/₂/g, '₂'));
                        }

                        setError(null);
                        solved = true;
                    }
                }
            } catch (e) { /* Fall through to error */ }
        }

        if (!solved) {
              setError('Solver only supports linear and quadratic equations currently.');
              return;
        }

    } catch (e) {
        setError('Calculation error. Check your inputs or equation complexity.');
        console.error(e);
    }
  };

  return (
    <div className="bg-slate-700/30 p-4 rounded-lg space-y-4">
        <div className="text-center">
            <p className="font-mono text-lg text-cyan-400">{equation.equation}</p>
            <p className="text-sm text-slate-400 mt-1">{equation.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {variableNames.map(symbol => (
                <div key={symbol}>
                    <label className="block text-sm font-medium text-slate-300 mb-1">{equation.variables[symbol]}</label>
                    <Input 
                        type="number"
                        placeholder={symbol}
                        value={values[symbol] || ''}
                        onChange={e => handleValueChange(symbol, e.target.value)}
                        className={unknownVariable === symbol ? 'border-cyan-500 ring-cyan-500' : ''}
                    />
                </div>
            ))}
        </div>
        <Button onClick={solve} disabled={!unknownVariable} className="w-full">
            {unknownVariable ? `Solve for ${unknownVariable}` : 'Enter all but one value to solve'}
        </Button>
        {result && (
             <div className="bg-green-900/50 border border-green-700 text-green-300 p-3 rounded-md text-center">
                <p className="font-semibold">Result:</p>
                <p className="text-lg font-mono">{result}</p>
             </div>
        )}
        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md text-center">
                <p>{error}</p>
            </div>
        )}
    </div>
  )
}

const EquationsList: React.FC<EquationsListProps> = ({ equationsData }) => {
  const subCategories = Object.keys(equationsData);
  const [activeSubCategory, setActiveSubCategory] = useState(subCategories[0]);
  const [selectedEquation, setSelectedEquation] = useState<Equation | null>(equationsData[activeSubCategory]?.[0] || null);

  const handleSubCategoryChange = (subCategory: string) => {
    setActiveSubCategory(subCategory);
    setSelectedEquation(equationsData[subCategory][0] || null);
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <aside className="md:w-1/4 lg:w-1/5">
            <h4 className="font-semibold mb-3 text-white">Sub-categories</h4>
            <ul className="space-y-2">
                {subCategories.map(sc => (
                    <li key={sc}>
                        <button 
                            onClick={() => handleSubCategoryChange(sc)}
                            className={`w-full text-left p-2 rounded-md transition-colors text-sm ${activeSubCategory === sc ? 'bg-cyan-800 text-white font-semibold' : 'hover:bg-slate-700/50'}`}
                        >
                            {sc}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
        <div className="flex-1">
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-white">Select Equation from "{activeSubCategory}"</h4>
              <div className="flex flex-wrap gap-2">
                  {equationsData[activeSubCategory].map(eq => (
                      <button 
                          key={eq.name}
                          onClick={() => setSelectedEquation(eq)}
                          className={`p-2 text-xs rounded-md transition-colors ${selectedEquation?.name === eq.name ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-700 hover:bg-slate-600'}`}
                      >
                          {eq.name}
                      </button>
                  ))}
              </div>
            </div>
            
            {selectedEquation ? (
                <EquationSolverModule key={selectedEquation.name} equation={selectedEquation} />
            ) : (
                <div className="flex items-center justify-center h-full bg-slate-700/30 rounded-lg min-h-[200px]">
                    <p className="text-slate-400">Select an equation to begin.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default EquationsList;
