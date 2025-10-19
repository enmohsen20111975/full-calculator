
import React from 'react';
import { motion } from 'framer-motion';
import type { Category } from '../types';

interface TabsProps {
  categories: Category[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ categories, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center border-b border-slate-700">
      <nav className="flex flex-wrap -mb-px space-x-6" aria-label="Tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`${
              activeTab === cat.id
                ? 'text-cyan-400'
                : 'text-slate-400 hover:text-white hover:border-slate-500'
            } relative whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent focus:outline-none transition-colors duration-200`}
          >
            {cat.name}
            {activeTab === cat.id && (
              <motion.div
                className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-cyan-400"
                layoutId="underline"
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
