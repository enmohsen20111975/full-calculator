import React, { useState } from 'react';
import * as math from 'mathjs';
import Input from './ui/Input';
import Button from './ui/Button';

const DifferentiationSolver: React.FC = () => {
    const [funcStr, setFuncStr] = useState('x^3 + 2x^2 - 5');
    const [evalPoint, setEvalPoint] = useState('2');
    const [derivative, setDerivative] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const calculateDerivative = () => {
        setError('');
        setDerivative('');
        setResult('');

        if (!funcStr.trim()) {
            setError('Please enter a function.');
            return;
        }

        try {
            const node = math.parse(funcStr);
            const derivativeNode = math.derivative(node, 'x');
            setDerivative(`d/dx = ${derivativeNode.toString()}`);

            if (evalPoint.trim() !== '') {
                const point = parseFloat(evalPoint);
                if (isNaN(point)) {
                    setError('Invalid evaluation point. It must be a number.');
                    return;
                }
                const compiledDerivative = derivativeNode.compile();
                const evalResult = compiledDerivative.evaluate({ x: point });
                setResult(`Result at x = ${point}: ${math.format(evalResult, { precision: 8 })}`);
            }

        } catch (e: any) {
            setError(e.message || 'Could not compute the derivative.');
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <span className="font-mono text-lg text-slate-400">f(x) =</span>
                <Input 
                    value={funcStr}
                    onChange={(e) => setFuncStr(e.target.value)}
                    placeholder="e.g., x^2 + sin(x)"
                />
            </div>
             <div className="flex items-center space-x-2">
                <span className="font-mono text-lg text-slate-400">at x =</span>
                <Input 
                    value={evalPoint}
                    onChange={(e) => setEvalPoint(e.target.value)}
                    placeholder="(optional)"
                    type="number"
                />
            </div>
            <Button onClick={calculateDerivative} className="w-full">Calculate Derivative</Button>

            {derivative && (
                <div className="bg-slate-700/50 p-3 rounded-md text-center">
                    <p className="font-semibold text-slate-300">Symbolic Derivative:</p>
                    <p className="text-lg font-mono text-cyan-400">{derivative}</p>
                </div>
            )}
            {result && (
                <div className="bg-green-900/50 border border-green-700 text-green-300 p-3 rounded-md text-center">
                    <p className="font-semibold">Numerical Result:</p>
                    <p className="text-lg font-mono">{result}</p>
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

export default DifferentiationSolver;
