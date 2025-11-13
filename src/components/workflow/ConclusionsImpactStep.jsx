import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, Zap, DollarSign } from 'lucide-react';

const ConclusionsImpactStep = ({ startNewAnalysis }) => {
    const [counters, setCounters] = useState({
        timeReduction: 0,
        accuracy: 0,
        costSavings: 0,
    });

    const animationStartedRef = useRef(false);

    useEffect(() => {
        if (animationStartedRef.current) return;
        animationStartedRef.current = true;

        const duration = 2000;
        const targetValues = {
            timeReduction: 4.5,
            accuracy: 76,
            costSavings: 50,
        };

        const startTime = performance.now();
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 3);

        const animate = (t) => {
            const elapsed = t - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);

            setCounters({
                timeReduction: (targetValues.timeReduction * eased).toFixed(1),
                accuracy: Math.floor(targetValues.accuracy * eased),
                costSavings: Math.floor(targetValues.costSavings * eased),
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, []);

    return (
        <div className="flex-1 flex flex-col p-3 animate-fadeIn overflow-y-auto justify-center">
            <div className="text-left mb-3 max-w-6xl mx-auto w-full">
                <h3 className="text-3xl font-bold text-white mb-2">Conclusions & Impact</h3>
            </div>

            {/* Riquadro testuale conclusioni */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30 shadow-lg mb-4 mx-auto w-full max-w-6xl">
                <p className="text-gray-200 text-center text-base leading-relaxed mb-3">
                    This project demonstrated how <span className="text-purple-400 font-semibold">AI and Machine Learning</span> can dramatically accelerate the discovery of metal catalysts for CO₂ conversion, reducing time and costs while maintaining high accuracy. We rapidly screened thousands of candidates and identified the most promising ones for laboratory validation.
                </p>
                <p className="text-gray-200 text-center text-base leading-relaxed">
                    This approach is not limited to catalyst discovery. <span className="text-green-400 font-semibold">Major industrial sectors</span> including materials science, pharmaceuticals, and energy are already adopting similar AI-driven methodologies to revolutionize their R&D processes, achieving breakthrough results.
                </p>
            </div>

            {/* Grid 3 card con metriche */}
            <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto w-full mb-4">
                {/* Card 1: Time Reduction */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/50 shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <div className="mb-4 text-center">
                        <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                            {counters.timeReduction}x
                        </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3 text-center">
                        Faster Time-to-Market
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-3 text-center">
                        AI-powered screening reduces catalyst discovery time from months to days, enabling rapid iteration and optimization cycles.
                    </p>

                    <div className="text-xs text-gray-500 font-mono pointer-events-auto items-center justify-center text-center">
                        [<a
                            href="https://www.ukri.org/who-we-are/how-we-are-doing/research-outcomes-and-impact/bbsrc/exscientia-a-clinical-pipeline-for-ai-designed-drug-candidates/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 hover:text-indigo-400 underline transition-colors cursor-pointer"
                        >
                            Exscientia, UKRI 2023
                        </a>]
                    </div>
                </div>

                {/* Card 2: Prediction Accuracy */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-cyan-400/50 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <div className="mb-4 text-center">
                        <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                            {counters.accuracy}%
                        </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3 text-center">
                        Prediction Accuracy
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-3 text-center">
                        Machine learning models achieve high accuracy in predicting molecular properties, comparable to expensive computational methods.
                    </p>

                    <div className="text-xs text-gray-500 font-mono pointer-events-auto items-center justify-center text-center">
                        [<a
                            href="https://www.prescouter.com/2024/05/google-deepmind-alphafold-3/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 hover:text-indigo-400 underline transition-colors cursor-pointer"
                        >
                            AlphaFold 3, DeepMind 2024
                        </a>]
                    </div>
                </div>

                {/* Card 3: Cost Savings */}
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-green-400/50 shadow-lg hover:shadow-green-500/50 transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
                            <DollarSign className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <div className="mb-4 text-center">
                        <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400">
                            {counters.costSavings}%
                        </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3 text-center">
                        Cost Reduction
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-3 text-center">
                        Reduced experimental iterations and computational resources lead to significant cost savings in catalyst development programs.
                    </p>

                    <div className="text-xs text-gray-500 font-mono pointer-events-auto items-center justify-center text-center">
                        [<a
                            href="https://www.hitachi.com/New/cnews/month/2025/08/250819.html" target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-500 hover:text-indigo-400 text-center items-center underline transition-colors"
                        >
                            Hitachi, 2025
                        </a>]
                    </div>
                </div>
            </div>

            <div className="text-center mt-2">
                <button
                    onClick={startNewAnalysis}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-base font-bold py-2 px-5 rounded-xl transition-all transform hover:scale-110 shadow-lg"
                >
                    Start New Analysis
                </button>
            </div>
        </div>
    );
};

export default ConclusionsImpactStep;