import React, { useState, useEffect, useRef } from 'react';
import * as math from 'mathjs';
import type { PlotParameter } from '../types';
import Input from './ui/Input';
import Button from './ui/Button';
import Card from './ui/Card';

// Plotly is loaded from CDN, declare its type for TypeScript
declare const Plotly: any;

// Define plot types
type PlotType = '2d_explicit' | '2d_parametric' | '2d_implicit' | '3d_explicit';


const GraphPlotter: React.FC = () => {
  // Common state
  const plotRef = useRef<HTMLDivElement>(null);
  const [plotType, setPlotType] = useState<PlotType>('2d_explicit');
  const [range, setRange] = useState({ xMin: -5, xMax: 5, yMin: -5, yMax: 5 });

  // State for 2D Explicit: y = f(x)
  const [functions, setFunctions] = useState<string[]>(['sin(a * x)']);

  // State for 2D Parametric: x=f(t), y=g(t)
  const [parametricX, setParametricX] = useState('a * cos(t)');
  const [parametricY, setParametricY] = useState('a * sin(t)');
  const [parameterT, setParameterT] = useState('t');
  const [tRange, setTRange] = useState({ min: 0, max: 6.2832 }); // 0 to 2*PI

  // State for 2D Implicit: f(x,y)=k
  const [implicitEquation, setImplicitEquation] = useState('x^2 + y^2 = a^2');

  // State for 3D Explicit: z = f(x,y)
  const [function3D, setFunction3D] = useState<string>('a * sin(sqrt(x^2 + y^2))');
  
  // State for interactive parameters
  const [parameters, setParameters] = useState<PlotParameter[]>([
      { id: '1', name: 'a', value: 1, min: -5, max: 5, step: 0.1 }
  ]);

  // Handlers for 2D explicit functions list
  const addFunction = () => setFunctions([...functions, '']);
  const updateFunction = (index: number, value: string) => {
    const newFunctions = [...functions];
    newFunctions[index] = value;
    setFunctions(newFunctions);
  };
  const removeFunction = (index: number) => {
    const newFunctions = functions.filter((_, i) => i !== index);
    setFunctions(newFunctions);
  };
  
  // Handlers for parameters
  const addParameter = () => {
    setParameters(prev => {
        const existingNames = new Set(prev.map(p => p.name));
        let newName = 'a';
        let charCode = 'a'.charCodeAt(0);
        while (existingNames.has(newName)) {
            charCode++;
            newName = String.fromCharCode(charCode);
        }
        return [...prev, { id: Date.now().toString(), name: newName, value: 1, min: -5, max: 5, step: 0.1 }];
    });
  };
  
  const updateParameter = (id: string, field: keyof PlotParameter, value: string | number) => {
      setParameters(prev => prev.map(p => {
          if (p.id === id) {
              if (field === 'name') {
                  if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value as string) || value === '') {
                      return { ...p, [field]: value };
                  }
                  return p; // Invalid name
              }
              const numValue = typeof value === 'string' ? parseFloat(value) : value;
              return { ...p, [field]: isNaN(numValue) ? p[field] : numValue };
          }
          return p;
      }));
  };

  const removeParameter = (id: string) => {
      setParameters(prev => prev.filter(p => p.id !== id));
  };


  const plotGraph = () => {
    if (!plotRef.current) return;
    
    // Create scope from parameters for mathjs evaluation
    const parameterScope = parameters.reduce((scope, p) => {
        if (p.name.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
            scope[p.name] = p.value;
        }
        return scope;
    }, {} as { [key: string]: number });


    // Common layout settings
    const commonLayout = {
        xaxis: { title: 'x', gridcolor: '#475569', zerolinecolor: '#64748b' },
        yaxis: { title: 'y', gridcolor: '#475569', zerolinecolor: '#64748b' },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#cbd5e1' },
        legend: {
            bgcolor: 'rgba(30, 41, 59, 0.5)',
            bordercolor: '#475569',
        }
    };

    try {
        let traces: any[] = [];
        let layout: any = {};

        switch (plotType) {
            case '2d_explicit':
                traces = functions.map(funcStr => {
                    if (!funcStr.trim()) return null;
                    const node = math.parse(funcStr);
                    const code = node.compile();
                    const xValues: number[] = [];
                    const yValues: number[] = [];
                    const step = (range.xMax - range.xMin) / 400;

                    for (let x = range.xMin; x <= range.xMax; x += step) {
                        xValues.push(x);
                        yValues.push(code.evaluate({ x: x, ...parameterScope }));
                    }
                    
                    return { x: xValues, y: yValues, mode: 'lines', name: `y = ${funcStr}` };
                }).filter(trace => trace !== null);
                layout = { ...commonLayout, title: '2D Function Plot' };
                break;

            case '2d_parametric':
                const nodeX = math.parse(parametricX);
                const codeX = nodeX.compile();
                const nodeY = math.parse(parametricY);
                const codeY = nodeY.compile();

                const xParamValues: number[] = [];
                const yParamValues: number[] = [];
                const stepsParam = 400;
                const tStep = (tRange.max - tRange.min) / stepsParam;

                for (let i = 0; i <= stepsParam; i++) {
                    const t = tRange.min + i * tStep;
                    const scope = { [parameterT.trim() || 't']: t, ...parameterScope };
                    xParamValues.push(codeX.evaluate(scope));
                    yParamValues.push(codeY.evaluate(scope));
                }
                traces = [{ x: xParamValues, y: yParamValues, mode: 'lines', name: 'Parametric Plot' }];
                layout = { ...commonLayout, title: '2D Parametric Plot', yaxis: { ...commonLayout.yaxis, scaleanchor: 'x', scaleratio: 1 } };
                break;
            
            case '2d_implicit':
                let expression;
                const trimmedEquation = implicitEquation.trim();
                
                if (!trimmedEquation) {
                    Plotly.purge(plotRef.current);
                    return;
                }

                if (trimmedEquation.includes('=')) {
                    const parts = trimmedEquation.split('=');
                    if (parts.length < 2 || !parts[0].trim() || !parts[1].trim()) {
                        Plotly.purge(plotRef.current);
                        return;
                    }
                    expression = `(${parts[0].trim()}) - (${parts[1].trim()})`;
                } else {
                    expression = trimmedEquation;
                }
                const nodeImplicit = math.parse(expression);
                const codeImplicit = nodeImplicit.compile();

                const xGrid: number[] = [];
                const yGrid: number[] = [];
                const zGrid: number[][] = [];
                const stepsGrid = 100;

                const xStep = (range.xMax - range.xMin) / stepsGrid;
                for (let i = 0; i <= stepsGrid; i++) xGrid.push(range.xMin + i * xStep);

                const yStep = (range.yMax - range.yMin) / stepsGrid;
                for (let j = 0; j <= stepsGrid; j++) {
                    const y = range.yMin + j * yStep;
                    yGrid.push(y);
                    const zRow: number[] = [];
                    for (let i = 0; i <= stepsGrid; i++) {
                        const x = range.xMin + i * xStep;
                        try {
                            zRow.push(codeImplicit.evaluate({ x, y, ...parameterScope }));
                        } catch {
                            zRow.push(NaN);
                        }
                    }
                    zGrid.push(zRow);
                }
                
                traces = [{
                    x: xGrid,
                    y: yGrid,
                    z: zGrid,
                    type: 'contour',
                    contours: { coloring: 'lines', start: 0, end: 0 },
                    line: { width: 2, color: '#06b6d4' },
                    name: implicitEquation,
                    showscale: false,
                }];
                layout = { ...commonLayout, title: '2D Implicit Plot', yaxis: { ...commonLayout.yaxis, scaleanchor: 'x', scaleratio: 1 } };
                break;

            case '3d_explicit':
                if (!function3D.trim()) {
                    Plotly.purge(plotRef.current);
                    return;
                }
                const node3D = math.parse(function3D);
                const code3D = node3D.compile();

                const xValues3D = [];
                const yValues3D = [];
                const zValues3D: number[][] = [];
                const steps3D = 50;

                const xStep3D = (range.xMax - range.xMin) / steps3D;
                for (let i = 0; i <= steps3D; i++) xValues3D.push(range.xMin + i * xStep3D);

                const yStep3D = (range.yMax - range.yMin) / steps3D;
                for (let j = 0; j <= steps3D; j++) {
                    const y = range.yMin + j * yStep3D;
                    yValues3D.push(y);
                    const zRow: number[] = [];
                    for (let i = 0; i <= steps3D; i++) {
                        const x = range.xMin + i * xStep3D;
                        zRow.push(code3D.evaluate({ x, y, ...parameterScope }));
                    }
                    zValues3D.push(zRow);
                }
                
                traces = [{
                    x: xValues3D, y: yValues3D, z: zValues3D,
                    type: 'surface', colorscale: 'Viridis',
                    colorbar: { tickfont: { color: '#cbd5e1' }, titlefont: { color: '#cbd5e1' } }
                }];
                
                layout = {
                    title: `z = ${function3D}`,
                    scene: {
                        xaxis: { title: 'X', gridcolor: '#475569', zerolinecolor: '#64748b', tickfont: { color: '#94a3b8' }, titlefont: { color: '#cbd5e1'} },
                        yaxis: { title: 'Y', gridcolor: '#475569', zerolinecolor: '#64748b', tickfont: { color: '#94a3b8' }, titlefont: { color: '#cbd5e1'} },
                        zaxis: { title: 'Z', gridcolor: '#475569', zerolinecolor: '#64748b', tickfont: { color: '#94a3b8' }, titlefont: { color: '#cbd5e1'} },
                    },
                    autosize: true, paper_bgcolor: 'rgba(0,0,0,0)', font: { color: '#cbd5e1' },
                    margin: { l: 0, r: 0, b: 0, t: 40 }
                };
                break;
        }

        if(traces.length > 0 || plotType === '3d_explicit') {
            Plotly.newPlot(plotRef.current, traces, layout, {responsive: true});
        } else {
            Plotly.purge(plotRef.current);
        }

    } catch (error) {
      console.error("Plotting error:", error);
      Plotly.purge(plotRef.current);
    }
  };
  
  useEffect(() => {
    plotGraph();
    
    const resizeObserver = new ResizeObserver(() => {
        if(plotRef.current && plotRef.current.offsetParent) { // Check if visible
            Plotly.Plots.resize(plotRef.current);
        }
    });
    const currentPlotRef = plotRef.current;
    if(currentPlotRef) {
        resizeObserver.observe(currentPlotRef);
    }
    return () => {
        if(currentPlotRef) {
            resizeObserver.unobserve(currentPlotRef);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
      plotType, functions, function3D, range, 
      parametricX, parametricY, parameterT, tRange, 
      implicitEquation, parameters
  ]);

  const renderInputs = () => {
    switch(plotType) {
        case '2d_explicit':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Functions of x</label>
                        {functions.map((func, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <span className="text-cyan-400 font-mono">y =</span>
                                <Input type="text" value={func} onChange={(e) => updateFunction(index, e.target.value)} placeholder="e.g., a * x^2" />
                                <button onClick={() => removeFunction(index)} className="text-red-400 hover:text-red-300 text-xl font-bold">&times;</button>
                            </div>
                        ))}
                        <Button variant="secondary" onClick={addFunction} className="w-full text-xs py-1">+ Add Function</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="xmin" className="block text-sm font-medium text-slate-300 mb-1">X Min</label>
                          <Input id="xmin" type="number" value={range.xMin} onChange={(e) => setRange(r => ({ ...r, xMin: parseFloat(e.target.value) }))} />
                        </div>
                        <div>
                          <label htmlFor="xmax" className="block text-sm font-medium text-slate-300 mb-1">X Max</label>
                          <Input id="xmax" type="number" value={range.xMax} onChange={(e) => setRange(r => ({ ...r, xMax: parseFloat(e.target.value) }))} />
                        </div>
                    </div>
                </div>
            );
        case '2d_parametric':
             return (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">x({parameterT}) =</label>
                            <Input value={parametricX} onChange={(e) => setParametricX(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">y({parameterT}) =</label>
                            <Input value={parametricY} onChange={(e) => setParametricY(e.target.value)} />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Parameter</label>
                            <Input value={parameterT} onChange={(e) => setParameterT(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{parameterT} Min</label>
                            <Input type="number" value={tRange.min} onChange={(e) => setTRange(r => ({...r, min: parseFloat(e.target.value)}))} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">{parameterT} Max</label>
                            <Input type="number" value={tRange.max} onChange={(e) => setTRange(r => ({...r, max: parseFloat(e.target.value)}))} />
                        </div>
                    </div>
                </div>
             );
        case '2d_implicit':
             return (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                     <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Implicit Equation</label>
                         <Input
                            type="text"
                            value={implicitEquation}
                            onChange={(e) => setImplicitEquation(e.target.value)}
                            placeholder="e.g., x^2 + y^2 = a^2"
                         />
                     </div>
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">X Min</label>
                          <Input type="number" value={range.xMin} onChange={(e) => setRange(r => ({ ...r, xMin: parseFloat(e.target.value) }))} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">X Max</label>
                          <Input type="number" value={range.xMax} onChange={(e) => setRange(r => ({ ...r, xMax: parseFloat(e.target.value) }))} />
                        </div>
                         <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">Y Min</label>
                          <Input type="number" value={range.yMin} onChange={(e) => setRange(r => ({ ...r, yMin: parseFloat(e.target.value) }))} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">Y Max</label>
                          <Input type="number" value={range.yMax} onChange={(e) => setRange(r => ({ ...r, yMax: parseFloat(e.target.value) }))} />
                        </div>
                    </div>
                 </div>
             );
        case '3d_explicit':
            return (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Function of x and y</label>
                         <div className="flex items-center space-x-2">
                            <span className="text-cyan-400 font-mono">z =</span>
                            <Input
                                type="text"
                                value={function3D}
                                onChange={(e) => setFunction3D(e.target.value)}
                                placeholder="e.g., a * sin(x) * cos(y)"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">X Min</label>
                          <Input type="number" value={range.xMin} onChange={(e) => setRange(r => ({ ...r, xMin: parseFloat(e.target.value) }))} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">X Max</label>
                          <Input type="number" value={range.xMax} onChange={(e) => setRange(r => ({ ...r, xMax: parseFloat(e.target.value) }))} />
                        </div>
                         <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">Y Min</label>
                          <Input type="number" value={range.yMin} onChange={(e) => setRange(r => ({ ...r, yMin: parseFloat(e.target.value) }))} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">Y Max</label>
                          <Input type="number" value={range.yMax} onChange={(e) => setRange(r => ({ ...r, yMax: parseFloat(e.target.value) }))} />
                        </div>
                    </div>
                </div>
            );
    }
  }

  return (
    <div className="space-y-4">
        <div className="flex flex-wrap justify-center p-1 bg-slate-700 rounded-md">
            <Button variant={plotType === '2d_explicit' ? 'primary' : 'secondary'} onClick={() => setPlotType('2d_explicit')} className="flex-1 m-1 text-xs sm:text-sm">y = f(x)</Button>
            <Button variant={plotType === '2d_parametric' ? 'primary' : 'secondary'} onClick={() => setPlotType('2d_parametric')} className="flex-1 m-1 text-xs sm:text-sm">Parametric</Button>
            <Button variant={plotType === '2d_implicit' ? 'primary' : 'secondary'} onClick={() => setPlotType('2d_implicit')} className="flex-1 m-1 text-xs sm:text-sm">Implicit</Button>
            <Button variant={plotType === '3d_explicit' ? 'primary' : 'secondary'} onClick={() => setPlotType('3d_explicit')} className="flex-1 m-1 text-xs sm:text-sm">z = f(x,y)</Button>
        </div>

        <div className="mt-4">
            {renderInputs()}
        </div>
        
        <Card title="Interactive Parameters">
            <div className="space-y-4">
                {parameters.map(p => (
                    <div key={p.id} className="grid grid-cols-1 sm:grid-cols-6 gap-2 items-center">
                        <Input value={p.name} onChange={e => updateParameter(p.id, 'name', e.target.value)} placeholder="name" className="sm:col-span-1" />
                        <div className="sm:col-span-3 flex items-center space-x-2">
                           <Input type="number" value={p.min} onChange={e => updateParameter(p.id, 'min', e.target.value)} className="w-1/3" />
                           <input 
                                type="range" 
                                min={p.min} 
                                max={p.max} 
                                value={p.value} 
                                step={p.step}
                                onChange={e => updateParameter(p.id, 'value', e.target.value)}
                                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                           />
                           <Input type="number" value={p.max} onChange={e => updateParameter(p.id, 'max', e.target.value)} className="w-1/3" />
                        </div>
                        <div className="sm:col-span-1 flex items-center space-x-1">
                             <Input type="number" value={p.value} onChange={e => updateParameter(p.id, 'value', e.target.value)} />
                        </div>
                        <Button variant="secondary" onClick={() => removeParameter(p.id)} className="text-red-400 hover:text-red-300">
                            &times;
                        </Button>
                    </div>
                ))}
                 <Button variant="secondary" onClick={addParameter} className="w-full text-xs py-1">+ Add Parameter</Button>
            </div>
        </Card>

        <div ref={plotRef} style={{ width: '100%', minHeight: '400px' }}></div>
    </div>
  );
};

export default GraphPlotter;