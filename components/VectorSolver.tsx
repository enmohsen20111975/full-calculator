import React, { useState } from 'react';
import * as math from 'mathjs';
import Input from './ui/Input';
import Button from './ui/Button';

// Vector component type
type Vector3D = {
  x: string;
  y: string;
  z: string;
};

const VectorSolver: React.FC = () => {
  const [vecA, setVecA] = useState<Vector3D>({ x: '1', y: '2', z: '3' });
  const [vecB, setVecB] = useState<Vector3D>({ x: '4', y: '5', z: '6' });
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVectorChange = (
    vectorSetter: React.Dispatch<React.SetStateAction<Vector3D>>,
    axis: 'x' | 'y' | 'z',
    value: string
  ) => {
    vectorSetter(prev => ({ ...prev, [axis]: value }));
    setResult(null);
    setError(null);
  };

  const parseVector = (vec: Vector3D): number[] => {
    const x = parseFloat(vec.x);
    const y = parseFloat(vec.y);
    const z = parseFloat(vec.z);
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      throw new Error('All vector components must be valid numbers.');
    }
    return [x, y, z];
  };

  const calculate = (operation: 'add' | 'subtract' | 'dot' | 'cross') => {
    try {
      const vA = parseVector(vecA);
      const vB = parseVector(vecB);
      setError(null);

      let calcResult: number | math.MathType;
      let resultString = '';

      switch (operation) {
        case 'add':
          calcResult = math.add(vA, vB);
          resultString = `A + B = [${math.format(calcResult as number[], { precision: 6 })}]`;
          resultString += `\nMagnitude ≈ ${math.format(math.norm(calcResult as number[]), { precision: 6 })}`;
          break;
        case 'subtract':
          calcResult = math.subtract(vA, vB);
          resultString = `A - B = [${math.format(calcResult as number[], { precision: 6 })}]`;
          resultString += `\nMagnitude ≈ ${math.format(math.norm(calcResult as number[]), { precision: 6 })}`;
          break;
        case 'dot':
          calcResult = math.dot(vA, vB);
          resultString = `A · B = ${math.format(calcResult, { precision: 6 })}`;
          break;
        case 'cross':
          calcResult = math.cross(vA, vB);
          resultString = `A × B = [${math.format(calcResult as number[], { precision: 6 })}]`;
          resultString += `\nMagnitude ≈ ${math.format(math.norm(calcResult as number[]), { precision: 6 })}`;
          break;
      }
      setResult(resultString);
    } catch (e: any) {
      setError(e.message || 'An error occurred during calculation.');
      setResult(null);
    }
  };

  const renderVectorInputs = (
    label: string,
    vector: Vector3D,
    setter: React.Dispatch<React.SetStateAction<Vector3D>>
  ) => (
    <div className="space-y-2 p-4 bg-slate-700/30 rounded-lg">
      <h4 className="font-semibold text-white">{label}</h4>
      <div className="grid grid-cols-3 gap-2">
        {(['x', 'y', 'z'] as const).map(axis => (
          <div key={axis}>
            <label className="block text-sm font-medium text-slate-300 mb-1">{axis.toUpperCase()}</label>
            <Input
              type="number"
              value={vector[axis]}
              onChange={e => handleVectorChange(setter, axis, e.target.value)}
              placeholder={axis}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderVectorInputs('Vector A', vecA, setVecA)}
        {renderVectorInputs('Vector B', vecB, setVecB)}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <Button onClick={() => calculate('add')}>Add (A + B)</Button>
        <Button onClick={() => calculate('subtract')}>Subtract (A - B)</Button>
        <Button onClick={() => calculate('dot')}>Dot Product (A · B)</Button>
        <Button onClick={() => calculate('cross')}>Cross Product (A × B)</Button>
      </div>

      {result && (
        <div className="bg-green-900/50 border border-green-700 text-green-300 p-3 rounded-md text-center whitespace-pre-wrap">
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

export default VectorSolver;
