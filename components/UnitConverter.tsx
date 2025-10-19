import React, { useState, useEffect, useMemo } from 'react';
import * as math from 'mathjs';
import { unitData } from '../data/units';
import Input from './ui/Input';
import Select from './ui/Select';
import Card from './ui/Card';

const UnitConverter: React.FC = () => {
  const categoryKeys = Object.keys(unitData);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>(categoryKeys[0]);
  const [inputValue, setInputValue] = useState<string>('1');
  
  const selectedCategoryData = unitData[selectedCategoryKey];

  const availableUnits = useMemo(() => {
    return selectedCategoryData.units;
  }, [selectedCategoryData]);

  const [fromUnit, setFromUnit] = useState<string>(availableUnits[0].symbol);
  const [toUnit, setToUnit] = useState<string>(availableUnits[1]?.symbol || availableUnits[0].symbol);
  const [outputValue, setOutputValue] = useState<string>('');

  useEffect(() => {
    // Reset units when category changes to avoid invalid states
    const newUnits = unitData[selectedCategoryKey].units;
    setFromUnit(newUnits[0].symbol);
    setToUnit(newUnits[1]?.symbol || newUnits[0].symbol);
  }, [selectedCategoryKey]);

  useEffect(() => {
    const convert = () => {
      const value = parseFloat(inputValue);
      if (isNaN(value) || !fromUnit || !toUnit) {
        setOutputValue('');
        return;
      }
      
      if(fromUnit === toUnit) {
          setOutputValue(inputValue);
          return;
      }

      const fromUnitDef = selectedCategoryData.units.find(u => u.symbol === fromUnit);
      const toUnitDef = selectedCategoryData.units.find(u => u.symbol === toUnit);

      if (fromUnitDef && toUnitDef) {
          try {
            const valueInBase = fromUnitDef.toBase(value);
            const finalValue = toUnitDef.fromBase(valueInBase);
            setOutputValue(math.format(finalValue, { notation: 'auto', precision: 8 }));
          } catch (e) {
            console.error("Conversion error:", e);
            setOutputValue('Error');
          }
      } else {
          setOutputValue('N/A');
      }
    };
    convert();
  }, [inputValue, fromUnit, toUnit, selectedCategoryData]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(outputValue);
    setOutputValue(inputValue);
  };

  return (
    <Card title="Unit Converter">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Quantity</label>
          <Select value={selectedCategoryKey} onChange={(e) => setSelectedCategoryKey(e.target.value)}>
            {categoryKeys.map(key => (
              <option key={key} value={key}>{unitData[key].name}</option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-slate-300">From</label>
            <Input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <Select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {availableUnits.map(unit => (
                <option key={unit.symbol} value={unit.symbol}>{unit.name} ({unit.symbol})</option>
              ))}
            </Select>
          </div>
          
          <div className="flex items-center justify-center">
            <button onClick={handleSwap} className="p-2 mt-6 rounded-full bg-slate-600 hover:bg-cyan-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-slate-300">To</label>
            <Input type="text" value={outputValue} readOnly className="bg-slate-800 cursor-not-allowed" />
            <Select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {availableUnits.map(unit => (
                <option key={unit.symbol} value={unit.symbol}>{unit.name} ({unit.symbol})</option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UnitConverter;
