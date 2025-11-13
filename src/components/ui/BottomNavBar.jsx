import React from 'react';

const BottomNavBar = ({ currentBlock, goToBlock, canGoForward, stepTitles, showStartOverlay }) => {
    return (
        <div className={`absolute bottom-0 left-0 right-0 py-1 bg-gradient-to-t from-indigo-950/80 to-transparent transition-all ${showStartOverlay ? 'z-10 opacity-0 pointer-events-none' : 'z-50 opacity-100'}`}>
            <div className="flex flex-col items-center gap-3">
                <p className="text-purple-300 font-medium text-lg tracking-tight">{stepTitles[currentBlock]}</p>
                <div className="flex justify-center gap-3">
                    <button onClick={() => currentBlock > 0 && goToBlock(currentBlock - 1)} disabled={currentBlock === 0} className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 disabled:transform-none">
                        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl px-3 py-1.5 rounded-full border border-purple-500/50">
                        {stepTitles.map((_, block) => (
                            <div key={block} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentBlock === block ? 'bg-purple-400 w-4' : block < currentBlock ? 'bg-green-500' : 'bg-gray-600'}`} />
                        ))}
                    </div>
                    <button onClick={() => goToBlock(currentBlock + 1)} disabled={!canGoForward} className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 disabled:transform-none">
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BottomNavBar;