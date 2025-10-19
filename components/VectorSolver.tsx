import React, { useState, useRef, useEffect } from 'react';
import * as math from 'mathjs';
import Input from './ui/Input';
import Button from './ui/Button';

// Plotly is loaded from CDN, declare its type for TypeScript
declare const Plotly: any;

// Vector component type
type Vector3D = {
  x: string;
  y: string;
  z: string;
};

const VectorSolver: React.FC = () => {
  const [vecA, setVecA] = useState<Vector3D>({ x: '1', y: '2', z: '3' });
  const [vecB, setVecB] = useState<Vector3D>({ x: '4', y: '5', z: '6' });
  const [scalar, setScalar] = useState<string>('2');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [lastResultVec, setLastResultVec] = useState<number[] | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);


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
  
  const plotVectors = () => {
      if (!plotRef.current) return;
      
      try {
        const vA = parseVector(vecA);
        const vB = parseVector(vecB);
        
        const createTrace = (vector: number[], name: string, color: string) => [
            {
                type: 'scatter3d',
                x: [0, vector[0]], y: [0, vector[1]], z: [0, vector[2]],
                mode: 'lines', line: { width: 8, color }, name
            },
            {
                type: 'cone',
                x: [vector[0]], y: [vector[1]], z: [vector[2]],
                u: [vector[0] * 0.2], v: [vector[1] * 0.2], w: [vector[2] * 0.2],
                sizemode: 'absolute', sizeref: 0.3, showscale: false,
                colorscale: [[0, color], [1, color]],
                anchor: 'tip', name: `${name} Head`
            }
        ];

        let traces = [
            ...createTrace(vA, 'Vector A', '#38bdf8'), // light blue
            ...createTrace(vB, 'Vector B', '#34d399'), // emerald
        ];

        if (lastResultVec) {
            traces.push(...createTrace(lastResultVec, 'Result', '#fb7185')); // rose
        }

        const layout = {
            title: 'Vector Visualization',
            scene: {
                xaxis: { title: 'X', gridcolor: '#475569', zerolinecolor: '#64748b' },
                yaxis: { title: 'Y', gridcolor: '#475569', zerolinecolor: '#64748b' },
                zaxis: { title: 'Z', gridcolor: '#475569', zerolinecolor: '#64748b' },
                camera: { eye: {x: 1.5, y: 1.5, z: 1.5} },
                aspectmode: 'cube',
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#cbd5e1' },
            showlegend: true,
            legend: { bgcolor: 'rgba(30, 41, 59, 0.5)', bordercolor: '#475569' },
            margin: { l: 0, r: 0, b: 0, t: 40 }
        };

        Plotly.newPlot(plotRef.current, traces, layout, {responsive: true});

      } catch (e) {
          Plotly.purge(plotRef.current); // Clear plot on error
      }
  };

  useEffect(() => {
    plotVectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vecA, vecB, lastResultVec]);


  const calculate = (operation: string) => {
    try {
      const vA = parseVector(vecA);
      const vB = parseVector(vecB);
      const s = parseFloat(scalar);
      setError(null);
      setLastResultVec(null);

      let calcResult: any;
      let resultString = '';

      switch (operation) {
        case 'add':
          calcResult = math.add(vA, vB);
          resultString = `A + B = [${math.format(calcResult, { precision: 6 })}]`;
          resultString += `\nMagnitude ≈ ${math.format(math.norm(calcResult), { precision: 6 })}`;
          setLastResultVec(calcResult);
          break;
        case 'subtract':
          calcResult = math.subtract(vA, vB);
          resultString = `A - B = [${math.format(calcResult, { precision: 6 })}]`;
          resultString += `\nMagnitude ≈ ${math.format(math.norm(calcResult), { precision: 6 })}`;
          setLastResultVec(calcResult);
          break;
        case 'dot':
          calcResult = math.dot(vA, vB);
          resultString = `A · B = ${math.format(calcResult, { precision: 6 })}`;
          break;
        case 'cross':
          calcResult = math.cross(vA, vB);
          resultString = `A × B = [${math.format(calcResult, { precision: 6 })}]`;
          resultString += `\nMagnitude ≈ ${math.format(math.norm(calcResult), { precision: 6 })}`;
          setLastResultVec(calcResult);
          break;
        case 'magnitudeA':
          calcResult = math.norm(vA);
          resultString = `|A| ≈ ${math.format(calcResult, { precision: 6 })}`;
          break;
        case 'magnitudeB':
            calcResult = math.norm(vB);
            resultString = `|B| ≈ ${math.format(calcResult, { precision: 6 })}`;
            break;
        case 'scalarMulA':
            if(isNaN(s)) throw new Error("Scalar must be a valid number.");
            calcResult = math.multiply(vA, s);
            resultString = `${s} × A = [${math.format(calcResult, { precision: 6 })}]`;
            setLastResultVec(calcResult);
            break;
        case 'scalarMulB':
            if(isNaN(s)) throw new Error("Scalar must be a valid number.");
            calcResult = math.multiply(vB, s);
            resultString = `${s} × B = [${math.format(calcResult, { precision: 6 })}]`;
            setLastResultVec(calcResult);
            break;
        case 'angle':
            const dotProd = math.dot(vA, vB);
            const normA = math.norm(vA);
            const normB = math.norm(vB);
            if (normA === 0 || normB === 0) throw new Error("Cannot calculate angle for zero vector.");
            // Fix: The native `/` and `*` operators cannot be used on math.js's `MathType`.
            // Use `math.divide` and `math.multiply` for calculations involving `MathType` values.
            const cosTheta = math.divide(dotProd, math.multiply(normA, normB));
            // Fix: The native `*` operator cannot be used on math.js's `MathType`.
            // Use `math.multiply` for calculations involving `MathType` values.
            calcResult = math.multiply(math.acos(math.max(-1, math.min(1, cosTheta as number))), (180 / Math.PI)); // Clamp for safety
            resultString = `Angle(A, B) ≈ ${math.format(calcResult, { precision: 6 })}°`;
            break;
        case 'scalarProj':
            const normB_sp = math.norm(vB);
            if(normB_sp === 0) throw new Error("Cannot project onto a zero vector.");
            // Fix: The native `/` operator cannot be used on math.js's `MathType`.
            // Use `math.divide` for calculations involving `MathType` values.
            calcResult = math.divide(math.dot(vA, vB), normB_sp);
            resultString = `Scalar Projection of A on B ≈ ${math.format(calcResult, { precision: 6 })}`;
            break;
        case 'vectorProj':
            const dotBB = math.dot(vB, vB);
            if(dotBB === 0) throw new Error("Cannot project onto a zero vector.");
            // Fix: The native `/` operator cannot be used on math.js's `MathType`.
            // Use `math.divide` for calculations involving `MathType` values.
            const scaleFactor = math.divide(math.dot(vA, vB), dotBB);
            calcResult = math.multiply(vB, scaleFactor);
            resultString = `Vector Projection of A on B ≈ [${math.format(calcResult, { precision: 6 })}]`;
            setLastResultVec(calcResult);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderVectorInputs('Vector A', vecA, setVecA)}
          {renderVectorInputs('Vector B', vecB, setVecB)}
        </div>
        
        <h4 className="font-semibold text-white border-b border-slate-700 pb-1">Vector Operations</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => calculate('add')}>Add (A + B)</Button>
          <Button onClick={() => calculate('subtract')}>Subtract (A - B)</Button>
          <Button onClick={() => calculate('dot')}>Dot Product (A · B)</Button>
          <Button onClick={() => calculate('cross')}>Cross Product (A × B)</Button>
        </div>
        
        <h4 className="font-semibold text-white border-b border-slate-700 pb-1 pt-2">Vector Properties & Relations</h4>
         <div className="grid grid-cols-2 gap-2">
           <Button variant="secondary" onClick={() => calculate('magnitudeA')}>Magnitude |A|</Button>
           <Button variant="secondary" onClick={() => calculate('magnitudeB')}>Magnitude |B|</Button>
           <Button variant="secondary" onClick={() => calculate('angle')}>Angle (A, B)</Button>
           <Button variant="secondary" onClick={() => calculate('scalarProj')}>Scalar Proj (A on B)</Button>
           <Button variant="secondary" onClick={() => calculate('vectorProj')}>Vector Proj (A on B)</Button>
        </div>

        <h4 className="font-semibold text-white border-b border-slate-700 pb-1 pt-2">Scalar Operations</h4>
        <div className="flex items-end gap-2">
            <div className="flex-1">
                <label className="block text-sm font-medium text-slate-300 mb-1">Scalar Value</label>
                <Input type="number" value={scalar} onChange={(e) => setScalar(e.target.value)} />
            </div>
            <Button variant="secondary" onClick={() => calculate('scalarMulA')}>Scalar × A</Button>
            <Button variant="secondary" onClick={() => calculate('scalarMulB')}>Scalar × B</Button>
        </div>

        {result && (
          <div className="bg-green-900/50 border border-green-700 text-green-300 p-3 mt-4 rounded-md text-center whitespace-pre-wrap">
            <p className="font-semibold">Result:</p>
            <p className="text-lg font-mono">{result}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 mt-4 rounded-md text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
      <div className="bg-slate-900/50 rounded-lg min-h-[400px] lg:min-h-0">
         <div ref={plotRef} className="w-full h-full min-h-[400px] lg:min-h-0"></div>
      </div>
    </div>
  );
};

export default VectorSolver;
