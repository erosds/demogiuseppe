// src/components/workflow/GapAnalysisStep.jsx
import React, { lazy, Suspense } from 'react';

const MemoizedMolecule3DViewer = lazy(() => import('../molecule-viewer/Molecule3DViewer'));

const Molecule3DLoader = ({ size = 90 }) => (
  <div
    style={{ width: size, height: size }}
    className="flex items-center justify-center bg-gray-800/30 rounded-lg"
  >
    <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const GapAnalysisStep = ({ sortedMoleculesForGap, selectedTopK }) => {
  return (
    <div className="flex-1 flex flex-col p-3 animate-fadeIn">
      <div className="flex justify-center items-center mb-2 relative">
        <h3 className="text-3xl font-bold text-left text-white mb-2">
          GAP Analysis and Filtering
        </h3>
      </div>
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-3 border border-green-500/30 shadow-lg mb-3 mx-auto max-w-5xl">
        <p className="text-gray-200 text-center text-base leading-relaxed">
          Here we use the <span className="text-green-400 font-semibold">LUMO</span> value of the catalyst predicted by the <span className="text-purple-400 font-semibold">Unimol model</span> and the <span className="text-green-400 font-semibold">HOMO</span> value of reference epoxides (Styrene Oxide, Propylene Oxide, Epichlorohydrin) to calculate the <span className="text-green-400 font-semibold">HOMO-LUMO gap</span>. Candidates with the smallest gap are the most promising. In this case, the top 5 candidates are selected. Note that at this stage, no chemical bonding between catalyst and epoxide occurs yet.
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-6xl mx-auto justify-items-center">
          {sortedMoleculesForGap.map((mol, idx) => {
            const isSelected = selectedTopK.includes(mol.uniqueId);
            return (
              <div
                key={mol.uniqueId}
                className={`relative bg-gradient-to-br backdrop-blur-xl p-2 rounded-xl border-2 transition-all duration-500 w-full max-w-[140px] h-[200px] flex flex-col items-center ${isSelected ? 'from-green-900/50 to-emerald-900/50 border-green-400 shadow-lg shadow-green-500/50 scale-105' : 'from-red-900/30 to-gray-900/30 border-red-400/50 opacity-70'}`}
                style={{ animation: `fadeInUp 0.3s ease-out ${idx * 0.05}s both` }}
              >
                {isSelected ? <div className="absolute top-1 right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center z-10"><span className="text-white text-sm font-bold">✓</span></div> : <div className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center z-10"><span className="text-white text-sm font-bold">✕</span></div>}
                <div className="flex-shrink-0 flex justify-center">
                  <Suspense fallback={<Molecule3DLoader size={90} />}>
                    <MemoizedMolecule3DViewer size={90} xyz={mol.xyz} />
                  </Suspense>
                </div>
                <p className="text-xs text-white text-center font-semibold mt-1 truncate flex-shrink-0 w-full px-1">{mol.name}</p>
                <div className="mt-auto bg-slate-900/70 rounded-lg px-2 py-1 border border-slate-700 flex-shrink-0 w-full">
                  <p className="text-xs text-center text-gray-400 mb-0.5">GAP Value</p>
                  <p className={`text-center font-bold text-sm ${isSelected ? 'text-green-400' : 'text-white'}`}>{mol.gap}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GapAnalysisStep;