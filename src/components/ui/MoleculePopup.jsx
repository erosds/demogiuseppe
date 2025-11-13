import React from 'react';
import MemoizedMolecule3DViewer from '../molecule-viewer/Molecule3DViewer';

const MoleculePopup = ({ molecule, setMolecule }) => {
    if (!molecule) return null;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] animate-fadeIn" onClick={() => setMolecule(null)}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-3 rounded-xl border-2 border-purple-400 max-w-xl shadow-md transform scale-100 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-white mb-2 text-center">{molecule.name}</h3>
                <div className="flex justify-center">
                    <MemoizedMolecule3DViewer size={Math.min(350, window.innerWidth * 0.7)} xyz={molecule.xyz} />
                </div>
                <button onClick={() => setMolecule(null)} className="mt-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-bold py-1.5 px-3 rounded-xl transition-all transform hover:scale-105 shadow-md">
                    Close
                </button>
            </div>
        </div>
    );
};

export default MoleculePopup;