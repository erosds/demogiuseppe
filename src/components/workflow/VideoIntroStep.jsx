import React from 'react';
import { Play } from 'lucide-react';

const VideoIntroStep = ({ onComplete, showStartOverlay, handleStartExperience }) => {
    return (
        <div className="flex-1 flex items-center justify-center p-6 animate-fadeIn">
            {showStartOverlay && (
                <div className="absolute inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center animate-fadeIn">
                    <div className="flex flex-col items-center justify-center space-y-4 p-8">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 bg-cyan-500/30 blur-3xl animate-pulse" />
                        </div>
                        <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                            HPCvsCO2
                        </h1>
                        <div className="flex justify-center items-center my-4">
                            <img src="images/nttdata-logo.png" alt="NTT Data Logo" className="w-64 h-8 object-contain  transition-transform" />
                        </div>
                        <button
                            onClick={handleStartExperience}
                            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white text-xl font-bold py-4 px-8 rounded-2xl transition-all transform shadow-2xl hover:shadow-cyan-500/50 mt-6"
                        >
                            <span className="flex items-center gap-3">
                                <Play className="w-6 h-6" />
                            </span>
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-5xl w-full space-y-4">
                <h1 className="text-2xl font-bold text-left text-white mb-4">
                    Introduction
                </h1>

                <div className="flex-1 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30 shadow-lg transition-all duration-500  flex flex-col">
                    <div className="text-center space-y-4">
                        <div className="text-xl leading-relaxed text-gray-200 space-y-4">
                            <p>
                                CO₂ can react with certain molecules and materials, allowing it to be <span className="text-cyan-400 font-bold">captured and stored</span> for later reuse. However, this reaction does not occur easily on its own.
                            </p>

                            <p>
                                That’s where specialized molecules called
                                <span className="text-green-400 font-bold"> catalysts</span> come into play: they accelerate the capture process and make it efficient.
                            </p>

                            <p>
                                To discover new catalysts means you would start from existing ones and change their structure one at a time, testing each variation to see if it has the desired properties:
                                a <span className="text-orange-400 font-bold">slow and expensive</span> process.
                            </p>

                            <p>
                                But this is where <span className="text-purple-400 font-bold">AI comes in</span>.
                            </p>
                        </div>


                        <button
                            onClick={onComplete}
                            className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white text-lg hover:scale-105 font-bold py-3 px-8 rounded-xl transition-all transform  shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto mt-6"
                        >
                            Discover the Workflow
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoIntroStep;