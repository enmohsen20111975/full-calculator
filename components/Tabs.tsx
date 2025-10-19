import React from 'react';
import { motion } from 'framer-motion';
import type { MainCategory } from '../types';

interface TabsProps {
  mainCategories: MainCategory[];
  activeMainTab: string;
  setActiveMainTab: (id: string) => void;
  activeSubTab: string;
  setActiveSubTab: (id: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ mainCategories, activeMainTab, setActiveMainTab, activeSubTab, setActiveSubTab }) => {
  const activeMainCategory = mainCategories.find(cat => cat.id === activeMainTab);

  return (
    <div className="flex flex-col items-center">
      {/* Main Categories */}
      <div className="w-full flex justify-center border-b border-slate-700">
        <nav className="flex flex-wrap -mb-px space-x-6" aria-label="Main Categories">
          {mainCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveMainTab(cat.id)}
              className={`${
                activeMainTab === cat.id
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-white hover:border-slate-500'
              } relative whitespace-nowrap py-4 px-2 border-b-2 font-medium text-base border-transparent focus:outline-none transition-colors duration-200`}
            >
              {cat.name}
              {activeMainTab === cat.id && (
                <motion.div
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-cyan-400"
                  layoutId="main-underline"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Sub Categories */}
      {activeMainCategory && activeMainCategory.subCategories.length > 0 && (
        <div className="w-full flex justify-center mt-2">
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2" aria-label="Sub Categories">
                {activeMainCategory.subCategories.map((subCat) => (
                    <button
                        key={subCat.id}
                        onClick={() => setActiveSubTab(subCat.id)}
                        className={`${
                            activeSubTab === subCat.id
                                ? 'bg-cyan-700 text-white'
                                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600'
                        } relative whitespace-nowrap py-2 px-4 rounded-md font-medium text-sm focus:outline-none transition-colors duration-200`}
                    >
                         {subCat.name}
                         {activeSubTab === subCat.id && (
                            <motion.div
                                className="absolute inset-0 bg-white/5 rounded-md"
                                layoutId="subcat-highlight"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                         )}
                    </button>
                ))}
            </nav>
        </div>
      )}
    </div>
  );
};

export default Tabs;