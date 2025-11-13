import React, { lazy, Suspense } from 'react';
import { Play, ArrowRight, X, Check } from 'lucide-react';

const MemoizedMolecule3DViewer = lazy(() => import('../molecule-viewer/Molecule3DViewer'));

const Molecule3DLoader = ({ size = 80 }) => (
    <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center bg-gray-800/30 rounded-lg"
    >
        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const WorkflowExplanationStep = ({ exampleMolecules }) => {
    return (
        <div className="flex-1 flex items-center justify-center overflow-auto p-3 animate-fadeIn">
            <div className="max-w-6xl w-full space-y-4">
                <h3 className="text-3xl font-bold text-left mb-4 text-white">
                    Workflow Explanation
                </h3>
                <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/30 shadow-lg mb-6">
                    <p className="text-gray-200 text-center text-base leading-relaxed">
                        In this workflow, <span className="text-green-400 font-semibold">Machine Learning</span> is employed to significantly accelerate the catalysts discovery process for CO2 catalytic conversion. Starting from a large pool of generated molecules, ML models are used to filter promising candidates based on predicted properties, thereby reducing the need for computationally expensive traditional molecular simulations. The most promising molecules are then analyzed in detail.
                    </p>
                </div>
                <div className="flex items-stretch gap-4 h-[400px]">
                    {/* Molecule Generation */}
                    <div className="flex-1 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-105 flex flex-col">
                        <div className="text-center mb-3">
                            <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">Molecule Generation</h2>
                            <p className="text-sm text-cyan-300">Generated Candidates</p>
                        </div>
                        <div className="flex-grow overflow-auto">
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                {exampleMolecules.generation.map((mol, index) => (
                                    <div key={index} className="p-2 rounded-lg border border-gray-600 bg-gray-800/30 flex flex-col items-center justify-center h-[100px] overflow-hidden transition-all duration-300 hover:border-blue-500/50" style={{ animation: `fadeIn 0.5s ease-in ${index * 0.2}s both` }}>
                                        <Suspense fallback={<Molecule3DLoader size={80} />}>
                                            <MemoizedMolecule3DViewer size={80} xyz={mol.xyz} />
                                        </Suspense>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mb-2"><p className="text-blue-300 font-bold text-5xl">...</p></div>
                        </div>
                        <div className="text-center mt-2 p-2 bg-blue-900/30 rounded-lg border border-blue-500/30">
                            <p className="text-blue-300 font-bold text-lg">Generate millions of molecules</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center"><ArrowRight className="w-12 h-12 text-cyan-400" /></div>

                    {/* Filtering */}
                    <div className="flex-1 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30 shadow-lg hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105 flex flex-col">
                        <div className="text-center mb-3">
                            <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">Smart Filtering</h2>
                            <p className="text-sm text-purple-300">Properties Prediction</p>
                        </div>
                        <div className="flex-grow flex flex-col justify-center space-y-6">
                            <div className="relative p-4 rounded-lg border-2 border-red-500/50 bg-red-900/20">
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg"><X className="w-6 h-6 text-white font-bold" /></div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-red-400 mb-1">Traditional molecular simulation</h3><p className="text-sm text-red-300">Too Slow</p><p className="text-s text-gray-400 mt-2">⏱️~days 🐢</p>
                                </div>
                            </div>
                            <div className="relative p-4 rounded-lg border-2 border-green-500/50 bg-green-900/20">
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg"><Check className="w-6 h-6 text-white font-bold" /></div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-green-400 mb-1">Machine Learning</h3><p className="text-sm text-green-300">Ultra Fast</p><p className="text-s text-gray-400 mt-2">⏱️~seconds ⚡</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4 p-2 bg-purple-900/30 rounded-lg border border-purple-500/30">
                            <p className="text-purple-300 font-bold text-lg">Filter by properties</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center"><ArrowRight className="w-12 h-12 text-purple-400" /></div>

                    {/* Analysis */}
                    <div className="flex-1 bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-xl rounded-xl p-4 border border-green-500/30 shadow-lg hover:shadow-green-500/50 transition-all duration-500 hover:scale-105 flex flex-col">
                        <div className="text-center mb-3">
                            <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">Detailed Analysis</h2>
                            <p className="text-sm text-green-300">Top Candidates</p>
                        </div>
                        <div className="flex-grow overflow-auto">
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                {exampleMolecules.filtered.map((mol, index) => (
                                    <div key={index} className="p-2 rounded-lg border-2 border-green-500/50 bg-green-800/20 flex flex-col items-center justify-center h-[100px] overflow-hidden transition-all duration-300 hover:border-green-400 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30" style={{ animation: `fadeIn 0.5s ease-in ${index * 0.3}s both` }}>
                                        <Suspense fallback={<Molecule3DLoader size={80} />}>
                                            <MemoizedMolecule3DViewer size={80} xyz={mol.xyz} />
                                        </Suspense>
                                        <div className="flex items-center gap-1 mt-1"><span className="text-xs text-yellow-300">{mol.score}</span></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center mt-2 p-2 bg-green-900/30 rounded-lg border border-green-500/30">
                            <p className="text-green-300 font-bold text-lg">Analyze promising molecules</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkflowExplanationStep;