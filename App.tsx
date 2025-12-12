import React, { useState, useRef, useEffect } from 'react';
import { Upload, Zap, Download, Crosshair, Sparkles, AlertCircle, Key, Lock } from 'lucide-react';
import { CHARACTERS } from './constants';
import { generateCosplayImage } from './services/gemini';

export default function TowerFallApp() {
  // State for App Logic
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [character, setCharacter] = useState(CHARACTERS[0]);
  const [pose, setPose] = useState('Aiming bow ready to fire');
  const [bg, setBg] = useState('Dark dungeon stone wall');
  const [hairStyleMode, setHairStyleMode] = useState('character');
  
  // State for API Key Logic
  const [isKeyReady, setIsKeyReady] = useState(false);
  const [checkingKey, setCheckingKey] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for API Key on Mount
  useEffect(() => {
    const checkKey = async () => {
      try {
        const aiStudio = (window as any).aistudio;
        if (aiStudio) {
          const hasKey = await aiStudio.hasSelectedApiKey();
          setIsKeyReady(hasKey);
        } else {
          // If not in AI Studio (e.g., local or deployed elsewhere), assume env var is set
          setIsKeyReady(true);
        }
      } catch (e) {
        console.error("Error checking API key status:", e);
        setIsKeyReady(true); // Fallback to allow app to render if check fails
      } finally {
        setCheckingKey(false);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio) {
      try {
        await aiStudio.openSelectKey();
        // Optimistically set true to mitigate race condition
        setIsKeyReady(true);
        setError(null);
      } catch (e) {
        console.error("Error selecting key:", e);
      }
    }
  };

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const url = URL.createObjectURL(selected);
      setFile(selected);
      setPreviewUrl(url);
      setGeneratedImage(null);
      setError(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // AI Generation
  const handleGenerate = async () => {
    if (!file) return;
    setLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const resultBase64 = await generateCosplayImage(file, character, pose, bg, hairStyleMode);
      if (resultBase64) {
        setGeneratedImage(resultBase64);
      } else {
        throw new Error("Failed to generate image data.");
      }
    } catch (err: any) {
      console.error(err);
      
      // Handle missing/invalid key errors from Gemini
      const errorMsg = err.message || JSON.stringify(err);
      if (errorMsg.includes("Requested entity was not found") || errorMsg.includes("PERMISSION_DENIED") || errorMsg.includes("403")) {
         setError("Permission denied. Please reconnect your API Key.");
         setIsKeyReady(false); // Reset key state to force re-selection
      } else {
         setError(err.message || "An unexpected error occurred during generation.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `towervalla-${character.id}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // --- RENDER KEY SELECTION SCREEN ---
  if (!isKeyReady && !checkingKey) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6">
          
          <div className="mx-auto w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
             <Lock className="text-emerald-400" size={32} />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white mb-2">
              TOWER<span className="text-emerald-500">VALLA</span>
            </h1>
            <p className="text-slate-400 text-sm tracking-widest uppercase">Authentication Required</p>
          </div>

          <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 text-sm text-slate-300 leading-relaxed">
             <p>To use the Archer Generator, you must connect a valid Google Cloud Project or API Key.</p>
          </div>

          <button 
            onClick={handleSelectKey}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20"
          >
            <Key size={20} /> Connect API Key
          </button>
          
          <div className="text-[10px] text-slate-600">
             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-slate-400">
               Billing information & details
             </a>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER MAIN APP ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans flex flex-col items-center selection:bg-slate-700 selection:text-white">
      
      {/* Header */}
      <div className="max-w-7xl w-full mb-8 flex items-end justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            TOWER<span className={`transition-colors duration-500 ${character.theme.titleSpan}`}>VALLA</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1 tracking-widest uppercase">Archer Generator</p>
        </div>
        <div className="hidden md:block text-right">
           <div className="text-xs text-slate-500 font-mono">SYSTEM STATUS</div>
           <div className="text-xs text-green-400 flex items-center gap-1 justify-end">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> ONLINE
           </div>
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN - CONTROLS */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Upload */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 backdrop-blur-sm transition-all hover:border-slate-700">
            <h2 className={`text-xs font-bold uppercase mb-4 tracking-wider flex items-center gap-2 ${character.theme.text}`}>
              <Upload size={16} /> 1. Upload Source Identity
            </h2>
            <div className="relative group w-full h-40 cursor-pointer" onClick={triggerFileInput}>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className={`w-full h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-300 overflow-hidden relative ${previewUrl ? 'border-transparent' : 'border-slate-700 group-hover:border-slate-500 bg-slate-800/30'}`}>
                {previewUrl ? (
                  <>
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">Change Image</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-slate-500 group-hover:text-slate-300">
                    <div className="bg-slate-800 p-3 rounded-full inline-block mb-2 shadow-lg">
                      <Sparkles size={20} />
                    </div>
                    <p className="text-sm font-medium">Click to upload photo</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. Character Select (Scrollable Grid) */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 backdrop-blur-sm">
            <h2 className={`text-xs font-bold uppercase mb-4 tracking-wider flex items-center gap-2 ${character.theme.text}`}>
              <Crosshair size={16} /> 2. Select Archetype
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {CHARACTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCharacter(c)}
                  className={`flex flex-col items-center gap-2 p-2 rounded-lg border transition-all text-center group outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-900 relative overflow-hidden ${
                    character.id === c.id 
                    ? `bg-slate-800 ${c.theme.border} ring-1 ${c.theme.ring} ${c.theme.text}` 
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  {/* Highlight bar for active state */}
                  {character.id === c.id && (
                     <div className={`absolute top-0 left-0 w-full h-1 ${c.theme.bg}`}></div>
                  )}
                  
                  <div className={`rounded-full transition-colors mt-1 overflow-hidden w-10 h-10 flex items-center justify-center ${character.id === c.id ? `ring-2 ${c.theme.ring}` : 'bg-slate-800'}`}>
                    {c.imageUrl ? (
                      <img 
                        src={c.imageUrl} 
                        alt={c.name} 
                        className="w-full h-full object-cover scale-150"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }} 
                      />
                    ) : (
                      <div className={character.id === c.id ? 'text-white' : 'text-slate-500'}>{c.icon}</div>
                    )}
                  </div>
                  <div className="flex flex-col w-full items-center">
                    <span className={`text-[10px] font-bold uppercase leading-tight text-center w-full ${character.id === c.id ? 'text-white' : ''}`}>{c.name}</span>
                    <span className={`text-[9px] truncate w-full opacity-70`}>{c.archetype}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="text-[10px] text-slate-600 text-center mt-2 italic">
              Scroll to see all 18 archer variants
            </div>
          </div>

          {/* 3. Customize */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 backdrop-blur-sm space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                 <label className="text-xs text-slate-500 block mb-1 uppercase font-bold tracking-wider">Combat Stance</label>
                 <select 
                  value={pose} 
                  onChange={(e) => setPose(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs focus:border-white focus:ring-1 focus:ring-white outline-none transition-colors hover:border-slate-600 text-slate-300 cursor-pointer"
                 >
                   <option>Aiming bow ready to fire</option>
                   <option>Standing victorious</option>
                   <option>Crouching stealthy</option>
                   <option>Jumping shot</option>
                   <option>Dodging an arrow</option>
                 </select>
               </div>
               <div>
                 <label className="text-xs text-slate-500 block mb-1 uppercase font-bold tracking-wider">Environment</label>
                 <select 
                  value={bg} 
                  onChange={(e) => setBg(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs focus:border-white focus:ring-1 focus:ring-white outline-none transition-colors hover:border-slate-600 text-slate-300 cursor-pointer"
                 >
                   <option>Dark dungeon</option>
                   <option>Magical forest</option>
                   <option>Throne room</option>
                   <option>Tower rooftop</option>
                   <option>Lava cavern</option>
                   <option>Pirate ship</option>
                   <option>Studio grey</option>
                 </select>
               </div>
               <div>
                 <label className="text-xs text-slate-500 block mb-1 uppercase font-bold tracking-wider">Hairstyle Source</label>
                 <select 
                  value={hairStyleMode} 
                  onChange={(e) => setHairStyleMode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs focus:border-white focus:ring-1 focus:ring-white outline-none transition-colors hover:border-slate-600 text-slate-300 cursor-pointer"
                 >
                   <option value="character">Match Character</option>
                   <option value="user">Keep My Hair</option>
                   <option value="blend">Blend Both</option>
                 </select>
               </div>
             </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={!file || loading}
            className={`w-full py-4 rounded-xl font-bold text-lg tracking-wider flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r shadow-lg disabled:transform-none disabled:opacity-70 ${
              !file || loading 
              ? 'from-slate-800 to-slate-800 text-slate-600 cursor-not-allowed shadow-none' 
              : `${character.theme.buttonGradient} ${character.theme.shadow} text-white`
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                PROCESSING...
              </span>
            ) : (
              <><Zap size={20} className="fill-current" /> GENERATE</>
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg flex items-start gap-2 text-red-300 text-sm animate-fade-in">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <p>{error}</p>
              {error.includes("Permission denied") && (window as any).aistudio && (
                 <button onClick={handleSelectKey} className="ml-auto underline text-xs font-bold hover:text-white">
                    FIX
                 </button>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - PREVIEW */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[500px] lg:h-auto gap-4">
          <div className="flex-grow bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center shadow-2xl min-h-[500px] lg:min-h-0">
            
            {/* Scanline Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>
            
            {/* Corner Accents */}
            <div className={`absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 ${character.theme.border} opacity-50`}></div>
            <div className={`absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 ${character.theme.border} opacity-50`}></div>
            <div className={`absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 ${character.theme.border} opacity-50`}></div>
            <div className={`absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 ${character.theme.border} opacity-50`}></div>

            {loading ? (
              <div className="text-center z-20 space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                   <div className={`absolute inset-0 rounded-full border-4 border-slate-800 border-t-slate-200 animate-spin`}></div>
                   <div className={`absolute inset-3 rounded-full border-4 border-slate-800 border-b-slate-200 animate-spin reverse`}></div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white tracking-widest animate-pulse">GENERATING</h3>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Applying {character.name} Matrix...</p>
                </div>
              </div>
            ) : generatedImage ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black p-1 group">
                <img 
                  src={generatedImage} 
                  alt="Generated Cosplay" 
                  className="max-w-full max-h-full object-contain shadow-2xl"
                />
                {/* Image Overlay Actions */}
                 <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end z-30">
                    <button 
                      onClick={handleDownload}
                      className="bg-white text-black hover:bg-slate-200 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
                    >
                      <Download size={16} /> Save Image
                    </button>
                 </div>
              </div>
            ) : (
              <div className="text-center opacity-30 z-20 max-w-sm px-6">
                <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Crosshair size={32} className="text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-400 mb-2 uppercase tracking-widest">Awaiting Input</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Select one of the 18 archers from the roster to begin your transformation.
                </p>
              </div>
            )}
          </div>
          
          {/* Footer Status Bar */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex justify-between items-center text-xs">
             <div className="flex items-center gap-4 text-slate-500">
               <span>GEMINI-2.5-FLASH-IMAGE</span>
               <span className="hidden sm:inline">|</span>
               <span>{character.name.toUpperCase()}</span>
             </div>
             <div className={`${generatedImage ? character.theme.text : 'text-slate-600'} font-mono font-bold uppercase tracking-wider`}>
               {generatedImage ? 'RENDER COMPLETE' : 'READY'}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}