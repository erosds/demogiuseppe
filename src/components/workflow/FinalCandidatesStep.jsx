// src/components/workflow/FinalCandidatesStep.jsx
import React, { lazy, Suspense } from 'react';
import { Search, Award, FlaskConical } from 'lucide-react';

const MemoizedMolecule3DViewer = lazy(() => import('../molecule-viewer/Molecule3DViewer'));

const Molecule3DLoader = ({ size = 140 }) => (
  <div
    style={{ width: size, height: size }}
    className="flex items-center justify-center bg-gray-800/30 rounded-lg"
  >
    <div className="w-5 h-5 border border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const FinalCandidatesStep = ({ finalCandidates, startNewAnalysis }) => {
  return (
    <div className="flex-1 flex items-center justify-center overflow-auto p-3 animate-fadeIn">
      <div className="max-w-7xl w-full space-y-3">
        <h3 className="text-3xl font-bold text-left text-white mb-2">Final Candidates</h3>

        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-3 border border-orange-500/30 shadow-lg mb-3">
          <p className="text-gray-200 text-center text-base leading-relaxed">
            The top {finalCandidates.length} catalyst-epoxide complexes with the <span className="text-yellow-400 font-semibold">strongest binding energy</span> are selected as <span className="text-orange-400 font-semibold">the most promising candidates</span> for laboratory validation. These will be experimentally tested to evaluate the CO₂-epoxide interaction and, if successful, the catalysts can be synthesized for practical application.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto flex justify-center items-start gap-16 flex-nowrap">
          {finalCandidates.map((combo, idx) => (
            <div
              key={combo.id}
              className="w-full max-w-sm bg-gradient-to-br from-yellow-900/40 to-orange-900/40 backdrop-blur-xl p-4 rounded-xl border border-yellow-400/50 shadow-lg hover:shadow-yellow-500/50 transform  transition-all duration-500 relative flex-shrink-0"
              style={{ animation: `fadeInUp 0.5s ease-out ${idx * 0.2}s both` }}
            >
              {idx === 0 && <div className="absolute top-1 right-1 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2 animate-pulse z-10"><Award className="w-5 h-5" />Top Candidate</div>}
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

              <div className="w-full max-w-sm bg-gradient-to-br from-yellow-900/10 to-orange-900/10 backdrop-blur-xl p-3 rounded-xl border border-yellow-400/30 transform  transition-all duration-500 relative flex-shrink-0"
              >
                <div className="flex justify-between items-center"><span className="text-sm text-gray-100">Catalyst GAP:</span><span className="text-lg text-white font-bold">{combo.catalyst.gap}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm text-gray-100">Binding Energy:</span><span className="text-lg text-cyan-400 font-bold">{combo.bindingEnergy} eV</span></div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-yellow-400">
                <FlaskConical className="w-6 h-6" /><span className="text-sm font-bold">READY FOR LAB TESTS</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalCandidatesStep;