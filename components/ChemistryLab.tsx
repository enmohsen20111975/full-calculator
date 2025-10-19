import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ChemicalReaction } from '../types';
import { ReactionCategoryData } from '../data/chemistry/reactions';
import Card from './ui/Card';

// --- Helper Component for Displaying Reaction Details ---
const ReactionDisplay: React.FC<{ reaction: ChemicalReaction }> = ({ reaction }) => (
    <motion.div 
        className="bg-slate-900/50 border border-cyan-700 p-4 rounded-lg space-y-3 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <h4 className="font-semibold text-white text-lg">Reaction Details:</h4>
        <div className="bg-slate-800/70 p-4 rounded-md text-center">
            <p className="font-mono text-xl sm:text-2xl text-cyan-300">{reaction.balanced_equation}</p>
        </div>
        <div>
            <strong className="text-slate-300">Reaction Type:</strong>
            <span className="ml-2 text-green-400 bg-green-900/50 px-2 py-1 rounded-full text-xs font-semibold">{reaction.category}</span>
        </div>
        {reaction.enthalpy_change && (
             <div>
                <strong className="text-slate-300">Enthalpy Change (ΔH):</strong>
                <span className={`ml-2 font-mono ${reaction.enthalpy_change < 0 ? 'text-red-400' : 'text-blue-400'}`}>{reaction.enthalpy_change} kJ/mol</span>
            </div>
        )}
        <div>
            <strong className="text-slate-300">Description:</strong>
            <p className="text-slate-400 mt-1">{reaction.description}</p>
        </div>
    </motion.div>
);

// --- Main Chemistry Lab Component ---
interface ChemistryLabProps {
    reactionsData: ReactionCategoryData;
}

const ChemistryLab: React.FC<ChemistryLabProps> = ({ reactionsData }) => {
    const subCategories = Object.keys(reactionsData);
    const [activeSubCategory, setActiveSubCategory] = useState(subCategories[0]);
    const [selectedReaction, setSelectedReaction] = useState<ChemicalReaction | null>(reactionsData[activeSubCategory]?.[0] || null);

    const handleSubCategoryChange = (subCategory: string) => {
        setActiveSubCategory(subCategory);
        setSelectedReaction(reactionsData[subCategory][0] || null);
    };

    return (
        <Card title="Chemical Reactions Library">
             <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <aside className="md:w-1/4 lg:w-1/5">
                    <h4 className="font-semibold mb-3 text-white">Categories</h4>
                    <ul className="space-y-2">
                        {subCategories.map(sc => (
                            <li key={sc}>
                                <button 
                                    onClick={() => handleSubCategoryChange(sc)}
                                    className={`w-full text-left p-2 rounded-md transition-colors text-sm ${activeSubCategory === sc ? 'bg-cyan-800 text-white font-semibold' : 'hover:bg-slate-700/50'}`}
                                >
                                    {sc}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>
                <div className="flex-1">
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-white">Select Reaction from "{activeSubCategory}"</h4>
                      <div className="flex flex-wrap gap-2">
                          {reactionsData[activeSubCategory].map(reaction => (
                              <button 
                                  key={reaction.reaction_name}
                                  onClick={() => setSelectedReaction(reaction)}
                                  className={`p-2 text-xs rounded-md transition-colors ${selectedReaction?.reaction_name === reaction.reaction_name ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-700 hover:bg-slate-600'}`}
                              >
                                  {reaction.reaction_name}
                              </button>
                          ))}
                      </div>
                    </div>
                    
                    {selectedReaction ? (
                        <ReactionDisplay reaction={selectedReaction} />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-slate-700/30 rounded-lg min-h-[200px]">
                            <p className="text-slate-400">Select a reaction to view its details.</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ChemistryLab;