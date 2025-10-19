import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as math from 'mathjs';
import type { Shape } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import InteractiveShape from './ui/InteractiveShape';

interface GeometrySolverProps {
  shapes: Shape[];
}

type Dimension = '2D' | '3D';

const GeometrySolver: React.FC<GeometrySolverProps> = ({ shapes }) => {
  const [activeDimension, setActiveDimension] = useState<Dimension>('2D');

  const filteredShapes = useMemo(() => {
    return shapes.filter(s => s.dimension === activeDimension);
  }, [shapes, activeDimension]);

  const [selectedShape, setSelectedShape] = useState<Shape | null>(filteredShapes[0] || null);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<{ [key: string]: string } | null>(null);
  const [error, setError] = useState<string>('');
  
  // State for 3D interaction
  const [rotation, setRotation] = useState({ x: -20, y: -30 });
  const [translation, setTranslation] = useState({ x: 0, y: 0 });
  const dragState = useRef({
    isDragging: false,
    button: 0, // 0 for left, 2 for right
    lastX: 0,
    lastY: 0,
  });

  // Reset view when shape or dimension changes
  useEffect(() => {
    setRotation({ x: -20, y: -30 });
    setTranslation({ x: 0, y: 0 });
  }, [selectedShape, activeDimension]);


  const handleDimensionChange = (dim: Dimension) => {
    setActiveDimension(dim);
    const newShapes = shapes.filter(s => s.dimension === dim);
    setSelectedShape(newShapes[0] || null);
    setInputValues({});
    setResults(null);
    setError('');
  };

  const handleShapeSelect = (shape: Shape) => {
    setSelectedShape(shape);
    setInputValues({});
    setResults(null);
    setError('');
  };

  const handleInputChange = (variable: string, value: string) => {
    setInputValues(prev => ({ ...prev, [variable]: value }));
    setResults(null);
  };

  const calculate = () => {
    if (!selectedShape) return;
    setError('');

    try {
      const scope: { [key:string]: number } = {};
      let allInputsValid = true;

      for (const variable in selectedShape.variables) {
        const value = parseFloat(inputValues[variable]);
        if (isNaN(value)) {
          allInputsValid = false;
          break;
        }
        scope[variable] = value;
      }
      
      if (!allInputsValid) {
        setError('Please enter valid numbers for all dimensions.');
        return;
      }

      const calculatedResults: { [key: string]: string } = {};
      for (const formulaName in selectedShape.formulas) {
        const formula = selectedShape.formulas[formulaName];
        const resultValue = math.evaluate(formula, scope);
        calculatedResults[formulaName] = math.format(resultValue, { notation: 'auto', precision: 6 });
      }
      setResults(calculatedResults);
    } catch (e) {
      setError('Error in calculation. Please check your inputs.');
      console.error(e);
    }
  };

  const currentVariables = useMemo(() => {
      return selectedShape ? Object.entries(selectedShape.variables) : [];
  }, [selectedShape]);

  // --- 3D Interaction Handlers ---
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragState.current = {
      isDragging: true,
      button: e.button,
      lastX: e.clientX,
      lastY: e.clientY,
    };
    document.body.style.userSelect = 'none';
    e.currentTarget.style.cursor = 'grabbing';
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return;

    const dx = e.clientX - dragState.current.lastX;
    const dy = e.clientY - dragState.current.lastY;

    if (dragState.current.button === 0) { // Left-click rotates
      setRotation(prev => ({
        x: prev.x - dy * 0.5,
        y: prev.y + dx * 0.5,
      }));
    } else if (dragState.current.button === 2) { // Right-click pans
      setTranslation(prev => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));
    }

    dragState.current.lastX = e.clientX;
    dragState.current.lastY = e.clientY;
  }, []);

  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    dragState.current.isDragging = false;
    document.body.style.userSelect = '';
    if ('currentTarget' in e) {
      e.currentTarget.style.cursor = 'grab';
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    dragState.current = {
      isDragging: true,
      button: 0, // Single touch rotates
      lastX: touch.clientX,
      lastY: touch.clientY,
    };
    document.body.style.userSelect = 'none';
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragState.current.lastX;
    const dy = touch.clientY - dragState.current.lastY;
    setRotation(prev => ({
      x: prev.x - dy * 0.5,
      y: prev.y + dx * 0.5,
    }));
    dragState.current.lastX = touch.clientX;
    dragState.current.lastY = touch.clientY;
  }, []);

  const resetView = () => {
    setRotation({ x: -20, y: -30 });
    setTranslation({ x: 0, y: 0 });
  };
  
  const is3D = activeDimension === '3D';

  return (
    <div className="space-y-6">
      <Card title="Select Shape Type">
        <div className="flex justify-center p-1 bg-slate-700 rounded-md">
            <Button variant={activeDimension === '2D' ? 'primary' : 'secondary'} onClick={() => handleDimensionChange('2D')} className="flex-1 m-1">2D Shapes</Button>
            <Button variant={activeDimension === '3D' ? 'primary' : 'secondary'} onClick={() => handleDimensionChange('3D')} className="flex-1 m-1">3D Shapes</Button>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {filteredShapes.map(shape => (
            <button
              key={shape.name}
              onClick={() => handleShapeSelect(shape)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${selectedShape?.name === shape.name ? 'bg-cyan-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              {shape.name}
            </button>
          ))}
        </div>
      </Card>

      {selectedShape && (
        <Card title={`${selectedShape.name} Calculator`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center items-center p-4 bg-slate-900/50 rounded-lg min-h-[300px] aspect-square">
                <div
                    className="w-full h-full touch-none"
                    style={is3D ? { perspective: '1000px', cursor: 'grab' } : {}}
                    onMouseDown={is3D ? handleMouseDown : undefined}
                    onMouseMove={is3D ? handleMouseMove : undefined}
                    onMouseUp={is3D ? handleMouseUp : undefined}
                    onMouseLeave={is3D ? (e) => dragState.current.isDragging && handleMouseUp(e) : undefined}
                    onContextMenu={is3D ? (e) => e.preventDefault() : undefined}
                    onTouchStart={is3D ? handleTouchStart : undefined}
                    onTouchMove={is3D ? handleTouchMove : undefined}
                    onTouchEnd={is3D ? handleMouseUp : undefined}
                >
                    <motion.div
                        className="w-full h-full"
                        style={is3D ? { transformStyle: 'preserve-3d' } : {}}
                        initial={false}
                        animate={{
                            transform: is3D
                                ? `translateX(${translation.x}px) translateY(${translation.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                                : `translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg)`,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <InteractiveShape shape={selectedShape} values={inputValues} />
                    </motion.div>
                </div>
                {is3D && (
                    <div className="text-center mt-4">
                        <Button variant="secondary" onClick={resetView} className="py-1 px-3 text-xs">Reset View</Button>
                        <p className="text-xs text-slate-500 mt-2 px-2">
                            Left-click/drag to rotate. Right-click/drag to pan.
                        </p>
                    </div>
                )}
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-white">Dimensions</h4>
              {currentVariables.map(([key, name]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-300 mb-1">{name}</label>
                  <Input
                    type="number"
                    value={inputValues[key] || ''}
                    onChange={e => handleInputChange(key, e.target.value)}
                    placeholder={`Enter ${name.toLowerCase()}`}
                  />
                </div>
              ))}
              <Button onClick={calculate} className="w-full">Calculate</Button>
            </div>
          </div>
          {error && (
             <div className="mt-4 bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md text-center">
                <p>{error}</p>
            </div>
          )}
          {results && (
            <div className="mt-6">
              <h4 className="font-semibold text-lg text-white mb-3">Results</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-lg">
                {Object.entries(results).map(([name, value]) => (
                  <div key={name} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-md">
                    <span className="text-slate-300">{name}:</span>
                    <span className="font-mono text-cyan-400 text-lg">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default GeometrySolver;