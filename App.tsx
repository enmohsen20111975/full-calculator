import React, { useState } from 'react';
import type { Category } from './types';
import { constants } from './data/constants';
// Fix: Use the new modular equation structure.
import * as allEquations from './data/equations/index';
import { geometryData } from './data/geometry';
import Tabs from './components/Tabs';
import CategoryView from './components/CategoryView';

const { 
  mathEquations, 
  physicsEquations, 
  chemistryEquations, 
  electricalEquations, 
  mechanicalEquations, 
  civilEquations, 
  statsEquations 
} = allEquations;

const categories: Category[] = [
  { id: 'calculator', name: 'Calculator', constants: constants.Math, equations: {} },
  { id: 'math', name: 'Mathematics', constants: [], equations: mathEquations },
  { id: 'geometry', name: 'Geometry', constants: [], equations: {}, geometry: geometryData },
  { id: 'vector', name: 'Vector Math', constants: [], equations: {} },
  { id: 'physics', name: 'Physics', constants: constants.Universal, equations: physicsEquations },
  { id: 'chemistry', name: 'Chemistry', constants: constants.Chemistry, equations: chemistryEquations },
  { id: 'electrical', name: 'Electrical Eng.', constants: constants.Electromagnetism, equations: electricalEquations },
  { id: 'mechanical', name: 'Mechanical Eng.', constants: constants.Mechanical, equations: mechanicalEquations },
  { id: 'civil', name: 'Civil Eng.', constants: [], equations: civilEquations },
  { id: 'stats', name: 'Statistics', constants: [], equations: statsEquations },
  { id: 'converter', name: 'Unit Converter', constants: [], equations: {} },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(categories[0].id);
  const [calcExpression, setCalcExpression] = useState('');

  const activeCategory = categories.find(cat => cat.id === activeTab) || categories[0];

  const handleAppendToExpression = (text: string) => {
    setCalcExpression(prev => prev + text);
    if (activeTab !== 'calculator') {
      setActiveTab('calculator');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400">
          Engineering & Science Calculator
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Your universal tool for calculations, equations, and graphs.
        </p>
      </header>

      <main>
        <Tabs
          categories={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="mt-6">
          <CategoryView 
            key={activeCategory.id} 
            category={activeCategory}
            calcExpression={calcExpression}
            setCalcExpression={setCalcExpression}
            onConstantClick={handleAppendToExpression}
          />
        </div>
      </main>

      <footer className="text-center mt-12 text-slate-500 text-sm">
        <p>Built with React, Tailwind CSS, Math.js, and Plotly.js</p>
      </footer>
    </div>
  );
};

export default App;