import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  Building2, 
  Crown, 
  HeartHandshake, 
  Smartphone, 
  LayoutDashboard, 
  Send, 
  Camera, 
  ScanFace, 
  BrainCircuit, 
  PhoneOff, 
  Activity, 
  Sparkles, 
  Server, 
  Database, 
  Cpu, 
  Clock, 
  Cable, 
  BarChart3, 
  AlertTriangle, 
  Layers, 
  Share2, 
  ShieldCheck, 
  RefreshCcw, 
  Zap, 
  Maximize2, 
  ArrowDown, 
  CheckCircle2, 
  Eye, 
  MessageSquare, 
  CheckSquare, 
  Bell,
  Printer, 
  Download, 
  ZoomIn, 
  ZoomOut,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';

interface OriginalInfographicViewProps {
  onNavigateModule?: (tab: string) => void;
}

export const OriginalInfographicView: React.FC<OriginalInfographicViewProps> = ({ onNavigateModule }) => {
  const [zoom, setZoom] = useState<number>(1.0);
  const [showRasterPoster, setShowRasterPoster] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto px-2 py-4">
      {/* Control bar */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-2xl text-xs gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">
            EDUVISION PRO – TIZIM STRUKTURASI (ASL INFOGRAFIKA)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRasterPoster(!showRasterPoster)}
            className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer font-medium ${
              showRasterPoster 
                ? 'bg-purple-950 text-purple-300 border-purple-800' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{showRasterPoster ? "Vektorli Shakl" : "Poster Rasm"}</span>
          </button>

          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 gap-1">
            <button
              onClick={() => setZoom(prev => Math.max(0.7, prev - 0.1))}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              title="Kichraytirish"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] text-slate-300 px-1">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(1.4, prev + 0.1))}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              title="Kattalashtirish"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 cursor-pointer shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Chop Etish / PDF</span>
          </button>
        </div>
      </div>

      {showRasterPoster ? (
        /* Render Generated Poster Asset */
        <div className="p-4 bg-white rounded-3xl shadow-2xl flex justify-center overflow-hidden border border-slate-200">
          <img
            src="/src/assets/images/eduvision_infographic_poster_1790841014192.jpg"
            alt="EduVision Pro Asl Infografika Plakati"
            className="max-h-[850px] object-contain rounded-xl select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        /* EXACT 1:1 REPLICA POSTER of the User's Uploaded Diagram */
        <div 
          className="bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-10 border border-slate-200 transition-transform origin-top mx-auto overflow-x-auto print:p-0 print:border-none print:shadow-none"
          style={{ transform: `scale(${zoom})`, maxWidth: '860px' }}
        >
          {/* 1. Main Title */}
          <div className="text-center pb-6">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
              EDUVISION PRO – TIZIM STRUKTURASI
            </h1>
            <p className="text-xs font-bold text-emerald-800 tracking-wider uppercase mt-1">
              Samarqand Davlat Universiteti Denov Tadbirkorlik va Pedagogika Instituti (DTPI)
            </p>
          </div>

          {/* Flow Container */}
          <div className="space-y-4">

            {/* BLOCK 1: FOYDALANUVCHILAR */}
            <div className="rounded-2xl border-2 border-emerald-700/60 bg-[#f7fbf8] p-4 text-center">
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-800 mb-3">
                FOYDALANUVCHILAR
              </div>

              <div className="grid grid-cols-5 gap-2 sm:gap-4 items-center">
                <button 
                  onClick={() => onNavigateModule?.('talaba-portali')}
                  className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
                  title="Talaba Shaxsiy Portaliga o'tish"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 group-hover:bg-cyan-100 flex items-center justify-center text-emerald-800 group-hover:text-cyan-800 mb-1 transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-cyan-700">Talaba</span>
                </button>

                <button 
                  onClick={() => onNavigateModule?.('oqituvchi-portali')}
                  className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
                  title="O'qituvchi Shaxsiy Portaliga o'tish"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 group-hover:bg-blue-100 flex items-center justify-center text-emerald-800 group-hover:text-blue-800 mb-1 transition-colors">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">O'qituvchi</span>
                </button>

                <button 
                  onClick={() => onNavigateModule?.('rektorat')}
                  className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
                  title="Dekanat / Rahbariyat Portaliga o'tish"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 group-hover:bg-purple-100 flex items-center justify-center text-emerald-800 group-hover:text-purple-800 mb-1 transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-purple-700">Dekanat</span>
                </button>

                <button 
                  onClick={() => onNavigateModule?.('rektorat')}
                  className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
                  title="Rektorat Boshqaruv Portaliga o'tish"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 group-hover:bg-amber-100 flex items-center justify-center text-emerald-800 group-hover:text-amber-800 mb-1 transition-colors">
                    <Crown className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-amber-700">Rektor</span>
                </button>

                <button 
                  onClick={() => onNavigateModule?.('talaba-portali')}
                  className="flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
                  title="Ota-ona / Farzand Portaliga o'tish"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 group-hover:bg-rose-100 flex items-center justify-center text-emerald-800 group-hover:text-rose-800 mb-1 transition-colors">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-rose-700">Ota-ona</span>
                </button>
              </div>
            </div>

            {/* Down arrow */}
            <div className="flex justify-center text-slate-700">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* BLOCK 2: FOYDALANUVCHI INTERFEYSLARI */}
            <div className="rounded-2xl border-2 border-sky-600/70 bg-[#f4f9fd] p-4 text-center">
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-sky-800 mb-3">
                FOYDALANUVCHI INTERFEYSLARI
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 mb-1">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Mobil ilova</span>
                  <span className="text-[10px] text-slate-500">(Android / iOS)</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 mb-1">
                    <LayoutDashboard className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Web platforma</span>
                  <span className="text-[10px] text-slate-500">(Dashboard)</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 mb-1">
                    <Send className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">Telegram botlar</span>
                  <span className="text-[10px] text-slate-500">(Har bir bo'lim uchun)</span>
                </div>
              </div>
            </div>

            {/* Down arrow */}
            <div className="flex justify-center text-slate-700">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* BLOCK 3: AI & VIDEO ANALYTIKA MODULI */}
            <div className="rounded-2xl border-2 border-purple-600/70 bg-[#faf6fd] p-4 text-center relative">
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-purple-900 mb-1">
                AI & VIDEO ANALYTIKA MODULI
              </div>
              <div className="text-[11px] text-purple-700 mb-3 font-medium">
                (Kamera orqali monitoring)
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-around gap-3 pt-1">
                {/* CCTV Icon */}
                <div className="flex flex-col items-center sm:pr-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 mb-1 shadow-sm">
                    <Camera className="w-7 h-7" />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 flex-1">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mb-1">
                      <ScanFace className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Davomat</span>
                    <span className="text-[10px] text-slate-500">aniqlash</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mb-1">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Diqqat</span>
                    <span className="text-[10px] text-slate-500">darajasi</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mb-1">
                      <PhoneOff className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Telefon</span>
                    <span className="text-[10px] text-slate-500">ishlatish</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mb-1">
                      <Activity className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">O'qituvchi</span>
                    <span className="text-[10px] text-slate-500">faolligi</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mb-1">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Dars sifati</span>
                    <span className="text-[10px] text-slate-500">tahlili</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Down arrow */}
            <div className="flex justify-center text-slate-700">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* BLOCK 4: MARKAZIY SERVER (EduVision Core System) */}
            <div className="rounded-2xl border-2 border-amber-600/70 bg-[#fdfaf3] p-4 text-center">
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-900 mb-3">
                MARKAZIY SERVER (EduVision Core System)
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-around gap-3">
                {/* Server rack */}
                <div className="flex flex-col items-center sm:pr-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-1 shadow-sm">
                    <Server className="w-7 h-7" />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 flex-1">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-1">
                      <Database className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Ma'lumotlarni</span>
                    <span className="text-[10px] text-slate-500">yig'ish</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-1">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">AI qayta</span>
                    <span className="text-[10px] text-slate-500">ishlash</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-1">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Real-time</span>
                    <span className="text-[10px] text-slate-500">monitoring</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-1">
                      <Server className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Ma'lumotlar</span>
                    <span className="text-[10px] text-slate-500">saqlash</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-1">
                      <Cable className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">API</span>
                    <span className="text-[10px] text-slate-500">integratsiya</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Down arrow */}
            <div className="flex justify-center text-slate-700">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* BLOCK 5: 4 SUB-MODULES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
              
              {/* KPI TIZIMI */}
              <div className="p-3.5 rounded-2xl border-2 border-emerald-600/70 bg-[#f7fbf8] space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-emerald-800 border-b border-emerald-200 pb-1.5">
                  <BarChart3 className="w-4 h-4 text-emerald-700" />
                  <span>KPI TIZIMI</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1">
                  <li>• O'qituvchi reytingi</li>
                  <li>• Dars sifati</li>
                  <li>• Darsga kelish</li>
                  <li>• Talaba ishtiroki</li>
                  <li>• Feedback va baholar</li>
                </ul>
              </div>

              {/* TALABA ANALITIKA */}
              <div className="p-3.5 rounded-2xl border-2 border-sky-600/70 bg-[#f4f9fd] space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-sky-800 border-b border-sky-200 pb-1.5">
                  <Users className="w-4 h-4 text-sky-700" />
                  <span>TALABA ANALITIKA</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1">
                  <li>• Davomat tahlili</li>
                  <li>• Faollik darajasi</li>
                  <li>• Risk talabalar</li>
                  <li>• Imtihon prognozi</li>
                  <li>• Akademik ko'rsatkichlar</li>
                </ul>
              </div>

              {/* FAKULTET / BO'LIMLAR */}
              <div className="p-3.5 rounded-2xl border-2 border-amber-600/70 bg-[#fdfaf3] space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-amber-800 border-b border-amber-200 pb-1.5">
                  <Building2 className="w-4 h-4 text-amber-700" />
                  <span>FAKULTET / BO'LIMLAR</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1">
                  <li>• 1-bo'lim</li>
                  <li>• 2-bo'lim</li>
                  <li>• 3-bo'lim</li>
                  <li>• ...</li>
                </ul>
              </div>

              {/* INTEGRATSIYA */}
              <div className="p-3.5 rounded-2xl border-2 border-purple-600/70 bg-[#faf6fd] space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-purple-900 border-b border-purple-200 pb-1.5">
                  <Share2 className="w-4 h-4 text-purple-700" />
                  <span>INTEGRATSIYA</span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1">
                  <li>• LMS (Learning Management System)</li>
                  <li>• HR tizimlari</li>
                  <li>• CRM tizimlari</li>
                  <li>• Elektron jurnal</li>
                  <li>• Boshqa tizimlar</li>
                </ul>
              </div>

            </div>

            {/* Down arrow */}
            <div className="flex justify-center text-slate-700">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* BLOCK 6: ADMINLAR (Bo'lim xodimlari) */}
            <div className="rounded-2xl border-2 border-rose-400 bg-[#fff5f5] p-3 text-center">
              <div className="text-xs font-extrabold uppercase tracking-wider text-rose-800 mb-2">
                ADMINLAR (Bo'lim xodimlari)
              </div>
              <div className="flex items-center justify-around text-xs text-slate-800 font-semibold flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-rose-600" />
                  <span>Nazorat qiladi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-rose-600" />
                  <span>Javob beradi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-rose-600" />
                  <span>Muammolarni hal qiladi</span>
                </div>
              </div>
            </div>

            {/* Down arrow */}
            <div className="flex justify-center text-slate-700">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* BLOCK 7: ADMIN PANEL (Web Dashboard) */}
            <div className="rounded-2xl border-2 border-sky-400 bg-[#f0f9ff] p-4 text-center">
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-sky-900 mb-3">
                ADMIN PANEL (Web Dashboard)
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="flex flex-col items-center">
                  <BarChart3 className="w-5 h-5 text-sky-700 mb-1" />
                  <span className="text-xs font-semibold text-slate-800">Statistikalar</span>
                </div>
                <div className="flex flex-col items-center">
                  <TrendingUp className="w-5 h-5 text-sky-700 mb-1" />
                  <span className="text-xs font-semibold text-slate-800">Grafiklar</span>
                </div>
                <div className="flex flex-col items-center">
                  <CheckSquare className="w-5 h-5 text-sky-700 mb-1" />
                  <span className="text-xs font-semibold text-slate-800">Hisobotlar</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="w-5 h-5 text-sky-700 mb-1" />
                  <span className="text-xs font-semibold text-slate-800">Real-time kuzatuv</span>
                </div>
                <div className="flex flex-col items-center">
                  <Bell className="w-5 h-5 text-sky-700 mb-1" />
                  <span className="text-xs font-semibold text-slate-800">Bildirishnomalar</span>
                </div>
              </div>
            </div>

            {/* Down arrow */}
            <div className="flex justify-center text-slate-700">
              <ArrowDown className="w-5 h-5" />
            </div>

            {/* BLOCK 8: REKTOR / PROREKTOR / DEKAN */}
            <div className="rounded-2xl border-2 border-emerald-600 bg-[#f0fdf4] p-4 text-center">
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-900 mb-3">
                REKTOR / PROREKTOR / DEKAN
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="flex flex-col items-center">
                  <UserCheck className="w-5 h-5 text-emerald-700 mb-1" />
                  <span className="text-xs font-bold text-slate-800">Umumiy nazorat</span>
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 mb-1" />
                  <span className="text-xs font-bold text-slate-800">Qaror qabul qilish</span>
                </div>
                <div className="flex flex-col items-center">
                  <BarChart3 className="w-5 h-5 text-emerald-700 mb-1" />
                  <span className="text-xs font-bold text-slate-800">Universitet reytingi</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="w-5 h-5 text-emerald-700 mb-1" />
                  <span className="text-xs font-bold text-slate-800">Dars sifati monitoringi</span>
                </div>
                <div className="flex flex-col items-center">
                  <TrendingUp className="w-5 h-5 text-emerald-700 mb-1" />
                  <span className="text-xs font-bold text-slate-800">Strategik tahlil va rivojlantirish</span>
                </div>
              </div>
            </div>

            {/* BLOCK 9: 4 POYDEVOR (Bottom Pillars) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-slate-200 text-center">
              <div className="p-2.5">
                <ShieldCheck className="w-6 h-6 text-slate-800 mx-auto mb-1" />
                <div className="text-xs font-extrabold text-slate-900 uppercase">XAVFSIZLIK</div>
                <div className="text-[10px] text-slate-600">Ma'lumotlar himoyasi (SSL, Encryption)</div>
              </div>

              <div className="p-2.5">
                <RefreshCcw className="w-6 h-6 text-slate-800 mx-auto mb-1" />
                <div className="text-xs font-extrabold text-slate-900 uppercase">ZAXIRA VA TIKLASH</div>
                <div className="text-[10px] text-slate-600">Avtomatik backup va tiklash tizimi</div>
              </div>

              <div className="p-2.5">
                <Clock className="w-6 h-6 text-slate-800 mx-auto mb-1" />
                <div className="text-xs font-extrabold text-slate-900 uppercase">REAL-TIME</div>
                <div className="text-[10px] text-slate-600">Real vaqt rejimida ma'lumotlar yangilanadi</div>
              </div>

              <div className="p-2.5">
                <BarChart3 className="w-6 h-6 text-slate-800 mx-auto mb-1" />
                <div className="text-xs font-extrabold text-slate-900 uppercase">MASSHTABLASH</div>
                <div className="text-[10px] text-slate-600">Ko'p universitetlar uchun moslashuvchan tizim</div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
