import React from 'react';
import { motion } from 'framer-motion';
import type { Category } from '../types';
import Calculator from './Calculator';
import EquationSolver from './EquationSolver';
import GraphPlotter from './GraphPlotter';
import ConstantsTable from './ConstantsTable';
import EquationsList from './EquationsList';
import UnitConverter from './UnitConverter';
import Card from './ui/Card';
import DifferentiationSolver from './DifferentiationSolver';
import IntegrationSolver from './IntegrationSolver';
import GeometrySolver from './GeometrySolver';
import VectorSolver from './VectorSolver';
import ChemistryLab from './ChemistryLab';
import { ReactionCategoryData } from '../data/chemistry/reactions';

interface CategoryViewProps {
  category: Category;
  calcExpression: string;
  setCalcExpression: (value: string | ((prev: string) => string)) => void;
  onConstantClick: (symbol: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Component for Calculator tab
const CalculatorView: React.FC<{
  category: Category;
  expression: string;
  setExpression: (value: string | ((prev: string) => string)) => void;
  onConstantClick: (symbol: string) => void;
}> = ({ category, expression, setExpression, onConstantClick }) => {
  return (
     <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      <motion.div variants={itemVariants} className="lg:col-span-2">
        <Card title="Full Function Scientific Calculator">
          <Calculator expression={expression} setExpression={setExpression} />
        </Card>
      </motion.div>
      <motion.div variants={itemVariants}>
        {category.constants.length > 0 && (
          <Card title="Mathematical Constants">
            <ConstantsTable constants={category.constants} onConstantClick={onConstantClick} />
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};


// Component for Equation Solver tab
const MathView: React.FC<{ category: Category }> = ({ category }) => {
  return (
    <div className="space-y-6">
      <motion.div variants={itemVariants}>
        <Card title="Equation & System Solver">
          <EquationSolver />
        </Card>
      </motion.div>
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Derivative Calculator">
          <DifferentiationSolver />
        </Card>
        <Card title="Numerical Integration (Definite)">
          <IntegrationSolver />
        </Card>
      </motion.div>
      {Object.keys(category.equations).length > 0 && (
        <motion.div variants={itemVariants}>
          <Card title={`${category.name} Equations`}>
            <EquationsList equationsData={category.equations as any} />
          </Card>
        </motion.div>
      )}
    </div>
  );
};

// Component for Graph Plotter tab
const GraphPlotterView: React.FC = () => (
    <motion.div variants={itemVariants}>
        <Card title="Graph Plotter">
            <GraphPlotter />
        </Card>
    </motion.div>
);


// Generic component for science and engineering tabs
const ScienceView: React.FC<{ category: Category, onConstantClick: (symbol: string) => void }> = ({ category, onConstantClick }) => {
  return (
    <div className="space-y-6">
      {category.constants.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card title={`${category.name} Constants`}>
            <ConstantsTable constants={category.constants} onConstantClick={onConstantClick} />
          </Card>
        </motion.div>
      )}
      {Object.keys(category.equations).length > 0 && (
        <motion.div variants={itemVariants}>
          <Card title={`${category.name} Equations`}>
            <EquationsList equationsData={category.equations as any} />
          </Card>
        </motion.div>
      )}
    </div>
  );
};

// Component for Unit Converter tab
const UnitConverterView: React.FC = () => (
    <motion.div variants={itemVariants}>
        <UnitConverter />
    </motion.div>
);

// Component for Geometry tab
const GeometryView: React.FC<{ category: Category }> = ({ category }) => (
    <motion.div variants={itemVariants}>
        <GeometrySolver shapes={category.geometry || []} />
    </motion.div>
);

// Component for Vector Math tab
const VectorView: React.FC<{ category: Category }> = ({ category }) => (
  <div className="space-y-6">
    <motion.div variants={itemVariants}>
      <Card title="3D Vector Operations & Visualization">
        <VectorSolver />
      </Card>
    </motion.div>
    {Object.keys(category.equations).length > 0 && (
      <motion.div variants={itemVariants}>
        <Card title={`${category.name} Equations`}>
          <EquationsList equationsData={category.equations as any} />
        </Card>
      </motion.div>
    )}
  </div>
);

// New component for Chemistry tab
const ChemistryView: React.FC<{ category: Category, onConstantClick: (symbol: string) => void }> = ({ category, onConstantClick }) => {
  return (
    <div className="space-y-6">
      {category.constants.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card title={`${category.name} Constants`}>
            <ConstantsTable constants={category.constants} onConstantClick={onConstantClick} />
          </Card>
        </motion.div>
      )}
      {Object.keys(category.equations).length > 0 && (
        <motion.div variants={itemVariants}>
          <Card title={`${category.name} Equations`}>
            <EquationsList equationsData={category.equations as any} />
          </Card>
        </motion.div>
      )}
      {category.reactions && (
        <motion.div variants={itemVariants}>
            <ChemistryLab reactionsData={category.reactions} />
        </motion.div>
      )}
    </div>
  );
};


const CategoryView: React.FC<CategoryViewProps> = ({ category, calcExpression, setCalcExpression, onConstantClick }) => {
    const renderContent = () => {
    switch (category.id) {
      case 'calculator':
        return <CalculatorView category={category} expression={calcExpression} setExpression={setCalcExpression} onConstantClick={onConstantClick} />;
      case 'equation-solver':
        return <MathView category={category} />;
      case 'graph-plotter':
        return <GraphPlotterView />;
      case 'geometry':
        return <GeometryView category={category} />;
      case 'vector':
        return <VectorView category={category} />;
      case 'unit-converter':
        return <UnitConverterView />;
      case 'chemistry':
        return <ChemistryView category={category} onConstantClick={onConstantClick} />;
      case 'physics':
      case 'electrical':
      case 'mechanical':
      case 'civil':
      case 'stats':
        return <ScienceView category={category} onConstantClick={onConstantClick} />;
      default:
        return <p>Select a category</p>;
    }
  };
  
  return (
    <motion.div
      key={category.id}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        {renderContent()}
    </motion.div>
  );
};

export default CategoryView;