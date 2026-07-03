import React, { useState, useEffect, useRef } from "react";
import { SHRUTI_PITCHES } from "../data";
import { ShrutiPitch } from "../types";
import { Play, Square, Volume2, Music, Clock, Circle, Info } from "lucide-react";

export default function PracticeStudio({
  selectedSyllabusPitch,
}: {
  selectedSyllabusPitch?: string;
}) {
  // Shruti Box State
  const [pitches] = useState<ShrutiPitch[]>(SHRUTI_PITCHES);
  const [currentPitch, setCurrentPitch] = useState<ShrutiPitch>(SHRUTI_PITCHES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [droneType, setDroneType] = useState<"Pa" | "Ma">("Pa"); // Sa-Pa-Sa or Sa-Ma-Sa

  // Metronome State
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [tempo, setTempo] = useState(80); // BPM
  const [currentBeat, setCurrentBeat] = useState(0); // 1 to 8 for Adi Thalam

  // Web Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const mainGainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  
  // Metronome Timer Refs
  const metronomeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const metronomeBeatRef = useRef(0);

  // Sync pitch with selected syllabus item if requested
  useEffect(() => {
    if (selectedSyllabusPitch) {
      const matched = pitches.find((p) => p.name.includes(selectedSyllabusPitch));
      if (matched) {
        setCurrentPitch(matched);
      }
    }
  }, [selectedSyllabusPitch, pitches]);

  // Track Practice Duration Automatically
  useEffect(() => {
    if (!isPlaying && !isMetronomeActive) return;

    // Increment today's practice minutes every 6 seconds by 0.1 minutes
    const interval = setInterval(() => {
      const todayStr = new Date().toISOString().split("T")[0];
      const saved = localStorage.getItem("swarohana_practice_logs");
      let logs: Record<string, number> = {};
      
      if (saved) {
        try {
          logs = JSON.parse(saved);
        } catch (e) {
          console.error("Error parsing practice logs:", e);
        }
      }
      
      const currentMin = logs[todayStr] || 0;
      // Increment by 0.1 minutes (~6 seconds of practice)
      logs[todayStr] = Math.round((currentMin + 0.1) * 10) / 10;
      
      localStorage.setItem("swarohana_practice_logs", JSON.stringify(logs));
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, isMetronomeActive]);

  // Handle Shruti Box Play/Pause
  const toggleDrone = () => {
    if (isPlaying) {
      stopDrone();
    } else {
      startDrone();
    }
  };

  const stopDroneInstantly = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {}
    });
    oscillatorsRef.current = [];
    setIsPlaying(false);
  };

  const startDrone = () => {
    try {
      // Ensure AudioContext is created on user gesture
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      stopDroneInstantly(); // Clear any existing oscillators instantly

      // Create main gain node for volume control
      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0, ctx.currentTime);
      mainGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.5); // Smooth fade-in
      mainGain.connect(ctx.destination);
      mainGainNodeRef.current = mainGain;

      const fundFreq = currentPitch.frequency;

      // We will create a rich, lush chorused drone to simulate a realistic wooden Tanpura
      // Oscillators array: [Fundamental, Fifth, Higher Octave, Detuned Fundamental]
      const oscConfigs = [
        // 1. Fundamental Sa (triangle wave for warmth)
        { freq: fundFreq, type: "triangle" as OscillatorType, gain: 0.35, detune: 0 },
        // 2. Detuned Fundamental Sa (for chorusing swirl)
        { freq: fundFreq, type: "sine" as OscillatorType, gain: 0.20, detune: -4 },
        // 3. Drone Fifth (Pa) or Fourth (Ma) (sine wave)
        { freq: droneType === "Pa" ? fundFreq * 1.5 : fundFreq * 1.333, type: "sine" as OscillatorType, gain: 0.25, detune: 2 },
        // 4. Higher Octave Sa' (sine wave)
        { freq: fundFreq * 2, type: "sine" as OscillatorType, gain: 0.20, detune: 0 },
      ];

      // Add a lowpass filter to make the sound mellow and eliminate harsh high frequencies
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(500, ctx.currentTime);
      filter.Q.setValueAtTime(1, ctx.currentTime);
      filter.connect(mainGain);

      const oscList: OscillatorNode[] = [];

      oscConfigs.forEach((cfg) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = cfg.type;
        osc.frequency.setValueAtTime(cfg.freq, ctx.currentTime);
        osc.detune.setValueAtTime(cfg.detune, ctx.currentTime);
        
        oscGain.gain.setValueAtTime(cfg.gain, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        
        osc.start();
        oscList.push(osc);
      });

      oscillatorsRef.current = oscList;
      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to start audio drone:", err);
    }
  };

  const stopDrone = () => {
    // Smooth fade-out before stopping oscillators
    if (mainGainNodeRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      const mainGain = mainGainNodeRef.current;
      
      try {
        mainGain.gain.setValueAtTime(mainGain.gain.value, ctx.currentTime);
        mainGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3); // Fade out over 300ms
      } catch (e) {
        // Fallback if audio context is suspended
        mainGain.gain.setValueAtTime(0, ctx.currentTime);
      }
    }

    const currentOscs = [...oscillatorsRef.current];
    oscillatorsRef.current = [];
    setIsPlaying(false);

    setTimeout(() => {
      currentOscs.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {}
      });
    }, 320);
  };

  // Handle Pitch Change
  const handlePitchChange = (pitch: ShrutiPitch) => {
    setCurrentPitch(pitch);
    if (isPlaying) {
      // Re-trigger drone smoothly with the new pitch
      setTimeout(() => {
        startDrone();
      }, 50);
    }
  };

  // Handle Drone Type Change (Pa vs Ma)
  const handleDroneTypeChange = (type: "Pa" | "Ma") => {
    setDroneType(type);
    if (isPlaying) {
      setTimeout(() => {
        startDrone();
      }, 50);
    }
  };

  // Update volume in real-time
  useEffect(() => {
    if (mainGainNodeRef.current && audioContextRef.current) {
      mainGainNodeRef.current.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.1);
    }
  }, [volume]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      // Stop drone
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {}
      });
      // Stop metronome
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
    };
  }, []);

  // Metronome Sound Synthesis
  const playMetronomeClick = (beatIndex: number) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Adi Thalam beat styles:
    // Beat 1 (Samam / Clap): High pitch accent
    // Beat 5, 7 (Dhrutam Claps): Medium high pitch accent
    // Beat 2, 3, 4, 6, 8 (Fingers / Wave): Low tick pitch
    if (beatIndex === 1) {
      osc.frequency.setValueAtTime(1000, ctx.currentTime); // High pitch
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    } else if (beatIndex === 5 || beatIndex === 7) {
      osc.frequency.setValueAtTime(800, ctx.currentTime); // Medium-high pitch
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    } else {
      osc.frequency.setValueAtTime(500, ctx.currentTime); // Lower pitch
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    }

    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  // Handle Metronome Toggle
  useEffect(() => {
    if (isMetronomeActive) {
      const intervalMs = (60 / tempo) * 1000;
      metronomeBeatRef.current = 1;
      setCurrentBeat(1);
      playMetronomeClick(1);

      metronomeIntervalRef.current = setInterval(() => {
        let nextBeat = metronomeBeatRef.current + 1;
        if (nextBeat > 8) {
          nextBeat = 1;
        }
        metronomeBeatRef.current = nextBeat;
        setCurrentBeat(nextBeat);
        playMetronomeClick(nextBeat);
      }, intervalMs);
    } else {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
      setCurrentBeat(0);
    }

    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
    };
  }, [isMetronomeActive, tempo]);

  // Adi Thalam structure definitions for visuals:
  // Beat 1: Laghu - Clap
  // Beat 2: Laghu - Little finger count
  // Beat 3: Laghu - Ring finger count
  // Beat 4: Laghu - Middle finger count
  // Beat 5: Dhrutam 1 - Clap
  // Beat 6: Dhrutam 1 - Wave / palm flip
  // Beat 7: Dhrutam 2 - Clap
  // Beat 8: Dhrutam 2 - Wave / palm flip
  const getBeatActionName = (beatNum: number) => {
    switch (beatNum) {
      case 1:
        return { label: "Clap (தட்டு)", color: "bg-red-500 text-white" };
      case 2:
        return { label: "Pinky (விரல் - 1)", color: "bg-yellow-500 text-brand-brown-900" };
      case 3:
        return { label: "Ring (விரல் - 2)", color: "bg-yellow-500 text-brand-brown-900" };
      case 4:
        return { label: "Middle (விரல் - 3)", color: "bg-yellow-500 text-brand-brown-900" };
      case 5:
        return { label: "Clap (தட்டு)", color: "bg-orange-500 text-white" };
      case 6:
        return { label: "Wave (வீச்சு)", color: "bg-blue-500 text-white" };
      case 7:
        return { label: "Clap (தட்டு)", color: "bg-orange-500 text-white" };
      case 8:
        return { label: "Wave (வீச்சு)", color: "bg-blue-500 text-white" };
      default:
        return { label: "Ready", color: "bg-gray-100 text-gray-500" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Browser iFrame audio permissions advisory banner */}
      <div className="bg-[#FFFDF9] border border-brand-yellow-200/60 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-brand-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm text-brand-brown-800 leading-relaxed">
          <span className="font-extrabold text-brand-brown-900 block md:inline md:mr-1">🎵 Audio Notice:</span>
          If you don't hear any sound from the Shruthi Box or Metronome, browsers may be blocking audio inside the inline preview frame. Click <strong className="text-brand-yellow-700">"Open in New Tab"</strong> at the top right of the screen to enable full audio playback instantly!
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
      {/* LEFT PANEL: Digital Shruti Box */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-brand-brown-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-yellow-500 flex items-center justify-center text-brand-brown-900">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-brown-900">Digital Shruti Box</h3>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">ஸ்வர ஸ்ருதி பெட்டி</p>
            </div>
          </div>

          {/* Meditative Visualizer circle */}
          <div className="relative h-48 flex items-center justify-center mb-8">
            <div
              className={`absolute w-36 h-36 rounded-full bg-brand-yellow-100 transition-all duration-300 ${
                isPlaying ? "animate-tanpura-wave" : "scale-90 opacity-40"
              }`}
            ></div>
            <div
              className={`absolute w-28 h-28 rounded-full bg-brand-yellow-500 flex flex-col items-center justify-center text-brand-brown-900 shadow-md transition-all duration-300 ${
                isPlaying ? "scale-105" : ""
              }`}
            >
              <span className="font-serif text-3xl font-extrabold">{currentPitch.label}</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-brown-700 mt-1">
                {currentPitch.name.split(" ")[0]}
              </span>
            </div>
          </div>

          {/* Pitch selection grid */}
          <div className="space-y-4">
            <label className="text-xs font-semibold text-brand-brown-500 uppercase tracking-wider block">
              Select Tonic Pitch (கட்டை தேர்வு)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {pitches.map((pitch) => (
                <button
                  key={pitch.name}
                  onClick={() => handlePitchChange(pitch)}
                  className={`py-2 text-xs font-semibold rounded-xl transition-all ${
                    currentPitch.name === pitch.name
                      ? "bg-brand-brown-900 text-brand-yellow-500 shadow-sm"
                      : "bg-brand-brown-50 hover:bg-brand-brown-100 text-brand-brown-800"
                  }`}
                >
                  <div className="font-bold">{pitch.label}</div>
                  <div className="text-[9px] opacity-70 mt-0.5">
                    {pitch.name.split(" ")[1] ? pitch.name.split(" ")[1].replace("(", "").replace(")", "") : ""}
                  </div>
                </button>
              ))}
            </div>

            {/* Drone drone settings (Sa-Pa vs Sa-Ma) */}
            <div className="flex gap-4 pt-2">
              <div className="flex-1">
                <label className="text-xs font-semibold text-brand-brown-500 uppercase tracking-wider block mb-2">
                  Drone Mode
                </label>
                <div className="bg-brand-brown-50 p-1 rounded-xl flex gap-1">
                  <button
                    onClick={() => handleDroneTypeChange("Pa")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      droneType === "Pa"
                        ? "bg-white text-brand-brown-900 shadow-xs"
                        : "text-gray-500 hover:text-brand-brown-900"
                    }`}
                  >
                    Sa - Pa - Sa (ச - ப - ச)
                  </button>
                  <button
                    onClick={() => handleDroneTypeChange("Ma")}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      droneType === "Ma"
                        ? "bg-white text-brand-brown-900 shadow-xs"
                        : "text-gray-500 hover:text-brand-brown-900"
                    }`}
                  >
                    Sa - Ma - Sa (ச - ம - ச)
                  </button>
                </div>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-4 pt-4 border-t border-brand-brown-100">
              <Volume2 className="w-4 h-4 text-brand-brown-500 flex-shrink-0" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-brand-brown-100 rounded-lg appearance-none cursor-pointer accent-brand-brown-900"
              />
              <span className="text-xs font-mono font-bold text-brand-brown-600 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Master Play Button */}
        <button
          onClick={toggleDrone}
          className={`w-full mt-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            isPlaying
              ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100"
              : "bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white shadow-lg shadow-brand-brown-100/40"
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-5 h-5 fill-current" /> Stop Shruthi (ஸ்ருதி நிறுத்து)
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" /> Start Shruthi (ஸ்ருதி தொடங்கு)
            </>
          )}
        </button>
      </div>

      {/* RIGHT PANEL: Adi Thalam Metronome / Laya Trainer */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-brand-brown-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-brown-900">Adi Thala Meter</h3>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">ஆதி தாள கால அளவி</p>
              </div>
            </div>
            {isMetronomeActive && (
              <span className="animate-pulse bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                Active
              </span>
            )}
          </div>

          {/* Interactive Thala beats layout (8 counts of Adi Thalam) */}
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-8 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((beatNum) => {
                const isActive = currentBeat === beatNum;
                const beatAction = getBeatActionName(beatNum);
                return (
                  <div key={beatNum} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-extrabold border-2 transition-all duration-100 ${
                        isActive
                          ? `${beatAction.color} border-transparent scale-110 shadow-md`
                          : "bg-white border-brand-brown-50 text-brand-brown-400"
                      }`}
                    >
                      {beatNum}
                    </div>
                    {/* Tiny labels underneath */}
                    <div className="text-[8px] font-semibold uppercase text-gray-400 mt-1">
                      {beatNum <= 4 ? "Laghu" : beatNum <= 6 ? "Dhrutam 1" : "Dhrutam 2"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current Beat Action Card */}
            <div className="bg-brand-brown-50 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-brand-brown-500 uppercase tracking-widest">
                  Current Beat Action
                </span>
                <div className="font-serif text-xl font-bold text-brand-brown-900 mt-0.5">
                  {currentBeat > 0 ? getBeatActionName(currentBeat).label : "Tap Play to begin Adi Thalam"}
                </div>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((b) => (
                  <Circle
                    key={b}
                    className={`w-2.5 h-2.5 ${
                      currentBeat === b ? "text-amber-500 fill-amber-500 animate-ping" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Tempo Slider (BPM) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-brand-brown-500 uppercase tracking-wider">
                <span>Practice Tempo (வேகம்)</span>
                <span className="text-brand-brown-900 font-bold font-mono">{tempo} BPM</span>
              </div>
              <input
                type="range"
                min="50"
                max="140"
                step="1"
                value={tempo}
                onChange={(e) => setTempo(parseInt(e.target.value))}
                className="w-full h-1.5 bg-brand-brown-100 rounded-lg appearance-none cursor-pointer accent-brand-brown-900"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                <span>Chowka Kalam (Slow - 50)</span>
                <span>Madhyama Kalam (Med - 90)</span>
                <span>Dhuritha Kalam (Fast - 140)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metronome Control Button */}
        <button
          onClick={() => {
            try {
              if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
              }
              const ctx = audioContextRef.current;
              if (ctx.state === "suspended") {
                ctx.resume();
              }
            } catch (err) {
              console.error("Failed to initialize audio on metronome click:", err);
            }
            setIsMetronomeActive(!isMetronomeActive);
          }}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            isMetronomeActive
              ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100"
              : "bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white shadow-lg shadow-brand-brown-100/40"
          }`}
        >
          {isMetronomeActive ? (
            <>
              <Square className="w-5 h-5 fill-current" /> Stop Thalam (தாளம் நிறுத்து)
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" /> Start Thalam (தாளம் தொடங்கு)
            </>
          )}
        </button>
      </div>
    </div>
    </div>
  );
}
