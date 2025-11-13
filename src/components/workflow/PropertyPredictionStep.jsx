// src/components/workflow/PropertyPredictionStep.jsx
import React, { lazy, Suspense } from 'react';
import { ArrowDown } from 'lucide-react';

const MemoizedMolecule3DViewer = lazy(() => import('../molecule-viewer/Molecule3DViewer'));

const Molecule3DLoader = ({ size = 100 }) => (
  <div 
    style={{ width: size, height: size }} 
    className="flex items-center justify-center bg-gray-800/30 rounded-lg"
  >
    <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const PropertyPredictionStep = ({ moleculesForPrediction, predictProperties, isPredicting, moleculesWithGap, showConnections }) => {
  return (
    <div className="flex-1 flex flex-col items-center p-3 animate-fadeIn relative">
      <h2 className="text-lg font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
        Molecules Properties Prediction
      </h2>
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-3 border border-purple-500/30 shadow-lg mb-3 w-full max-w-6xl">
        <p className="text-gray-200 text-center text-base leading-relaxed">
          The <span className="text-purple-400 font-semibold">Unimol model</span>, a regression model properly fine-tuned on a catalysts dataset, predicts two values: <span className="text-pink-400 font-semibold">HOMO and LUMO</span>. These orbital energies determine whether a catalyst can effectively interact with an epoxide to facilitate the cycloaddition reaction with CO2, forming cyclic carbonates. Epoxides are the substrate molecules that catalysts activate to capture CO2.
        </p>
      </div>
      <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl p-4 rounded-2xl border-2 border-purple-400/50 shadow-xl w-full max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {moleculesForPrediction.map((mol) => (
            <div key={mol.uniqueId} className="relative flex flex-col items-center z-10 w-[calc(20%-1rem)]" style={{ maxWidth: '160px' }}>
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl p-3 rounded-xl border-2 border-purple-400/50 shadow-lg flex items-center justify-center w-full h-28">
                <Suspense fallback={<Molecule3DLoader size={100} />}>
                  <MemoizedMolecule3DViewer size={100} xyz={mol.xyz} />
                </Suspense>
              </div>
              <p className="text-sm text-purple-200 mt-1 text-center font-semibold truncate w-full">{mol.name}</p>
            </div>
          ))}
        </div>
      </div>
      {showConnections && (
        <div className="flex flex-col items-center my-2">
          <div className="flex flex-col items-center animate-bounce"><ArrowDown className="w-8 h-8 text-pink-400" strokeWidth={3} /></div>
        </div>
      )}
      <div className={`relative bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-2xl p-3 rounded-xl border-2 w-full max-w-2xl transition-all duration-500 ${isPredicting ? 'border-purple-400 shadow-lg shadow-purple-500/50 scale-105' : 'border-purple-500/40'} z-20`}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-xl" />
        <div className="text-center relative z-10">
          <div className="relative inline-block mb-2"><div className={`absolute inset-0 bg-purple-500/50 blur-2xl rounded-full ${isPredicting ? 'animate-pulse' : ''}`} /></div>
          <img src="images/unimol-logo.png" alt="Unimol Model" className="h-10 mx-auto mb-1 object-contain" />
          <p className="text-purple-200 text-base font-medium">Molecular Properties Predictor</p>
        </div>
        <button
          onClick={predictProperties}
          disabled={isPredicting || moleculesWithGap.length > 0}
          className="w-full mt-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 disabled:opacity-50 text-white text-base font-bold py-2 px-3 rounded-xl transition-all transform hover:scale-105 disabled:transform-none shadow-md"
        >
          {isPredicting ? <span className="flex items-center justify-center gap-3"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Predicting...</span> : moleculesWithGap.length > 0 ? 'Predicted ✓' : 'Predict properties'}
        </button>
      </div>
    </div>
  );
};

export default PropertyPredictionStep;