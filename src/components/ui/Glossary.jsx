import React, { useState } from 'react';
import { Info } from 'lucide-react';

const Glossary = () => {
  const [isVisible, setIsVisible] = useState(false);

  const glossaryTerms = [
    { term: "Catalyst", definition: "Molecule that facilitates the CO₂-epoxide reaction without being consumed" },
    { term: "Epoxide", definition: "Reactant molecules that combine with CO₂ via catalyst activation to form cyclic carbonates" },
    { term: "Cyclic Carbonate", definition: "Product formed from the reaction between CO₂ and epoxide, catalyzed by the catalyst" },
    { term: "HOMO", definition: "Highest Occupied Molecular Orbital - the highest energy orbital containing electrons" },
    { term: "LUMO", definition: "Lowest Unoccupied Molecular Orbital - the lowest energy orbital without electrons" },
    { term: "HOMO-LUMO Gap", definition: "Energy difference between HOMO and LUMO, indicates catalyst reactivity. Smaller gap = more reactive" },
    { term: "Binding Energy", definition: "Energy released when catalyst and epoxide form a complex. More negative = stronger interaction" },
    { term: "Unimol", definition: "Regression model fine-tuned on catalyst data to predict HOMO and LUMO values" },
    { term: "UMA", definition: "Universal Models for Atoms by Meta FAIR - model for predicting binding energies" }
  ];

  return (
    <div 
      className="fixed top-4 left-4 z-50"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="relative">
        <div className="bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-xl rounded-full p-3 border-2 border-purple-400/50 shadow-lg hover:scale-110 transition-transform cursor-pointer">
          <Info className="w-6 h-6 text-white" />
        </div>
        
        {isVisible && (
          <div className="absolute top-0 left-16 w-96 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl rounded-xl p-4 border-2 border-purple-400/50 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
              Glossary
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
              {glossaryTerms.map((item, index) => (
                <div key={index} className="border-b border-purple-400/30 pb-2 last:border-b-0">
                  <dt className="text-sm font-bold text-purple-300 mb-1">{item.term}</dt>
                  <dd className="text-xs text-gray-200 leading-relaxed">{item.definition}</dd>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;