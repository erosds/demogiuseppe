// src/components/workflow/BindingEnergyStep.jsx
import React, { useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { ArrowDown } from 'lucide-react';

const MemoizedMolecule3DViewer = lazy(() => import('../molecule-viewer/Molecule3DViewer'));

const Molecule3DLoader = ({ size = 75 }) => (
  <div 
    style={{ width: size, height: size }} 
    className="flex items-center justify-center bg-gray-800/30 rounded-lg"
  >
    <div className="w-3 h-3 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
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
    <div className="flex-1 flex flex-col items-center justify-around p-3 animate-fadeIn relative">
      <h2 className="text-lg font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
        Binding Energy Prediction
      </h2>
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-2 border border-orange-500/30 shadow-lg mb-2 w-full max-w-6xl">
        <p className="text-gray-200 text-center text-base leading-relaxed">
          At this stage, after analyzing the obtained gaps, the catalysts are chemically combined with the epoxides by coordinating the oxygen of the epoxide with the metal of the catalyst. Then the <span className="text-orange-400 font-semibold">UMA model by Meta</span> calculates <span className="text-amber-400 font-semibold">binding energy</span> for catalyst–epoxide complexes, a crucial property for evaluating their interaction.
        </p>
      </div>
      <div className="relative bg-gradient-to-br from-orange-900/30 to-amber-900/30 backdrop-blur-xl p-4 rounded-2xl border-2 border-orange-400/50 shadow-xl w-full max-w-6xl mx-auto">
        <div className="flex gap-4 items-center justify-center flex-wrap">
          {displayCombinations.map((combo, index) => (
            <div 
              key={combo.id} 
              className="relative flex flex-col items-center justify-center gap-2 bg-slate-900/50 p-3 rounded-xl border-2 border-orange-400/50 w-32"
              style={{ 
                opacity: visibleCount > 0 ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center h-20">
                  {visibleCount > 0 && (
                    <Suspense fallback={<Molecule3DLoader size={75} />}>
                      <MemoizedMolecule3DViewer key={`cat-${combo.id}`} size={75} xyz={combo.catalyst.xyz} />
                    </Suspense>
                  )}
                </div>
                <p className="text-xs text-center text-orange-200 font-semibold truncate w-full">
                  {combo.catalyst.name}
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-1 my-1">
                <span className="text-orange-300 font-bold text-2xl">+</span>
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center h-20">
                  {visibleCount > 0 && (
                    <Suspense fallback={<Molecule3DLoader size={70} />}>
                      <MemoizedMolecule3DViewer key={`epo-${combo.id}`} size={70} xyz={combo.epoxide.xyz} />
                    </Suspense>
                  )}
                </div>
                <p className="text-xs text-center text-cyan-200 font-semibold truncate w-full">
                  {combo.epoxide.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showConnections && (
        <div className="flex flex-col items-center my-2">
          <div className="flex flex-col items-center animate-bounce">
            <ArrowDown className="w-8 h-8 text-amber-400" strokeWidth={3} />
          </div>
        </div>
      )}
      <div className={`relative bg-gradient-to-br from-orange-900/60 to-amber-900/60 backdrop-blur-2xl p-3 rounded-xl border-2 w-full max-w-2xl transition-all duration-500 ${isPredictingBinding ? 'border-orange-400 shadow-lg shadow-orange-500/50 scale-105' : 'border-orange-500/40'} z-20`}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-xl rounded-xl" />
        <div className="text-center relative z-10">
          <div className="relative inline-block mb-1">
            <div className={`absolute inset-0 bg-orange-500/50 blur-2xl rounded-full ${isPredictingBinding ? 'animate-pulse' : ''}`} />
          </div>
          <img src="images/uma-logo.png" alt="Interaction Model" className="h-10 mx-auto mb-1 object-contain" />
          <p className="text-orange-200 text-base font-medium">Binding Energy Predictor</p>
        </div>
        <button
          onClick={predictBindingEnergy}
          disabled={isPredictingBinding || finalCandidates.length > 0}
          className="w-full mt-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 disabled:opacity-50 text-white text-base font-bold py-2 px-3 rounded-xl transition-all transform hover:scale-105 disabled:transform-none shadow-md"
        >
          {isPredictingBinding ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Predicting...
            </span>
          ) : finalCandidates.length > 0 ? (
            'Complete ✓'
          ) : (
            'Predict Binding Energy'
          )}
        </button>
      </div>
    </div>
  );
};

export default BindingEnergyStep;