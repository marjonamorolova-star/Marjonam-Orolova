import React, { useState, useRef } from 'react';
import { 
  Film, 
  Upload, 
  Play, 
  Pause, 
  RefreshCw, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Image as ImageIcon, 
  Sliders, 
  Video, 
  Layers, 
  Maximize2,
  FileVideo,
  CornerDownLeft,
  Tv,
  Smartphone
} from 'lucide-react';

interface PresetImage {
  id: string;
  name: string;
  path: string;
  desc: string;
}

const PRESET_IMAGES: PresetImage[] = [
  {
    id: 'campus',
    name: 'DTPI Kampus Binosi',
    path: '/src/assets/images/dtpi_denov_campus_1790843370044.jpg',
    desc: 'Bosh ma\'muriyat va zamonaviy o\'quv binolari'
  },
  {
    id: 'cctv',
    name: '104-Auditoriya Darsi',
    path: '/src/assets/images/classroom_cctv_feed_1790839804842.jpg',
    desc: 'Tadbirkorlik darsidagi talabalar va professor'
  },
  {
    id: 'hall',
    name: 'Katta Ma\'ruzaxona',
    path: '/src/assets/images/smart_lecture_hall_1790839823607.jpg',
    desc: 'STEAM va pedagogik amaliyot zali'
  },
  {
    id: 'hq',
    name: 'Institut Bosh Fasadi',
    path: '/src/assets/images/campus_headquarters_1790839843540.jpg',
    desc: 'Kutubxona va rektorat markazi'
  }
];

const SUGGESTED_PROMPTS = [
  "Auditoriyada talabalar jonli harakatda dars tinglamoqda, professor doskaga yozmoqda, kinematik kamera",
  "Institut hovlisida talabalar o'qishga oshiqmoqda, mayin shamol va yorqin quyosh nurlari",
  "Professor talabalar bilan savol-javob qilmoqda, dars muhiti juda faol va ilhomlantiruvchi",
  "Tungi institut binolari va yoritgichlar, sokin zamonaviy universitet manzarasi"
];

export const VeoVideoGenerator: React.FC = () => {
  const [mode, setMode] = useState<'image-to-video' | 'text-to-video'>('image-to-video');
  const [selectedImage, setSelectedImage] = useState<string>(PRESET_IMAGES[0].path);
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(SUGGESTED_PROMPTS[0]);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStatus, setGenerationStatus] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage("Iltimos, rasm fayli (JPEG, PNG, WebP) yuklang.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadedBase64(result);
      setSelectedImage(result);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (preset: PresetImage) => {
    setSelectedImage(preset.path);
    setUploadedBase64(null);
    setErrorMessage(null);
  };

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    setVideoUrl(null);
    setGenerationProgress(10);
    setGenerationStatus("Veo 3 AI modeli ishga tushirilmoqda (veo-3.1-fast-generate-preview)...");

    try {
      let imagePayload: string | undefined = undefined;

      if (mode === 'image-to-video') {
        if (uploadedBase64) {
          imagePayload = uploadedBase64;
        } else {
          // Convert preset local image to base64
          try {
            const resp = await fetch(selectedImage);
            const blob = await resp.blob();
            imagePayload = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
          } catch (e) {
            console.warn("Could not convert preset image to base64, proceeding with prompt:", e);
          }
        }
      }

      setGenerationProgress(25);
      setGenerationStatus("Kadrlar kompozitsiyasi va dinamikasi tahlil qilinmoqda...");

      // 1. Call server endpoint
      const startRes = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageBase64: imagePayload,
          mimeType: 'image/jpeg',
          aspectRatio
        })
      });

      if (!startRes.ok) {
        const errorData = await startRes.json().catch(() => ({}));
        throw new Error(errorData.error || `Server xatosi: ${startRes.status}`);
      }

      const { operationName } = await startRes.json();
      setGenerationProgress(45);
      setGenerationStatus("Veo 3 neyron tarmog'i video sintezini amalga oshirmoqda...");

      // 2. Poll for completion
      let isDone = false;
      let attempts = 0;
      const maxAttempts = 60; // 2 minutes

      while (!isDone && attempts < maxAttempts) {
        attempts++;
        await new Promise((r) => setTimeout(r, 2000));
        
        setGenerationProgress((prev) => Math.min(90, prev + 2));
        setGenerationStatus(`Video render qilinmoqda (${attempts * 2} soniya)...`);

        const statusRes = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName })
        });

        if (statusRes.ok) {
          const statusData = await statusRes.json();
          if (statusData.error) {
            throw new Error(statusData.error.message || "Video generatsiyasi jarayonida xatolik yuz berdi");
          }
          if (statusData.done) {
            isDone = true;
            break;
          }
        }
      }

      if (!isDone) {
        throw new Error("Generatsiya vaqti tugadi. Iltimos, qayta urinib ko'ring.");
      }

      // 3. Download video
      setGenerationProgress(95);
      setGenerationStatus("Video yuklab olinmoqda va tayyorlanmoqda...");

      const downloadRes = await fetch('/api/video-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName })
      });

      if (!downloadRes.ok) {
        throw new Error("Tayyorlangan videoni yuklab olishda xatolik yuz berdi");
      }

      const videoBlob = await downloadRes.blob();
      const objectUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(objectUrl);
      setGenerationProgress(100);
      setGenerationStatus("Video muvaffaqiyatli tayyorlandi!");

    } catch (err: any) {
      console.error("Veo video generation error:", err);
      setErrorMessage(
        err.message || "Video generatsiyasi amalga oshmadi. GEMINI_API_KEY ulanganligini tekshiring."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      
      {/* Title & Model Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex-wrap">
            <Film className="w-4 h-4 text-cyan-400" />
            <span>AI Video Generatsiyasi</span>
            <span>·</span>
            <span className="text-emerald-400 font-mono">Model: veo-3.1-fast-generate-preview</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Rasmni Videoga Aylantirish va Animatsiya Markazi
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            SamDU Denov tadbirkorlik va pedagogika instituti fotosuratlarini Veo 3 orqali jonli videoga aylantiring
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setMode('image-to-video')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              mode === 'image-to-video'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Rasmdan Videoga</span>
          </button>
          <button
            onClick={() => setMode('text-to-video')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              mode === 'text-to-video'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileVideo className="w-3.5 h-3.5" />
            <span>Matndan Videoga</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-3 shadow-lg animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Generatsiyada xatolik yuz berdi:</div>
            <div className="text-slate-300">{errorMessage}</div>
            <div className="text-[11px] text-rose-300 font-mono mt-1">
              Eslatma: Veo 3 modelidan foydalanish uchun AI Studio Secrets panelidan haqiqiy GEMINI_API_KEY o'rnatilgan bo'lishi lozim.
            </div>
          </div>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Selector & Config (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {mode === 'image-to-video' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>1. Jonlantiriladigan Rasmni Tanlang yoki Yuklang:</span>
                </label>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>O'z rasmingizni yuklash</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Main Selected Image Preview */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video shadow-xl group">
                <img
                  src={selectedImage}
                  alt="Tanlangan rasm"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/80 text-cyan-300">
                      Asl kadr
                    </span>
                    <div className="text-sm font-bold mt-1">
                      {uploadedBase64 ? "Yuklangan shaxsiy surat" : "DTPI Denov foto-arxivi"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Preset Thumbnails Carousel */}
              <div className="space-y-1.5">
                <div className="text-[11px] text-slate-400">Institut tayyor kadrlari:</div>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_IMAGES.map((preset) => {
                    const isSelected = selectedImage === preset.path && !uploadedBase64;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`rounded-xl overflow-hidden border p-1 text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500'
                            : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                        }`}
                      >
                        <div className="aspect-video rounded-lg overflow-hidden mb-1">
                          <img
                            src={preset.path}
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-[10px] font-bold text-white truncate">{preset.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Video Aspect Ratio Selector (16:9 vs 9:16) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              2. Video Formati (Aspect Ratio):
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  aspectRatio === '16:9'
                    ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                  <Tv className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xs">16:9 (Landscape)</div>
                  <div className="text-[10px] text-slate-400">Monitor, kompyuter va katta ekranlar</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                  aspectRatio === '9:16'
                    ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xs">9:16 (Portrait)</div>
                  <div className="text-[10px] text-slate-400">Mobil ekranlar, Stories va Shorts</div>
                </div>
              </button>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              3. Animatsiya va Harakat Tasviri (Prompt):
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Qanday harakat yuz bersin? (Masalan: Talabalar doska oldida faol harakatda, sekin kamera harakati)"
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
            />

            {/* Suggested Prompts Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 font-medium py-1">Tavsiyalar:</span>
              {SUGGESTED_PROMPTS.map((sp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(sp)}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  {sp.slice(0, 36)}...
                </button>
              ))}
            </div>
          </div>

          {/* Primary Submit Button */}
          <button
            type="button"
            onClick={handleGenerateVideo}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-xl shadow-cyan-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Veo 3 Video Yaratyapti...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Videoga Aylantirish (Veo 3 · 720p)</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Output Video Player & Status (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Video className="w-4 h-4 text-cyan-400" />
                <span>Generatsiya Qilingan Natija</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">
                {aspectRatio}
              </span>
            </div>

            {/* Video Viewport / Loading State */}
            <div className={`relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center ${
              aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[500px] mx-auto' : 'aspect-video'
            }`}>
              {videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : isGenerating ? (
                <div className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-950/80 border-2 border-cyan-500 border-t-transparent animate-spin mx-auto flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">
                      Veo 3 AI Harakat Modelida
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {generationProgress}% yakunlandi
                    </div>
                    <p className="text-[11px] text-cyan-300 max-w-xs mx-auto mt-2">
                      {generationStatus}
                    </p>
                  </div>
                  {/* Progress bar */}
                  <div className="w-48 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center space-y-3 text-slate-500">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                    <Film className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400">Hozircha video generatsiya qilinmadi</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Chap tomondan rasm tanlang va "Videoga Aylantirish" tugmasini bosing
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Download and Share Button */}
            {videoUrl && (
              <div className="space-y-2 pt-2">
                <a
                  href={videoUrl}
                  download={`EduVision_Veo3_Video_${Date.now()}.mp4`}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>MP4 Videoni Yuklab Olish (720p)</span>
                </a>
              </div>
            )}

            {/* Veo 3 Technical Specs Strip */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-[11px]">
              <div className="text-xs font-bold text-slate-300 mb-1">Veo 3 Xususiyatlari:</div>
              <div className="flex justify-between text-slate-400">
                <span>Model:</span>
                <span className="text-white font-mono">veo-3.1-fast-generate-preview</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Ruxsat etilgan kadr:</span>
                <span className="text-white font-mono">720p HD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Formatlar:</span>
                <span className="text-white font-mono">16:9 (Landscape) & 9:16 (Portrait)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Qo'llab-quvvatlash:</span>
                <span className="text-emerald-400 font-mono">Image-to-Video & Text-to-Video</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
