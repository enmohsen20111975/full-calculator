import React from 'react';
import type { Constant } from '../types';
import Button from './ui/Button';

interface ConstantsTableProps {
  constants: Constant[];
  onConstantClick: (symbol: string) => void;
}

const ConstantsTable: React.FC<ConstantsTableProps> = ({ constants, onConstantClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-400">
        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Symbol</th>
            <th scope="col" className="px-6 py-3">Value</th>
            <th scope="col" className="px-6 py-3">Unit</th>
            <th scope="col" className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {constants.map((constant) => (
            <tr key={constant.symbol} className="bg-slate-800/50 border-b border-slate-700 hover:bg-slate-700/50">
              <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                {constant.name}
              </th>
              <td className="px-6 py-4 font-mono">{constant.symbol}</td>
              <td className="px-6 py-4 font-mono">{constant.value.toExponential(4)}</td>
              <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: constant.unit.replace(/\^2/g, '²').replace(/\^3/g, '³').replace(/\^-1/g, '⁻¹') }}></td>
              <td className="px-6 py-4 text-center">
                <Button 
                    variant="secondary" 
                    className="py-1 px-3 text-xs" 
                    onClick={() => onConstantClick(constant.symbol)}
                    aria-label={`Add constant ${constant.name} to calculator`}
                >
                    Add to Calc
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConstantsTable;