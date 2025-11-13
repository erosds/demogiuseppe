import React, { useState, lazy, Suspense } from 'react';
import { Cpu, HelpCircle } from 'lucide-react';

const MemoizedMolecule3DViewer = lazy(() => import('../molecule-viewer/Molecule3DViewer.jsx'));

const Molecule3DLoader = ({ size = 65 }) => (
  <div 
    style={{ width: size, height: size }} 
    className="flex items-center justify-center bg-gray-800/30 rounded-lg"
  >
    <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const GenerationStep = ({
  selectionPreviews,
  generateMolecules,
  isGenerating,
  generationMode
}) => {
  const [showAITooltip, setShowAITooltip] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center overflow-auto p-3 animate-fadeIn">
      <div className="max-w-5xl w-full space-y-2">
        <h1 className="text-lg font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
          Catalysts Generation
        </h1>

        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-3 border border-cyan-500/30 shadow-lg mb-3">
          <p className="text-gray-200 text-center text-base leading-relaxed">
            Choose how to generate new metal catalysts for CO₂ catalysis: either <span className="text-purple-400 font-semibold">combinatorially</span>,
            by starting from basic structures and replacing parts with available metals or substituents, or by using a pre-trained
            <span className="text-cyan-400 font-semibold"> Generative AI model</span> to autonomously generate metal complexes.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Combinatorial Generation */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-xl rounded-xl p-2 border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105 flex flex-col">
            <div className="flex-grow">
              <div className="text-center mb-1">
                <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                  Combinatorial Generation
                </h2>
              </div>
              <div className="space-y-1">
                <div>
                  <h3 className="text-sm font-semibold text-blue-300 mb-1 text-center">Available Metals</h3>
                  <div className="flex gap-1 justify-center">
                    {selectionPreviews.metals.map(metal => (
                      <div key={metal.name} className="p-1 rounded-lg border border-gray-600 bg-gray-800/30 flex flex-col items-center justify-center w-[90px] h-[90px] overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:scale-105">
                        <Suspense fallback={<Molecule3DLoader size={65} />}>
                          <MemoizedMolecule3DViewer size={65} xyz={metal.xyz} />
                        </Suspense>
                        <p className="text-center mt-0.5 text-sm font-bold text-white">{metal.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-green-300 mb-1 text-center">Available Substituents</h3>
                  <div className="flex gap-1 justify-center">
                    {selectionPreviews.substituents.map(sub => (
                      <div key={sub.name} className="p-1 rounded-lg border border-gray-600 bg-gray-800/30 flex flex-col items-center justify-center w-[90px] h-[90px] overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:scale-105">
                        <Suspense fallback={<Molecule3DLoader size={65} />}>
                          <MemoizedMolecule3DViewer size={65} xyz={sub.xyz} />
                        </Suspense>
                        <p className="text-center mt-0.5 text-sm font-bold text-white">{sub.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-purple-300 mb-1 text-center">Available Base Structures</h3>
                  <div className="flex gap-1 justify-center">
                    {selectionPreviews.structures.map(struct => (
                      <div key={struct.name} className="p-1 rounded-lg border border-gray-600 bg-gray-800/30 flex flex-col items-center justify-center w-[90px] h-[90px] overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:scale-105">
                        <Suspense fallback={<Molecule3DLoader size={65} />}>
                          <MemoizedMolecule3DViewer size={65} xyz={struct.xyz} />
                        </Suspense>
                        <p className="text-center mt-0.5 text-sm font-bold text-white">{struct.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => generateMolecules(true)}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:opacity-50 text-white text-base font-bold py-2 px-2 rounded-xl transition-all transform hover:scale-105 disabled:transform-none shadow-md hover:shadow-lg mt-2"
            >
              {isGenerating && generationMode === 'combinatorial' ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </span>
              ) : 'Generate'}
            </button>
          </div>

          {/* AI Generation */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-xl rounded-xl p-2 border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105 flex flex-col relative">
            <div 
              className="absolute top-2 right-2 z-10"
              onMouseEnter={() => setShowAITooltip(true)}
              onMouseLeave={() => setShowAITooltip(false)}
            >
              <div className="relative">
                <HelpCircle className="w-5 h-5 text-cyan-400 cursor-help hover:text-cyan-300 transition-colors" />
                
                {showAITooltip && (
                  <div className="absolute top-0 right-7 w-64 bg-gradient-to-br from-slate-900/98 to-cyan-900/98 backdrop-blur-xl rounded-lg p-3 border border-cyan-400/50 shadow-2xl animate-fadeIn">
                    <p className="text-xs text-gray-200 leading-relaxed">
                      We are exploring <span className="text-cyan-400 font-semibold">Quantum Generative AI</span> solutions for advanced molecular generation, leveraging cutting-edge quantum computing techniques to discover novel catalyst structures.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-grow">
              <div className="text-center mb-1">
                <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-1">
                  AI Generation
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/30 blur-xl animate-pulse justify-center" />
                  <Cpu className="w-28 h-28 text-cyan-400 animate-pulse relative z-10" />
                </div>
                <p className="text-center text-cyan-200 text-base mt-2 font-medium">
                  Generative AI Model
                </p>
              </div>
            </div>
            <button
              onClick={() => generateMolecules(false)}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 disabled:opacity-50 text-white text-base font-bold py-2 px-2 rounded-xl transition-all transform hover:scale-105 disabled:transform-none shadow-md hover:shadow-lg mt-2"
            >
              {isGenerating && generationMode === 'AI' ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </span>
              ) : 'Generate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationStep;