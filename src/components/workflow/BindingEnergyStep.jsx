// src/components/workflow/BindingEnergyStep.jsx
import React, { useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';

const MemoizedMolecule3DViewer = lazy(() => import('../molecule-viewer/Molecule3DViewer'));

const Molecule3DLoader = ({ size = 75 }) => (
  <div
    style={{ width: size, height: size }}
    className="flex items-center justify-center bg-gray-800/30 rounded-lg"
  >
    <div className="w-3 h-3 border border-orange-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const BindingEnergyStep = ({ combinations, predictBindingEnergy, isPredictingBinding, finalCandidates, showConnections }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  const displayCombinations = useMemo(() => {
    const catalystMap = new Map();

    combinations.forEach(combo => {
      if (!catalystMap.has(combo.catalyst.uniqueId)) {
        catalystMap.set(combo.catalyst.uniqueId, []);
      }
      catalystMap.get(combo.catalyst.uniqueId).push(combo);
    });

    const selected = [];
    catalystMap.forEach(combos => {
      const randomIndex = Math.floor(Math.random() * combos.length);
      selected.push(combos[randomIndex]);
    });

    return selected.slice(0, 5);
  }, [combinations]);

  useEffect(() => {
    setVisibleCount(0);
    if (displayCombinations.length > 0) {
      const timer = setTimeout(() => {
        setVisibleCount(displayCombinations.length);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [displayCombinations]);

  return (
    <div className="flex-1 flex items-center justify-center overflow-auto p-3 animate-fadeIn">
      <div className="max-w-7xl w-full space-y-3">
        <h3 className="text-3xl font-bold text-left text-white mb-2">
          Binding Energy Prediction
        </h3>

        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-3 border border-orange-500/30 shadow-lg mb-3">
          <p className="text-gray-200 text-center text-base leading-relaxed">
            At this stage, after analyzing the obtained gaps, the catalysts are chemically combined with the epoxides by coordinating the oxygen of the epoxide with the metal of the catalyst. Then the <span className="text-orange-400 font-semibold">UMA model by Meta</span> calculates <span className="text-amber-400 font-semibold">binding energy</span> for catalyst–epoxide complexes, a crucial property for evaluating their interaction.
          </p>
        </div>

        <div className="flex items-stretch gap-4">
          {/* Catalyst-Epoxide Combinations - Sinistra */}
          <div className="flex-1 bg-gradient-to-br from-orange-900/40 to-amber-900/40 backdrop-blur-xl rounded-xl p-4 border border-orange-500/30 shadow-lg hover:shadow-orange-500/50 transition-all duration-500 flex flex-col">
            <div className="text-center mb-3">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-1">Catalyst-Epoxide Complexes</h3>
              <p className="text-base text-orange-300">Combinations for analysis</p>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-2 gap-3">
                {displayCombinations.map((combo, index) => (
                  <div
                    key={combo.id}
                    className="bg-gradient-to-br from-orange-900/50 to-amber-900/50 backdrop-blur-xl p-3 rounded-xl border border-orange-400/50 shadow-lg flex items-center justify-center gap-4"
                    style={{
                      opacity: visibleCount > 0 ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-20">
                        {visibleCount > 0 && (
                          <Suspense fallback={<Molecule3DLoader size={75} />}>
                            <MemoizedMolecule3DViewer key={`cat-${combo.id}`} size={75} xyz={combo.catalyst.xyz} />
                          </Suspense>
                        )}
                      </div>
                      <p className="text-xs text-center text-orange-200 font-semibold mt-1 truncate w-full">
                        {combo.catalyst.name}
                      </p>
                    </div>

                    <span className="text-orange-300 font-bold text-2xl">+</span>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-20">
                        {visibleCount > 0 && (
                          <Suspense fallback={<Molecule3DLoader size={70} />}>
                            <MemoizedMolecule3DViewer key={`epo-${combo.id}`} size={70} xyz={combo.epoxide.xyz} />
                          </Suspense>
                        )}
                      </div>
                      <p className="text-xs text-center text-cyan-200 font-semibold mt-1 truncate w-full">
                        {combo.epoxide.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Freccia centrale */}
          {showConnections && (
            <div className="flex items-center justify-center">
              <ArrowRight className="w-12 h-12 text-amber-400" strokeWidth={3} />
            </div>
          )}

          {/* Modello UMA - Destra */}
          <div className="flex-1 bg-gradient-to-br from-orange-900/40 to-amber-900/40 backdrop-blur-xl rounded-xl p-4 border border-orange-500/30 shadow-lg hover:shadow-orange-500/50 transition-all duration-500 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-xl rounded-xl" />
              <div className="text-center relative z-10">
                <div className="relative inline-block mb-3">
                  <div className={`absolute inset-0 bg-orange-500/50 blur-2xl rounded-full ${isPredictingBinding ? 'animate-pulse' : ''}`} />
                </div>
                <img src="images/uma-logo.png" alt="UMA Model" className="h-32 mx-auto mb-3 object-contain" />
                  <div className="space-y-1 mb-6">
                    <p className="text-xl text-amber-400 font-bold">Binding Energy</p>
                  </div>
              </div>
              <button
                onClick={predictBindingEnergy}
                disabled={isPredictingBinding || finalCandidates.length > 0}
                className="w-64 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 disabled:opacity-50 text-white text-xl font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 disabled:transform-none shadow-md relative z-10"
              >
                {isPredictingBinding ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Predicting...
                  </span>
                ) : finalCandidates.length > 0 ? (
                  'Predicted ✓'
                ) : (
                  'Predict'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BindingEnergyStep;