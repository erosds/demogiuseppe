// src/components/workflow/PropertyPredictionStep.jsx
import React, { lazy, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';

const MemoizedMolecule3DViewer = lazy(() => import('../molecule-viewer/Molecule3DViewer'));

const Molecule3DLoader = ({ size = 80 }) => (
  <div
    style={{ width: size, height: size }}
    className="flex items-center justify-center bg-gray-800/30 rounded-lg"
  >
    <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const PropertyPredictionStep = ({ moleculesForPrediction, predictProperties, isPredicting, moleculesWithGap, showConnections }) => {
  return (
    <div className="flex-1 flex items-center justify-center overflow-auto p-3 animate-fadeIn">
      <div className="max-w-7xl w-full space-y-3">
        <h3 className="text-3xl font-bold text-left mb-2 text-white">
          Molecules Properties Prediction
        </h3>
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-3 border border-purple-500/30 shadow-lg mb-3">
          <p className="text-gray-200 text-center text-base leading-relaxed">
            The <span className="text-purple-400 font-semibold">Unimol model</span>, a regression model properly fine-tuned on a catalysts dataset, predicts two values: <span className="text-pink-400 font-semibold">HOMO and LUMO</span>. These orbital energies determine whether a catalyst can effectively interact with an epoxide to facilitate the cycloaddition reaction with CO2, forming cyclic carbonates. Epoxides are the substrate molecules that catalysts activate to capture CO2.
          </p>
        </div>

        <div className="flex items-stretch gap-4">
          {/* Molecole generate - sinistra */}
          <div className="flex-1 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30 shadow-lg hover:shadow-purple-500/50 transition-all duration-500 flex flex-col">
            <div className="text-center mb-3">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">Generated Molecules</h3>
              <p className="text-base text-purple-300">Candidates for prediction</p>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-5 gap-3">
                {moleculesForPrediction.map((mol) => (
                  <div key={mol.uniqueId} className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl p-2 rounded-xl border border-purple-400/50 shadow-lg flex flex-col items-center justify-center h-[120px]">
                    <Suspense fallback={<Molecule3DLoader size={80} />}>
                      <MemoizedMolecule3DViewer size={80} xyz={mol.xyz} />
                    </Suspense>
                    <p className="text-xs text-purple-200 mt-1 text-center font-semibold truncate w-full">{mol.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Freccia centrale */}
          {showConnections && (
            <div className="flex items-center justify-center">
              <ArrowRight className="w-12 h-12 text-pink-400" strokeWidth={3} />
            </div>
          )}

          {/* Modello Unimol - destra */}
          <div className="flex-1 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30 shadow-lg hover:shadow-purple-500/50 transition-all duration-500 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-xl" />
              <div className="text-center relative z-10">
                <div className="relative inline-block mb-3">
                  <div className={`absolute inset-0 bg-purple-500/50 blur-2xl rounded-full ${isPredicting ? 'animate-pulse' : ''}`} />
                </div>
                <img src="images/unimol-logo.png" alt="Unimol Model" className="h-32 mx-auto mb-3 object-contain" />
                <div className="space-y-1 mb-6">
                  <p className="text-xl text-pink-400 font-bold">HOMO Energy</p>
                  <p className="text-xl text-pink-400 font-bold">LUMO Energy</p>
                </div>
              </div>
              <button
                onClick={predictProperties}
                disabled={isPredicting || moleculesWithGap.length > 0}
                className="w-64 mb-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 disabled:opacity-50 text-white text-xl font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 disabled:transform-none shadow-md relative z-10"
              >
                {isPredicting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Predicting...
                  </span>
                ) : moleculesWithGap.length > 0 ? (
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

export default PropertyPredictionStep;