import React, { useState } from 'react';
import type { MainCategory, Category } from './types';
import { constants } from './data/constants';
// Fix: Use the new modular equation structure.
import * as allEquations from './data/equations/index';
import { geometryData } from './data/geometry';
import { chemistryReactions } from './data/chemistry/reactions';
import Tabs from './components/Tabs';
import CategoryView from './components/CategoryView';

const { 
  mathEquations, 
  physicsEquations, 
  chemistryEquations,
  electricalEquations, 
  mechanicalEquations, 
  civilEquations, 
  statsEquations,
  vectorEquations,
} = allEquations;

const mainCategories: MainCategory[] = [
  {
    id: 'tools',
    name: 'Core Tools',
    subCategories: [
      { id: 'calculator', name: 'Calculator', constants: constants.Math, equations: {} },
      { id: 'graph-plotter', name: 'Graph Plotter', constants: [], equations: {} },
      { id: 'unit-converter', name: 'Unit Converter', constants: [], equations: {} },
    ]
  },
  {
    id: 'math',
    name: 'Mathematics',
    subCategories: [
      { id: 'equation-solver', name: 'Equation Solver', constants: [], equations: mathEquations },
      { id: 'geometry', name: 'Geometry', constants: [], equations: {}, geometry: geometryData },
      { id: 'vector', name: 'Vector Math', constants: [], equations: vectorEquations },
      { id: 'stats', name: 'Statistics', constants: [], equations: statsEquations },
    ]
  },
  {
    id: 'sciences',
    name: 'Sciences',
    subCategories: [
      { id: 'physics', name: 'Physics', constants: constants.Universal, equations: physicsEquations },
      { 
        id: 'chemistry', 
        name: 'Chemistry', 
        constants: constants.Chemistry, 
        equations: chemistryEquations,
        reactions: chemistryReactions,
      },
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering',
    subCategories: [
      { id: 'electrical', name: 'Electrical', constants: constants.Electromagnetism, equations: electricalEquations },
      { id: 'mechanical', name: 'Mechanical', constants: constants.Mechanical, equations: mechanicalEquations },
      { id: 'civil', name: 'Civil', constants: [], equations: civilEquations },
    ]
  }
];


const App: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<string>(mainCategories[0].id);
  const [activeSubTab, setActiveSubTab] = useState<string>(mainCategories[0].subCategories[0].id);
  const [calcExpression, setCalcExpression] = useState('');
  
  const activeMainCategory = mainCategories.find(cat => cat.id === activeMainTab) || mainCategories[0];
  const activeSubCategory = activeMainCategory.subCategories.find(sub => sub.id === activeSubTab) || activeMainCategory.subCategories[0];

  const handleAppendToExpression = (text: string) => {
    setCalcExpression(prev => prev + text);
    if (activeMainTab !== 'tools' || activeSubTab !== 'calculator') {
      setActiveMainTab('tools');
      setActiveSubTab('calculator');
    }
  };
  
  const handleSetMainTab = (id: string) => {
    const newMainCat = mainCategories.find(c => c.id === id);
    if (newMainCat) {
      setActiveMainTab(id);
      // Automatically select the first sub-category of the new main category
      if (newMainCat.subCategories.length > 0) {
        setActiveSubTab(newMainCat.subCategories[0].id);
      }
    }
  }

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
          mainCategories={mainCategories}
          activeMainTab={activeMainTab}
          setActiveMainTab={handleSetMainTab}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
        />
        <div className="mt-6">
          <CategoryView 
            key={activeSubCategory.id} 
            category={activeSubCategory}
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