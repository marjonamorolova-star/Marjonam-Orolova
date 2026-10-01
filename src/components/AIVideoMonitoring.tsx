import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  ScanFace, 
  BrainCircuit, 
  PhoneOff, 
  Activity, 
  Sparkles, 
  Play, 
  Pause, 
  RefreshCw, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  Volume2, 
  Users, 
  Send, 
  Eye,
  Grid,
  Maximize2,
  ZoomIn,
  ZoomOut,
  FileText,
  Clock,
  Video,
  Film
} from 'lucide-react';
import { Auditorium, BoundingBox } from '../types';
import { AUDITORIUMS_DATA } from '../data/mockData';

interface AIVideoMonitoringProps {
  onNotify?: (message: string) => void;
  onOpenVeo?: () => void;
}

export const AIVideoMonitoring: React.FC<AIVideoMonitoringProps> = ({ onNotify, onOpenVeo }) => {
  const [selectedAuditoriumId, setSelectedAuditoriumId] = useState<string>('aud-104');
  const [viewMode, setViewMode] = useState<'single' | 'multiview'>('single');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showFaceBoxes, setShowFaceBoxes] = useState<boolean>(true);
  const [showAttentionBoxes, setShowAttentionBoxes] = useState<boolean>(true);
  const [showPhoneAlerts, setShowPhoneAlerts] = useState<boolean>(true);
  const [showTeacherBox, setShowTeacherBox] = useState<boolean>(true);
  const [selectedBox, setSelectedBox] = useState<BoundingBox | null>(null);
  const [simulatedFps, setSimulatedFps] = useState<number>(28);
  const [speechAcousticLevel, setSpeechAcousticLevel] = useState<number>(72);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(85);
  const [showAIReportModal, setShowAIReportModal] = useState<boolean>(false);
  const [timelinePosition, setTimelinePosition] = useState<number>(45); // 0 - 100%

  const currentAuditorium = AUDITORIUMS_DATA.find(a => a.id === selectedAuditoriumId) || AUDITORIUMS_DATA[0];

  // Subtle live telemetry fluctuation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSimulatedFps(prev => Math.min(30, Math.max(24, prev + (Math.random() > 0.5 ? 1 : -1))));
      setSpeechAcousticLevel(prev => Math.min(88, Math.max(56, prev + Math.floor(Math.random() * 7 - 3))));
      setTimelinePosition(prev => (prev >= 98 ? 10 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSendToHemis = () => {
    const msg = `${currentAuditorium.name} bo'yicha ${currentAuditorium.studentsPresent} nafar talabaning yuz orqali davomati HEMIS tizimiga muvaffaqiyatli uzatildi!`;
    setActionFeedback(msg);
    if (onNotify) onNotify(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleTriggerPhoneAlert = () => {
    const msg = `OGOHLANTIRISH: ${currentAuditorium.code} auditoriyasida smartfondan ruxsatsiz foydalanish holati qayd etildi va dekanatga yuborildi!`;
    setActionFeedback(msg);
    if (onNotify) onNotify(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleExportAttendance = () => {
    const csvContent = `Talaba,Holati,Diqqat,Auditoriya,Vaqt\nJasur Saidov,Darsda,91%,${currentAuditorium.code},08:30:12\nShahlo Qosimova,Darsda,96%,${currentAuditorium.code},08:30:15\nDilshod Rasulov,Darsda (Telefon),61%,${currentAuditorium.code},08:31:00\nMadina Aliyeva,Darsda,89%,${currentAuditorium.code},08:30:20`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `EduVision_Davomat_${currentAuditorium.code}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setActionFeedback("Davomat ro'yxati CSV formatida yuklab olindi!");
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleTakeSnapshot = () => {
    setActionFeedback(`Kameradan yuqori aniqlikdagi kadr saqlandi: ${currentAuditorium.code}_1080p_snapshot.png`);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  const visibleBoxes = currentAuditorium.boxes.filter(box => {
    if (box.confidence * 100 < confidenceThreshold) return false;
    if (box.type === 'face' && !showFaceBoxes) return false;
    if (box.type === 'attention' && !showAttentionBoxes) return false;
    if (box.type === 'phone' && !showPhoneAlerts) return false;
    if (box.type === 'teacher' && !showTeacherBox) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      {/* Module Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1 flex-wrap">
            <Camera className="w-4 h-4" />
            <span>AI & Video Analitika Moduli</span>
            <span>·</span>
            <span className="text-emerald-400">SamDU Denov Tadbirkorlik va Pedagogika Instituti</span>
            <span>·</span>
            <span>24/7 jonli tahlil</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Auditoriya Jonli Monitoringi va Sun'iy Intellekt Tahlili
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Multiview vs Single View Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setViewMode('single')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                viewMode === 'single' ? 'bg-purple-950 text-purple-300 font-semibold border border-purple-800/60' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Fokus</span>
            </button>
            <button
              onClick={() => setViewMode('multiview')}
              className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                viewMode === 'multiview' ? 'bg-purple-950 text-purple-300 font-semibold border border-purple-800/60' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>4-Kamera</span>
            </button>
          </div>

          {onOpenVeo && (
            <button
              onClick={onOpenVeo}
              className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-purple-900/80 to-indigo-900/80 border border-purple-600/80 hover:from-purple-800 hover:to-indigo-800 text-purple-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Kadrni Veo 3 orqali jonli videoga aylantirish"
            >
              <Film className="w-3.5 h-3.5 text-purple-400" />
              <span>Videoga aylantir (Veo 3)</span>
            </button>
          )}

          <button
            onClick={() => setShowAIReportModal(true)}
            className="px-3 py-1.5 text-xs font-medium bg-purple-950/60 border border-purple-700/60 hover:bg-purple-900/60 text-purple-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Dars Xulosasi</span>
          </button>
          <button
            onClick={handleSendToHemis}
            className="px-3 py-1.5 text-xs font-medium bg-emerald-950/60 border border-emerald-700/60 hover:bg-emerald-900/60 text-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>HEMIS ga uzatish</span>
          </button>
          <button
            onClick={handleTriggerPhoneAlert}
            className="px-3 py-1.5 text-xs font-medium bg-rose-950/60 border border-rose-700/60 hover:bg-rose-900/60 text-rose-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Qoidabuzarlik qayd etish</span>
          </button>
          <button
            onClick={handleExportAttendance}
            className="px-3 py-1.5 text-xs font-medium bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Davomat CSV</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {actionFeedback && (
        <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-200 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* MULTIVIEW MODE (4 Cameras simultaneously) */}
      {viewMode === 'multiview' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Universitet Barcha Auditoriyalari Multiview Mozaikasi (4 ta asosiy oqim)</span>
            <span className="font-mono text-emerald-400">● 4/4 KAMERA AKTIV</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AUDITORIUMS_DATA.map(aud => (
              <div
                key={aud.id}
                onClick={() => {
                  setSelectedAuditoriumId(aud.id);
                  setViewMode('single');
                }}
                className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-purple-600 transition-all cursor-pointer group shadow-lg"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={aud.imageSrc}
                    alt={aud.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />

                  {/* Top Bar */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-950/90 text-rose-400 font-bold border border-rose-900/60 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      <span>{aud.code}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950/90 text-slate-300">
                      {aud.fps} FPS · 1080p
                    </span>
                  </div>

                  {/* Bottom Bar */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white truncate max-w-[200px]">{aud.currentSubject}</div>
                      <div className="text-[10px] text-slate-400">{aud.teacher}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-mono font-bold">{aud.focusIndex}% diqqat</div>
                      <div className="text-[10px] text-emerald-400 font-mono">{aud.studentsPresent}/{aud.totalStudents} talaba</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* SINGLE FOCUSED VIEW */
        <>
          {/* Auditorium Selection Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {AUDITORIUMS_DATA.map(aud => {
              const isSelected = aud.id === selectedAuditoriumId;
              return (
                <button
                  key={aud.id}
                  onClick={() => {
                    setSelectedAuditoriumId(aud.id);
                    setSelectedBox(null);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-left transition-all border whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/50 border-purple-600/70 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold">{aud.code}</span>
                    <span className="text-[10px] font-mono text-emerald-400">● LIVE</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-medium truncate max-w-[200px] mt-0.5">
                    {aud.currentSubject}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {aud.teacher} · {aud.studentsPresent}/{aud.totalStudents} talaba
                  </div>
                </button>
              );
            })}
          </div>

          {/* Video Viewport & Telemetry Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Column: Live Video Canvas (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
                
                {/* Camera Feed Image with PTZ Zoom */}
                <div 
                  className="relative aspect-video w-full overflow-hidden bg-slate-900"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <img
                    src={currentAuditorium.imageSrc}
                    alt={currentAuditorium.name}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Video Scanline Effect & Overlay tint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                  {/* Bounding Boxes Layer */}
                  {isPlaying && visibleBoxes.map((box) => {
                    const isSelected = selectedBox?.id === box.id;
                    let borderColor = 'border-emerald-400 bg-emerald-500/10 text-emerald-300';
                    if (box.type === 'phone' || box.status === 'alert') {
                      borderColor = 'border-rose-500 bg-rose-500/20 text-rose-300 animate-pulse';
                    } else if (box.type === 'attention') {
                      borderColor = 'border-cyan-400 bg-cyan-500/10 text-cyan-300';
                    } else if (box.type === 'teacher') {
                      borderColor = 'border-purple-400 bg-purple-500/10 text-purple-300';
                    }

                    return (
                      <div
                        key={box.id}
                        onClick={() => setSelectedBox(box)}
                        style={{
                          left: `${box.x}%`,
                          top: `${box.y}%`,
                          width: `${box.w}%`,
                          height: `${box.h}%`
                        }}
                        className={`absolute border-2 rounded-sm cursor-pointer transition-all duration-200 z-20 flex flex-col justify-between p-1 ${borderColor} ${
                          isSelected ? 'ring-2 ring-white scale-[1.02]' : ''
                        }`}
                      >
                        {/* Top Tag Label */}
                        <div className="flex items-center justify-between text-[9px] font-mono font-semibold px-1 py-0.5 rounded bg-slate-950/90 max-w-full truncate">
                          <span className="truncate">{box.label}</span>
                          <span className="ml-1 opacity-80">{Math.round(box.confidence * 100)}%</span>
                        </div>

                        {/* Bottom Status Indicator */}
                        <div className="text-[8px] font-mono px-1 py-0.5 rounded bg-slate-950/90 truncate self-start text-slate-300">
                          {box.type === 'phone' ? '⚠️ SMARTFON' : box.type === 'teacher' ? 'O\'QITUVCHI' : box.type === 'attention' ? 'DIQQAT' : 'DAVOMAT'}
                        </div>
                      </div>
                    );
                  })}

                  {/* Top Video HUD Info */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs z-30 pointer-events-none">
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 font-mono">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span className="font-semibold text-rose-400">REC</span>
                      <span>·</span>
                      <span>{currentAuditorium.code}</span>
                      <span>·</span>
                      <span>CAM-01 [WIDE]</span>
                    </div>

                    <div className="flex items-center gap-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 font-mono tabular-nums">
                      <span>FPS: <strong className="text-white">{simulatedFps}</strong></span>
                      <span>Kechikish: <strong className="text-emerald-400">42ms</strong></span>
                      <span>1080p AI</span>
                    </div>
                  </div>

                  {/* Bottom Video Controls Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs z-30">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1.5 rounded-md bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 transition-colors cursor-pointer"
                        title={isPlaying ? "Pauza" : "Davom ettirish"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <div className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-300 text-xs font-medium">
                        {currentAuditorium.currentSubject}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-md p-1">
                        <button
                          onClick={() => setZoomLevel(prev => Math.max(1.0, prev - 0.25))}
                          className="p-1 hover:text-white text-slate-400"
                          title="Kichraytirish"
                        >
                          <ZoomOut className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] font-mono px-1">{zoomLevel.toFixed(1)}x</span>
                        <button
                          onClick={() => setZoomLevel(prev => Math.min(2.0, prev + 0.25))}
                          className="p-1 hover:text-white text-slate-400"
                          title="Kattalashtirish"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={handleTakeSnapshot}
                        className="p-1.5 rounded-md bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 transition-colors cursor-pointer"
                        title="Kadr olish"
                      >
                        <Camera className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs text-slate-300 font-mono tabular-nums">
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{speechAcousticLevel} dB</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lesson Timeline Scrubber with Event Bookmarks */}
                <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>Dars vaqti: 08:30 — 09:50 (48-daqiqa o'tdi)</span>
                    </span>
                    <span className="text-slate-300">{timelinePosition}% tugallandi</span>
                  </div>

                  <div className="relative w-full h-2 bg-slate-800 rounded-full cursor-pointer overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${timelinePosition}%` }}
                    />
                  </div>

                  {/* Bookmarks */}
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-0.5">
                    <span>08:30 Kirish</span>
                    <span className="text-rose-400 font-bold">● 08:48 Smartfon</span>
                    <span className="text-emerald-400">● 09:12 Savol-javob</span>
                    <span>09:50 Xulosa</span>
                  </div>
                </div>

                {/* AI Layer Toggle Checklist & Sensitivity Slider */}
                <div className="p-3 bg-slate-900/90 border-t border-slate-800 space-y-2.5 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <Sliders className="w-3.5 h-3.5 text-purple-400" />
                      <span>AI Qatlamlari:</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer text-emerald-300">
                        <input
                          type="checkbox"
                          checked={showFaceBoxes}
                          onChange={(e) => setShowFaceBoxes(e.target.checked)}
                          className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
                        />
                        <ScanFace className="w-3.5 h-3.5" />
                        <span>Davomat (Face ID)</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer text-cyan-300">
                        <input
                          type="checkbox"
                          checked={showAttentionBoxes}
                          onChange={(e) => setShowAttentionBoxes(e.target.checked)}
                          className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                        />
                        <BrainCircuit className="w-3.5 h-3.5" />
                        <span>Diqqat darajasi</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer text-rose-300">
                        <input
                          type="checkbox"
                          checked={showPhoneAlerts}
                          onChange={(e) => setShowPhoneAlerts(e.target.checked)}
                          className="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0"
                        />
                        <PhoneOff className="w-3.5 h-3.5" />
                        <span>Telefon ishlatish</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer text-purple-300">
                        <input
                          type="checkbox"
                          checked={showTeacherBox}
                          onChange={(e) => setShowTeacherBox(e.target.checked)}
                          className="rounded bg-slate-800 border-slate-700 text-purple-500 focus:ring-0"
                        />
                        <Activity className="w-3.5 h-3.5" />
                        <span>O'qituvchi faolligi</span>
                      </label>
                    </div>
                  </div>

                  {/* Sensitivity Slider */}
                  <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-800/60 text-slate-400 text-[11px]">
                    <span>AI Aniqlash Bo'sag'asi (Confidence threshold):</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="60"
                        max="98"
                        value={confidenceThreshold}
                        onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                        className="w-28 accent-cyan-400 cursor-pointer"
                      />
                      <span className="font-mono text-cyan-300 font-bold">{confidenceThreshold}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Detection Detail Box */}
              {selectedBox && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      <span className="text-sm font-bold text-white">{selectedBox.label}</span>
                      <span className="text-xs font-mono text-slate-400">Ishonchlilik: {Math.round(selectedBox.confidence * 100)}%</span>
                    </div>
                    <button
                      onClick={() => setSelectedBox(null)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Yopish
                    </button>
                  </div>
                  <p className="text-xs text-slate-300">{selectedBox.detail}</p>
                </div>
              )}
            </div>

            {/* Right Column: Real-time Telemetry & KPIs (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Davomat</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-1 font-mono tabular-nums">
                    {currentAuditorium.studentsPresent} <span className="text-sm font-normal text-slate-400">/ {currentAuditorium.totalStudents}</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-0.5 font-medium">
                    {Math.round((currentAuditorium.studentsPresent / currentAuditorium.totalStudents) * 100)}% ishtirok etmoqda
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Diqqat Indeksi</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-1 font-mono tabular-nums">
                    {currentAuditorium.focusIndex}%
                  </div>
                  <div className="text-[11px] text-cyan-400 mt-0.5 font-medium">
                    Auditoriya to'liq jalb qilingan
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <PhoneOff className="w-3.5 h-3.5 text-rose-400" />
                    <span>Smartfon Qaydlar</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-1 font-mono tabular-nums">
                    {currentAuditorium.phonesDetected} <span className="text-sm font-normal text-slate-400">holat</span>
                  </div>
                  <div className="text-[11px] text-rose-400 mt-0.5 font-medium">
                    {currentAuditorium.phonesDetected > 0 ? "Chalg'ish qayd etildi" : "Qoidabuzarlik yo'q"}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Dars Sifati</span>
                  </div>
                  <div className="text-2xl font-bold text-white mt-1 font-mono tabular-nums">
                    {currentAuditorium.qualityScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
                  </div>
                  <div className="text-[11px] text-purple-400 mt-0.5 font-medium">
                    A'lo darajadagi leksiya
                  </div>
                </div>
              </div>

              {/* Teacher Activity Card */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">O'qituvchi Faolligi Tahlili</span>
                  <span className="text-purple-400 font-mono">94% faol</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Auditoriya bo'ylab harakat</span>
                      <span className="font-mono text-slate-200">88%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Elektron doska / Slaydlar bilan ishlash</span>
                      <span className="font-mono text-slate-200">96%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Savol-javob va interfaollik</span>
                      <span className="font-mono text-slate-200">84%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Detections Feed */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Jonli Voqealar Oqimi</span>
                  <span className="text-[10px] text-slate-500 font-mono">Real-time</span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {currentAuditorium.boxes.map(box => (
                    <div 
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer text-xs space-y-0.5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{box.label}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          box.status === 'alert' ? 'bg-rose-950 text-rose-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {box.type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{box.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </>
      )}

      {/* AI Lesson Summary Modal */}
      {showAIReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Sun'iy Intellekt Dars Tahliliy Xulosasi</h3>
              </div>
              <button
                onClick={() => setShowAIReportModal(false)}
                className="text-slate-400 hover:text-white px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Auditoriya: <strong className="text-white">{currentAuditorium.name}</strong></span>
                <span>O'qituvchi: <strong className="text-white">{currentAuditorium.teacher}</strong></span>
              </div>
              <div className="text-slate-400">Mavzu: <strong className="text-cyan-300">{currentAuditorium.currentSubject}</strong></div>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 space-y-1">
                <div className="font-semibold text-purple-300">1. Pedagogik mahorat va dinamika (94 ball)</div>
                <p className="text-slate-400 text-[11px]">
                  O'qituvchi leksiya davomida auditoriya bilan faol muloqotda bo'ldi, nutq sur'ati me'yorda (minutiga ~110 so'z), taqdimot slaydlariga 18 marta murojaat qildi.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 space-y-1">
                <div className="font-semibold text-cyan-300">2. Talabalar qabul qilish darajasi (86% diqqat)</div>
                <p className="text-slate-400 text-[11px]">
                  29 nafar talabaning 26 nafari (89.6%) doskaga va o'qituvchiga diqqat bilan qaratilgan. Savol berilganda 8 nafar talaba qo'l ko'tardi.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
                <div className="font-semibold text-rose-300">3. Aniqlangan kamchiliklar va tavsiyalar</div>
                <p className="text-slate-400 text-[11px]">
                  4-qatorda o'tirgan 1 nafar talabada (D. Rasulov) ketma-ket smartfon ishlatish qayd etildi. Ota-onaga avtomatik bildirishnoma jo'natildi.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setActionFeedback("Dars AI xulosasi PDF formatida yuklandi!");
                  setShowAIReportModal(false);
                  setTimeout(() => setActionFeedback(null), 3000);
                }}
                className="px-3.5 py-2 text-xs font-medium text-purple-300 bg-purple-950/60 border border-purple-800/60 rounded-xl hover:bg-purple-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Hisobotini Saqlash</span>
              </button>

              <button
                onClick={() => setShowAIReportModal(false)}
                className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
