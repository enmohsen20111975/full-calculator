import React, { useState } from 'react';
import * as math from 'mathjs';
import Input from './ui/Input';
import Button from './ui/Button';

// Simpson's 1/3 rule for numerical integration
const simpsonsRule = (func: (x: number) => number, a: number, b: number, n: number): number => {
    if (n % 2 !== 0) n++; // n must be even
    const h = (b - a) / n;
    let sum = func(a) + func(b);

    for (let i = 1; i < n; i += 2) {
        sum += 4 * func(a + i * h);
    }

    for (let i = 2; i < n - 1; i += 2) {
        sum += 2 * func(a + i * h);
    }

    return (h / 3) * sum;
};

const IntegrationSolver: React.FC = () => {
    const [funcStr, setFuncStr] = useState('x^2');
    const [lowerBound, setLowerBound] = useState('0');
    const [upperBound, setUpperBound] = useState('1');
    const [intervals, setIntervals] = useState('1000');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const calculateIntegral = () => {
        setError('');
        setResult('');
        
        try {
            const a = parseFloat(lowerBound);
            const b = parseFloat(upperBound);
            let n = parseInt(intervals);

            if (isNaN(a) || isNaN(b) || isNaN(n)) {
                setError('Bounds and intervals must be valid numbers.');
                return;
            }
            if (n <= 0) {
                setError('Number of intervals must be positive.');
                return;
            }
            if (b < a) {
                setError('Upper bound must be greater than or equal to the lower bound.');
                return;
            }

            const node = math.parse(funcStr);
            const code = node.compile();
            const funcToIntegrate = (x: number) => code.evaluate({ x });
            
            const integralResult = simpsonsRule(funcToIntegrate, a, b, n);

            setResult(`∫f(x)dx ≈ ${math.format(integralResult, { precision: 8 })}`);

        } catch (e: any) {
            setError(e.message || 'Could not compute the integral. Check the function.');
        }
    };


    return (
        <div className="space-y-4">
             <div className="flex items-center space-x-2">
                <span className="font-mono text-lg text-slate-400">∫</span>
                <Input 
                    value={funcStr}
                    onChange={(e) => setFuncStr(e.target.value)}
                    placeholder="f(x)"
                    className="flex-1"
                />
                 <span className="font-mono text-lg text-slate-400">dx</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">From (Lower Bound)</label>
                    <Input 
                        value={lowerBound}
                        onChange={(e) => setLowerBound(e.target.value)}
                        type="number"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">To (Upper Bound)</label>
                    <Input 
                        value={upperBound}
                        onChange={(e) => setUpperBound(e.target.value)}
                        type="number"
                    />
                </div>
            </div>
            <div>
                 <label className="block text-sm font-medium text-slate-300 mb-1">Intervals (for accuracy)</label>
                 <Input 
                    value={intervals}
                    onChange={(e) => setIntervals(e.target.value)}
                    type="number"
                    step="2"
                 />
            </div>

            <Button onClick={calculateIntegral} className="w-full">Calculate Integral</Button>
            
            <p className="text-xs text-slate-500 text-center">Note: This is a numerical approximation using Simpson's rule. Higher intervals yield better accuracy.</p>

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
    );
};

export default IntegrationSolver;
