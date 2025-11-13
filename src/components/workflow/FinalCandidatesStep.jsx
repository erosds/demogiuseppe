// src/components/workflow/FinalCandidatesStep.jsx
import React, { lazy, Suspense } from 'react';
import { Search, Award, FlaskConical } from 'lucide-react';

const MemoizedMolecule3DViewer = lazy(() => import('../molecule-viewer/Molecule3DViewer'));

const Molecule3DLoader = ({ size = 140 }) => (
  <div 
    style={{ width: size, height: size }} 
    className="flex items-center justify-center bg-gray-800/30 rounded-lg"
  >
    <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const FinalCandidatesStep = ({ finalCandidates, startNewAnalysis }) => {
  return (
    <div className="flex-1 flex flex-col p-3 animate-fadeIn">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-3 mb-1">
          <Search className="w-7 h-7 text-yellow-400 animate-pulse" />
          <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">Final Candidates</h2>
        </div>
        <p className="text-yellow-200 text-base font-semibold">Top {finalCandidates.length} combinations with the strongest binding energy.</p>
      </div>
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-3 border border-orange-500/30 shadow-lg mb-3 mx-auto w-6xl max-w-7xl">
        <p className="text-gray-200 text-center text-base leading-relaxed">
          Based on <span className="text-yellow-400 font-semibold">binding energy</span>, the <span className="text-orange-400 font-semibold">most promising catalyst-epoxide complexes</span> are selected for laboratory validation. These candidates will be experimentally tested to evaluate the CO₂-epoxide interaction and, if successful, the catalysts can be synthesized for practical application.
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-center items-start gap-5 max-w-7xl mx-auto flex-nowrap">
          {finalCandidates.map((combo, idx) => (
            <div
              key={combo.id}
              className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 backdrop-blur-xl p-4 rounded-xl border-2 border-yellow-400/50 shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-500 relative flex-shrink-0"
              style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.2}s both`, width: '340px', maxWidth: '340px' }}
            >
              {idx === 0 && <div className="absolute top-1 right-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-pulse z-10"><Award className="w-5 h-5" />Top Candidate</div>}
              <div className="flex items-center justify-center gap-3 mb-3">
                <Suspense fallback={<Molecule3DLoader size={140} />}>
                  <MemoizedMolecule3DViewer size={140} xyz={combo.catalyst.xyz} />
                </Suspense>
                <div className="text-xl text-yellow-400 font-bold">+</div>
                <Suspense fallback={<Molecule3DLoader size={140} />}>
                  <MemoizedMolecule3DViewer size={140} xyz={combo.epoxide.xyz} />
                </Suspense>
              </div>
              <div className="text-center mb-3"><p className="text-base text-yellow-100 font-semibold truncate">{combo.catalyst.name} + {combo.epoxide.name}</p></div>
              <div className="space-y-3 bg-slate-900/70 rounded-xl p-3 border border-slate-700">
                <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Catalyst GAP:</span><span className="text-lg text-white font-bold">{combo.catalyst.gap}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Binding Energy:</span><span className="text-lg text-cyan-400 font-bold">{combo.bindingEnergy} eV</span></div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-yellow-400">
                <FlaskConical className="w-6 h-6" /><span className="text-sm font-bold">READY FOR LAB ANALYSIS AND SYNTHESIS</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-2">
        <button
          onClick={startNewAnalysis}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-base font-bold py-2 px-5 rounded-xl transition-all transform hover:scale-110 shadow-lg"
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
};

export default FinalCandidatesStep;