import React, { useState, useRef, useEffect, useMemo, lazy, Suspense } from 'react';

// Workflow components
const VideoIntroStep = lazy(() => import('./components/workflow/VideoIntroStep.jsx'));
const WorkflowExplanationStep = lazy(() => import('./components/workflow/WorkflowExplanationStep.jsx'));
const GenerationStep = lazy(() => import('./components/workflow/GenerationStep.jsx'));
const PropertyPredictionStep = lazy(() => import('./components/workflow/PropertyPredictionStep.jsx'));
const GapAnalysisStep = lazy(() => import('./components/workflow/GapAnalysisStep.jsx'));
const BindingEnergyStep = lazy(() => import('./components/workflow/BindingEnergyStep.jsx'));
const FinalCandidatesStep = lazy(() => import('./components/workflow/FinalCandidatesStep.jsx'));

// UI components
import AudioControls from './components/ui/AudioControls.jsx';
import BottomNavBar from './components/ui/BottomNavBar.jsx';
const MoleculePopup = lazy(() => import('./components/ui/MoleculePopup.jsx'));
const Glossary = lazy(() => import('./components/ui/Glossary.jsx'));

// Loader for Suspense
const StepLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mb-4"></div>
      <p className="text-purple-200 text-lg">Loading...</p>
    </div>
  </div>
);

const CatalystWorkflowApp = () => {
  const [moleculeManifest, setMoleculeManifest] = useState([]);
  const [generatedMolecules, setGeneratedMolecules] = useState([]);
  const [selectedMolecules, setSelectedMolecules] = useState([]);
  const [moleculesWithGap, setMoleculesWithGap] = useState([]);
  const [selectedTopK, setSelectedTopK] = useState([]);
  const [epoxideData, setEpoxideData] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [finalCandidates, setFinalCandidates] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isPredictingBinding, setIsPredictingBinding] = useState(false);
  const [generationMode, setGenerationMode] = useState(null);
  const [currentBlock, setCurrentBlock] = useState(0);
  const [showConnections, setShowConnections] = useState(false);
  const [popupMolecule, setPopupMolecule] = useState(null);
  const [showStartOverlay, setShowStartOverlay] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [selectionPreviews, setSelectionPreviews] = useState({ metals: [], substituents: [], structures: [] });
  const [exampleMolecules, setExampleMolecules] = useState({ generation: [], filtered: [] });
  const audioRef = useRef(null);

  const stepTitles = ['Video Introduction', 'Workflow Explanation', 'Catalysts Generation', 'Molecular Properties Prediction', 'GAP Analysis and Filtering', 'Binding Energy', 'Final Candidates'];

  const audioMap = {
    0: null,
    1: 'audio/audio-WorkflowExplanationStep.mp3',
    2: 'audio/audio-GenerationStep.mp3',
    3: 'audio/audio-PropertyPredictionStep.mp3',
    4: 'audio/audio-GapAnalysisStep.mp3',
    5: 'audio/audio-BindingEnergyStep.mp3',
    6: 'audio/audio-FinalCandidatesStep.mp3'
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const manifestResponse = await fetch(`/molecules/manifest.json`);
        const manifest = await manifestResponse.json();
        setMoleculeManifest(manifest);

        const shuffled = [...manifest].sort(() => 0.5 - Math.random());
        const exampleGenerationList = shuffled.slice(0, 6);
        const exampleFilteredList = shuffled.slice(6, 9);

        const loadMolecules = (list) => Promise.all(list.map(async (mol) => {
          const response = await fetch(`/molecules/${mol.file || mol.xyzFile}`);
          return { ...mol, xyz: await response.text() };
        }));

        const [loadedGeneration, loadedFiltered] = await Promise.all([
          loadMolecules(exampleGenerationList),
          loadMolecules(exampleFilteredList)
        ]);

        setExampleMolecules({
          generation: loadedGeneration,
          filtered: loadedFiltered.sort((a, b) => parseFloat(a.gap) - parseFloat(b.gap))
        });

        const initialMetals = [{ name: 'Cu', file: 'metal_Cu.xyz' }, { name: 'Ni', file: 'metal_Ni.xyz' }];
        const initialSubstituents = [{ name: 'CH3', file: 'substituent_CH3.xyz' }, { name: 'NO2', file: 'substituent_NO2.xyz' }];
        const initialStructures = [{ name: 'Salen', file: 'structure_Salen.xyz' }, { name: 'Salnaphen', file: 'structure_Salnaphen.xyz' }];

        const initialEpoxides = [
          { id: 'styrene', name: 'Styrene Oxide', xyzFile: 'Styrene-Oxide.xyz' },
          { id: 'propylene', name: 'Propylene Oxide', xyzFile: 'Propylene-Oxide.xyz' },
          { id: 'epichlorohydrin', name: 'Epichlorohydrin', xyzFile: 'Epichlorohydrin.xyz' }
        ];

        const [loadedMetals, loadedSubstituents, loadedStructures, loadedEpoxides] = await Promise.all([
          loadMolecules(initialMetals),
          loadMolecules(initialSubstituents),
          loadMolecules(initialStructures),
          loadMolecules(initialEpoxides),
        ]);

        setSelectionPreviews({ metals: loadedMetals, substituents: loadedSubstituents, structures: loadedStructures });
        setEpoxideData(loadedEpoxides);

      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (currentBlock === 0 && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentBlock]);

  const handleStartExperience = () => {
    setShowStartOverlay(false);
    audioRef.current?.play().catch(e => console.log('Audio reproduction blocked:', e));
  };

  const handleVideoComplete = () => {
    goToBlock(1);
  };

  const handleReloadAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsMuted(false);
      audioRef.current.play().catch(e => console.log('Audio reproduction error:', e));
    }
  };

  useEffect(() => {
    if (showStartOverlay || !audioRef.current) return;
    const audio = audioRef.current;
    const audioSrc = audioMap[currentBlock];
    if (audioSrc) {
      const timer = setTimeout(() => {
        audio.src = audioSrc;
        audio.load();
        audio.play().catch(e => console.log(`Audio error in ${currentBlock}:`, e));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentBlock, showStartOverlay]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  const goToBlock = (blockIndex) => {
    setCurrentBlock(blockIndex);
    setShowConnections(false);
    setTimeout(() => setShowConnections(true), 500);

    if (blockIndex === 0 && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const generateMolecules = async (isCombinatorial) => {
    setGeneratedMolecules([]);
    setSelectedMolecules([]);
    setMoleculesWithGap([]);
    setSelectedTopK([]);
    setCombinations([]);
    setFinalCandidates([]);

    setIsGenerating(true);
    setGenerationMode(isCombinatorial ? 'combinatorial' : 'AI');

    await new Promise(resolve => setTimeout(resolve, 800));

    const count = isCombinatorial ? 10 : 10;
    const availableMolecules = moleculeManifest.filter(mol => isCombinatorial ? mol.type !== 'AI' : mol.type === 'AI');
    const selectedPool = availableMolecules.slice(0, count);
    const molecules = await Promise.all(selectedPool.map(async (molInfo, idx) => {
      const response = await fetch(`/molecules/${molInfo.file}`);
      return { ...molInfo, xyz: await response.text(), uniqueId: `${molInfo.id}-${idx}-${Date.now()}` };
    }));
    setGeneratedMolecules(molecules);
    setSelectedMolecules(molecules.map(m => m.uniqueId));

    await new Promise(resolve => setTimeout(resolve, 500));

    setIsGenerating(false);
    setTimeout(() => goToBlock(3), 300);
  };

  const predictProperties = () => {
    setIsPredicting(true);
    setShowConnections(true);
    setTimeout(() => {
      const withGap = generatedMolecules.map(mol => ({
        ...mol,
        gap: (Math.random() * (0.11 - 0.08) + 0.08).toFixed(3)
      }));
      setMoleculesWithGap(withGap);
      const sorted = [...withGap].sort((a, b) => parseFloat(a.gap) - parseFloat(b.gap));
      const topK = 5;
      setSelectedTopK(sorted.slice(0, topK).map(m => m.uniqueId));

      const combos = [];
      sorted.slice(0, topK).forEach(mol => {
        epoxideData.forEach(epoxide => {
          if (mol && epoxide) combos.push({
            id: `combo-${mol.uniqueId}-${epoxide.id}`,
            catalyst: mol,
            epoxide
          });
        });
      });
      setCombinations(combos);

      setIsPredicting(false);
      setTimeout(() => goToBlock(4), 500);
    }, 2000);
  };

  const predictBindingEnergy = () => {
    setIsPredictingBinding(true);
    setShowConnections(true);
    setTimeout(() => {
      const combosWithEnergy = combinations.map(combo => ({
        ...combo,
        bindingEnergy: (Math.random() * (-0.3) - 0.5).toFixed(3)
      }));
      setCombinations(combosWithEnergy);
      const sorted = [...combosWithEnergy].sort((a, b) => parseFloat(a.bindingEnergy) - parseFloat(b.bindingEnergy));
      const topKBinding = 3;
      setFinalCandidates(sorted.slice(0, topKBinding));
      setIsPredictingBinding(false);
      setTimeout(() => goToBlock(6), 500);
    }, 2000);
  };

  const startNewAnalysis = () => {
    setGeneratedMolecules([]);
    setSelectedMolecules([]);
    setMoleculesWithGap([]);
    setCombinations([]);
    setFinalCandidates([]);
    setSelectedTopK([]);
    goToBlock(1);
  };

  const canGoForward = () => {
    switch (currentBlock) {
      case 0: return true;
      case 1: return true;
      case 2: return generatedMolecules.length > 0;
      case 3: return moleculesWithGap.length > 0;
      case 4: return selectedTopK.length > 0;
      case 5: return finalCandidates.length > 0;
      default: return false;
    }
  };

  const moleculesForPrediction = useMemo(() => generatedMolecules, [generatedMolecules]);
  const sortedMoleculesForGap = useMemo(() => [...moleculesWithGap].sort((a, b) => parseFloat(a.gap) - parseFloat(b.gap)), [moleculesWithGap]);
  const particles = useMemo(() => [...Array(30)].map((_, i) => ({ id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, duration: `${5 + Math.random() * 10}s`, delay: `${Math.random() * 5}s` })), []);

  const renderCurrentBlock = () => {
    switch (currentBlock) {
      case 0: return <VideoIntroStep onComplete={handleVideoComplete} showStartOverlay={showStartOverlay} handleStartExperience={handleStartExperience} />;
      case 1: return <WorkflowExplanationStep exampleMolecules={exampleMolecules} />;
      case 2: return <GenerationStep selectionPreviews={selectionPreviews} generateMolecules={generateMolecules} isGenerating={isGenerating} generationMode={generationMode} />;
      case 3: return <PropertyPredictionStep moleculesForPrediction={moleculesForPrediction} predictProperties={predictProperties} isPredicting={isPredicting} moleculesWithGap={moleculesWithGap} showConnections={showConnections} />;
      case 4: return <GapAnalysisStep sortedMoleculesForGap={sortedMoleculesForGap} selectedTopK={selectedTopK} />;
      case 5: return <BindingEnergyStep combinations={combinations} predictBindingEnergy={predictBindingEnergy} isPredictingBinding={isPredictingBinding} finalCandidates={finalCandidates} showConnections={showConnections} />;
      case 6: return <FinalCandidatesStep finalCandidates={finalCandidates} startNewAnalysis={startNewAnalysis} />;
      default: return null;
    }
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-gradient-to-br from-pink-950 via-purple-900 to-slate-950 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(p => <div key={p.id} className="absolute w-2 h-2 bg-white rounded-full opacity-20" style={{ left: p.left, top: p.top, animation: `float ${p.duration} ease-in-out infinite`, animationDelay: p.delay }} />)}
      </div>
      
      {!showStartOverlay && currentBlock > 0 && (
        <Suspense fallback={null}>
          <Glossary />
        </Suspense>
      )}
      
      {!showStartOverlay && currentBlock !== 0 && (
        <AudioControls
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          handleReloadAudio={handleReloadAudio}
          showStartOverlay={showStartOverlay}
        />
      )}
      
      <audio ref={audioRef} className="hidden" />
      
      <div className="absolute -bottom-10 right-3 pointer-events-auto">
        <img src="images/nttdata-logo.png" alt="Logo" className="w-36 h-36 object-contain opacity-100" />
      </div>
      
      <div className="h-full flex flex-col relative z-10 pb-20">
        <Suspense fallback={<StepLoader />}>
          {renderCurrentBlock()}
        </Suspense>
      </div>
      
      <BottomNavBar 
        currentBlock={currentBlock} 
        goToBlock={goToBlock} 
        canGoForward={canGoForward()} 
        stepTitles={stepTitles} 
        showStartOverlay={showStartOverlay} 
      />
      
      {popupMolecule && (
        <Suspense fallback={null}>
          <MoleculePopup molecule={popupMolecule} setMolecule={setPopupMolecule} />
        </Suspense>
      )}
      
      <style>{`
  @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
  
  .animate-fadeIn{animation:fadeIn .5s ease-out}
  .animate-scaleIn{animation:scaleIn .3s ease-out}
  
  
  html,body{overflow-x:hidden!important;max-width:100vw!important;font-size:13px}
  *{box-sizing:border-box!important}
  body,html{line-height:1.4!important}
  h1,h2,h3{line-height:1.4!important}
  ::-webkit-scrollbar{width:8px!important;height:6px!important}
  ::-webkit-scrollbar-track{background:rgba(30,41,59,.5);border-radius:10px}
  ::-webkit-scrollbar-thumb{background:linear-gradient(to bottom,#8b5cf6,#ec4899);border-radius:10px}
  ::-webkit-scrollbar-thumb:hover{background:linear-gradient(to bottom,#7c3aed,#db2777)}
`}</style>
    </div>
  );
};

export default CatalystWorkflowApp;