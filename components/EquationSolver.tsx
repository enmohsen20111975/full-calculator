import React, { useState } from 'react';
// Fix: Import `Fraction` type from mathjs to be used for type casting.
import { create, all, MathType, Fraction } from 'mathjs';
import Button from './ui/Button';

// Configure mathjs to use Fractions for higher precision
const math = create(all, {
  number: 'Fraction',
});

const EquationSolver: React.FC = () => {
  const [equation, setEquation] = useState('2x + y = 5\nx - y = 1');
  const [solution, setSolution] = useState('');
  const [error, setError] = useState('');

  const handleEquationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // Allow valid equation characters including newlines
    const validEquationRegex = /^[a-zA-Z0-9\s.+\-*/^()=.\n]*$/;
    if (validEquationRegex.test(value)) {
      setEquation(value);
    }
  };

  const showExample = () => {
    setEquation("2x + y - z = 8\nx - y + 2z = -3\nx + 2y + z = 4");
    setSolution('');
    setError('');
  };

  const solveEquation = () => {
    setError('');
    setSolution('');

    const lines = equation.trim().split('\n').filter(line => line.trim() !== '');

    if (lines.length === 0) {
        return;
    }

    // --- System of Linear Equations Solver ---
    if (lines.length > 1) {
        try {
            // 1. Find all unique variables
            const variableSet = new Set<string>();
            const mathjsConstants = new Set(['e', 'i', 'pi', 'phi', 'tau', 'Infinity', 'NaN']); 

            lines.forEach(eq => {
                const node = math.parse(eq);
                // Fix: Use math.isSymbolNode as a type guard to correctly identify symbol nodes.
                node.traverse(subNode => {
                    if (math.isSymbolNode(subNode) && !mathjsConstants.has(subNode.name)) {
                        variableSet.add(subNode.name);
                    }
                });
            });
            const variableOrder = Array.from(variableSet);


            if (variableOrder.length === 0) {
                throw new Error("No variables found in the equations.");
            }

            if (variableOrder.length !== lines.length) {
                throw new Error(`A unique solution requires the number of equations to match the number of variables. Found ${variableOrder.length} variables and ${lines.length} equations.`);
            }

            const coefficients: MathType[][] = [];
            const constants: MathType[] = [];

            // 2. Build the matrix (A) and vector (B)
            lines.forEach(eq => {
                if (!eq.includes('=')) {
                    throw new Error(`Invalid equation format: "${eq}". Must contain an "=".`);
                }
                const [lhs, rhs] = eq.split('=');
                const expressionNode = math.parse(`(${lhs.trim()}) - (${rhs.trim()})`);

                const row: MathType[] = [];
                const zeroScope = variableOrder.reduce((acc, v) => ({ ...acc, [v]: math.fraction(0) }), {});
                
                variableOrder.forEach(variable => {
                    const derivativeNode = math.derivative(expressionNode, variable);
                    const coeff = derivativeNode.evaluate(zeroScope);
                    row.push(coeff);
                });
                coefficients.push(row);

                const constantTerm = expressionNode.evaluate(zeroScope);
                constants.push(math.unaryMinus(constantTerm));
            });

            // 3. Solve using math.lusolve
            let solutions: MathType[];
            try {
                // Fix: Convert coefficients array to a math.js Matrix and cast constants array to satisfy lusolve's type requirements.
                // FIX: Cast `coefficients` to `Fraction[][]` to resolve type error with `math.matrix` which expects a more specific type than `MathType[][]`.
                const solutionMatrix = math.lusolve(math.matrix(coefficients as Fraction[][]), constants as Fraction[]);
                solutions = (solutionMatrix as any).toArray().flat();
            } catch (e) {
                throw new Error("The system may be singular (no unique solution) or inconsistent.");
            }
            
            // 4. Format the result string
            const resultString = variableOrder.map((variable, index) => {
                return `${variable} = ${math.format(solutions[index])}`;
            }).join(',  ');
            
            setSolution(resultString);

        } catch (e: any) {
            setError(e.message || 'Failed to solve the system of equations.');
            console.error(e);
        }
        return;
    }

    // --- Single Equation Solver (Linear or Quadratic) ---
    const singleEquation = lines[0];
    try {
        if (!singleEquation.includes('=')) {
            setError('Invalid equation: Must contain "=" sign.');
            return;
        }

      const parts = singleEquation.split('=');
      if (parts.length < 2 || !parts[0].trim() || !parts[1].trim()) {
        setError('Invalid equation format. Ensure there are expressions on both sides of the "=".');
        return;
      }
      const expression = `(${parts[0].trim()}) - (${parts[1].trim()})`;
      
      const node = math.parse(expression);
      const simplified = math.simplify(node);
      
      const simplifiedStr = simplified.toString();
      const variables = [...new Set(simplifiedStr.match(/[a-zA-Z]/g) || [])];
      
      if (variables.length === 0) {
          setError("No variable found to solve for.");
          return;
      }
      if (variables.length > 1) {
            setError(`Multiple variables (${variables.join(', ')}) found. This solver handles one unknown.`);
            return;
      }
      
      const variable = variables[0];
      let solved = false;

      // 1. Try linear solve (ax + b = 0)
      try {
        const rationalizedLinear = math.rationalize(simplified, {}, true) as { coefficients: MathType[] };
        if (rationalizedLinear.coefficients && rationalizedLinear.coefficients.length <= 2 && rationalizedLinear.coefficients.length > 0) {
            const b = rationalizedLinear.coefficients[0];
            const a = rationalizedLinear.coefficients.length > 1 ? rationalizedLinear.coefficients[1] : math.fraction(0);
            
            if(!math.equal(a, 0)) {
                const result = math.divide(math.unaryMinus(b), a);
                setSolution(`${variable} = ${math.format(result)}`);
                solved = true;
            }
        }
      } catch(e) { /* fall through */ }


      // 2. Try quadratic solve (ax^2 + bx + c = 0)
      if(!solved) {
          try {
              // Fix: Pass the variable as a string directly to math.rationalize, which avoids the computed property name error.
              const rationalizedQuadratic = math.rationalize(simplified, variable, true) as { coefficients: MathType[] };
                if (rationalizedQuadratic.coefficients) {
                  const c = rationalizedQuadratic.coefficients[0] || math.fraction(0);
                  const b = rationalizedQuadratic.coefficients[1] || math.fraction(0);
                  const a = rationalizedQuadratic.coefficients[2] || math.fraction(0);

                  if (!math.equal(a, 0)) { // It's a quadratic
                      const discriminant = math.subtract(math.multiply(b, b), math.multiply(4, math.multiply(a, c)));

                      if (math.smaller(discriminant, 0)) {
                            setError("No real solutions (discriminant is negative).");
                            return;
                      }
                      
                      // Fix: The type of `discriminant` is `MathType`, which is too broad for `math.sqrt`.
                      // Since we have checked that it is not negative, we can safely cast it to a `number`
                      // for type-checking purposes. Math.js will handle the `Fraction` type at runtime.
                      const sqrtDiscriminant = math.sqrt(discriminant as number);
                      const twoA = math.multiply(2, a);

                      const x1 = math.divide(math.add(math.unaryMinus(b), sqrtDiscriminant), twoA);
                      const x2 = math.divide(math.subtract(math.unaryMinus(b), sqrtDiscriminant), twoA);
                      
                      if (math.equal(x1, x2)) {
                          setSolution(`${variable} = ${math.format(x1)}`);
                      } else {
                          setSolution(`${variable}₁ = ${math.format(x1)},  ${variable}₂ = ${math.format(x2)}`);
                      }
                      solved = true;
                  }
              }
          } catch(e) { /* fall through */ }
      }

      if(!solved) {
        // Fallback to try linear again if quadratic fails (e.g., if 'a' was 0)
        const rationalized = math.rationalize(simplified, {}, true) as { coefficients: MathType[] };
        if(rationalized.coefficients && rationalized.coefficients.length <=2 && rationalized.coefficients.length > 0) {
           const b = rationalized.coefficients[0];
           const a = rationalized.coefficients.length > 1 ? rationalized.coefficients[1] : math.fraction(0);
           if(!math.equal(a,0)) {
              const result = math.divide(math.unaryMinus(b), a);
              setSolution(`${variable} = ${math.format(result)}`);
              solved = true;
           }
        }
      }
      
      if (!solved) {
        setError('Solver supports linear or quadratic equations only (e.g., ax^2 + bx + c = 0).');
      }

    } catch (e) {
      setError('Could not solve the equation. Please check the format.');
      console.error(e);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="equation-input" className="block text-sm font-medium text-slate-300 mb-1">Enter a single equation (ax²+bx+c=0) or a system of linear equations (one per line for 2, 3, 4+ variables).</label>
        <textarea
          id="equation-input"
          value={equation}
          onChange={handleEquationChange}
          placeholder={"Example (3 variables):\n2x + y - z = 8\nx - y + 2z = -3\nx + 2y + z = 4"}
          rows={4}
          className="w-full bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition font-mono"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={solveEquation} className="w-full">Solve</Button>
        <Button onClick={showExample} variant="secondary" className="w-full">Show Example</Button>
      </div>
      {solution && (
        <div className="bg-green-900/50 border border-green-700 text-green-300 p-3 rounded-md text-center">
          <p className="font-semibold">Solution:</p>
          <p className="text-lg font-mono">{solution}</p>
        </div>
      )}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md text-center">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default EquationSolver;