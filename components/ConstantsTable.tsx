
import React from 'react';
import type { Constant } from '../types';

interface ConstantsTableProps {
  constants: Constant[];
}

const ConstantsTable: React.FC<ConstantsTableProps> = ({ constants }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-400">
        <thead className="text-xs text-slate-300 uppercase bg-slate-700/50">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Symbol</th>
            <th scope="col" className="px-6 py-3">Value</th>
            <th scope="col" className="px-6 py-3">Unit</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConstantsTable;
