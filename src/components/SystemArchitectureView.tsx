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
  ArrowRight,
  TrendingUp,
  Workflow,
  Image as ImageIcon
} from 'lucide-react';
import { NavigationTab } from '../types';
import { OriginalInfographicView } from './OriginalInfographicView';

interface SystemArchitectureViewProps {
  onNavigate: (tab: NavigationTab) => void;
}

type PipelineMode = 'all' | 'attendance' | 'phone_alert' | 'kpi_flow';

export const SystemArchitectureView: React.FC<SystemArchitectureViewProps> = ({ onNavigate }) => {
  const [viewType, setViewType] = useState<'infographic' | 'interactive'>('infographic');
  const [pipelineMode, setPipelineMode] = useState<PipelineMode>('all');
  const [selectedNode, setSelectedNode] = useState<{
    title: string;
    description: string;
    targetTab?: NavigationTab;
    metrics?: { label: string; value: string }[];
    status: string;
  } | null>(null);

  // Helper to determine if a node is highlighted in the active workflow
  const isHighlighted = (category: 'user' | 'ui' | 'ai' | 'server' | 'subsystem' | 'admin' | 'rector') => {
    if (pipelineMode === 'all') return true;
    if (pipelineMode === 'attendance') {
      return ['user', 'ai', 'server', 'subsystem', 'admin'].includes(category);
    }
    if (pipelineMode === 'phone_alert') {
      return ['ai', 'server', 'subsystem', 'admin', 'user'].includes(category);
    }
    if (pipelineMode === 'kpi_flow') {
      return ['ai', 'server', 'subsystem', 'rector', 'admin'].includes(category);
    }
    return true;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      {/* Top Presentation Switcher */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center bg-slate-900 border border-slate-800 p-1 rounded-2xl shadow-lg">
          <button
            onClick={() => setViewType('infographic')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              viewType === 'infographic'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Asl Infografika Diagrammasi (1:1 Plakat)</span>
          </button>

          <button
            onClick={() => setViewType('interactive')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              viewType === 'interactive'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Interaktiv Boshqaruv Xaritasi (Jonli Pipelinelar)</span>
          </button>
        </div>
      </div>

      {viewType === 'infographic' ? (
        <OriginalInfographicView onNavigateModule={(tab) => onNavigate(tab as NavigationTab)} />
      ) : (
        <>
          {/* Banner / Title Header */}
          <div className="text-center space-y-3 relative">
            {/* Institution Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 text-xs font-semibold shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Samarqand Davlat Universiteti Denov Tadbirkorlik va Pedagogika Instituti (DTPI)</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-medium ml-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interaktiv Tizim Xaritasi</span>
              <span>·</span>
              <span>Har bir blokni bosing</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              EDUVISION PRO – TIZIM STRUKTURASI
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              SamDU Denov tadbirkorlik va pedagogika instituti uchun sun'iy intellekt va video analitikaga asoslangan kompleks monitoring va akademik boshqaruv platformasi
            </p>

            {/* Workflow Pipeline Selector (Interactive Process Flow) */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mr-2">
                <Workflow className="w-4 h-4 text-cyan-400" />
                <span>Jarayon Oqimini Ko'rish:</span>
              </div>

              <div className="flex flex-wrap items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs gap-1">
                <button
                  onClick={() => setPipelineMode('all')}
                  className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                    pipelineMode === 'all' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Barcha Bloklar
                </button>
                <button
                  onClick={() => setPipelineMode('attendance')}
                  className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                    pipelineMode === 'attendance' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1. Davomat Oqimi (Face ID → HEMIS)
                </button>
                <button
                  onClick={() => setPipelineMode('phone_alert')}
                  className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                    pipelineMode === 'phone_alert' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2. Smartfon & Qoidabuzarlik Oqimi
                </button>
                <button
                  onClick={() => setPipelineMode('kpi_flow')}
                  className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                    pipelineMode === 'kpi_flow' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3. KPI & Rektorat Qarorlari Oqimi
                </button>
              </div>
            </div>
          </div>

      {/* Main Flow Container */}
      <div className="space-y-6">

        {/* 1. FOYDALANUVCHILAR (Users) */}
        <div className={`p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-emerald-900/40 shadow-sm transition-opacity duration-300 ${
          isHighlighted('user') ? 'opacity-100 ring-1 ring-emerald-500/20' : 'opacity-30'
        }`}>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" /> 1. FOYDALANUVCHILAR
            </span>
            <span className="text-[11px] text-slate-500 font-normal">5 asosiy auditoriya toifasi</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { icon: <GraduationCap className="w-5 h-5 text-emerald-400" />, title: 'Talaba', desc: 'Davomat, baholar, shaxsiy diqqat tahlili', tab: 'talaba-portali' as NavigationTab },
              { icon: <UserCheck className="w-5 h-5 text-emerald-400" />, title: 'O\'qituvchi', desc: 'Pedagogik reyting, dars sifati, audit', tab: 'oqituvchi-portali' as NavigationTab },
              { icon: <Building2 className="w-5 h-5 text-emerald-400" />, title: 'Dekanat', desc: 'Fakultet guruhlari nazorati, jurnallar', tab: 'fakultetlar' as NavigationTab },
              { icon: <Crown className="w-5 h-5 text-emerald-400" />, title: 'Rektor', desc: 'Boshqaruv, reytinglar, strategik qarorlar', tab: 'rektorat' as NavigationTab },
              { icon: <HeartHandshake className="w-5 h-5 text-emerald-400" />, title: 'Ota-ona', desc: 'Telegram bot orqali real-time hisobotlar', tab: 'talaba-portali' as NavigationTab }
            ].map((user, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedNode({
                  title: user.title,
                  description: user.desc,
                  targetTab: user.tab,
                  status: 'Faol foydalanuvchi qatlami',
                  metrics: [
                    { label: 'Roli', value: user.title },
                    { label: 'Ulanish kanali', value: 'Mobil / Web / Telegram' }
                  ]
                })}
                className="p-3 rounded-xl bg-slate-950/70 border border-emerald-950 hover:border-emerald-700/60 hover:bg-emerald-950/20 transition-all text-center flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-emerald-950/50 group-hover:scale-110 transition-transform">
                  {user.icon}
                </div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">
                  {user.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-2">
                  {user.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center text-slate-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* 2. FOYDALANUVCHI INTERFEYSLARI */}
        <div className={`p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-sky-900/40 shadow-sm transition-opacity duration-300 ${
          isHighlighted('ui') ? 'opacity-100 ring-1 ring-sky-500/20' : 'opacity-30'
        }`}>
          <div className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> 2. FOYDALANUVCHI INTERFEYSLARI
            </span>
            <span className="text-[11px] text-slate-500 font-normal">Ko'p kanalli kirish</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { 
                icon: <Smartphone className="w-5 h-5 text-sky-400" />, 
                title: 'Mobil ilova (Android / iOS)', 
                desc: 'Talabalar va o\'qituvchilar uchun dars jadvali, shaxsiy bildirishnomalar, Face ID orqali davomat'
              },
              { 
                icon: <LayoutDashboard className="w-5 h-5 text-sky-400" />, 
                title: 'Web platforma (Dashboard)', 
                desc: 'Rektorat, dekanat va tahlilchilar uchun keng formatli video tahlil va statistik hisobotlar markazi'
              },
              { 
                icon: <Send className="w-5 h-5 text-sky-400" />, 
                title: 'Telegram botlar', 
                desc: 'Har bir bo\'lim uchun ixtisoslashgan botlar (Ota-onalar xabarnomasi, tezkor audit xabarlari)'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedNode({
                  title: item.title,
                  description: item.desc,
                  status: '24/7 ishlab turibdi',
                  metrics: [
                    { label: 'Uptime', value: '99.98%' },
                    { label: 'Format', value: 'Responsive / API-First' }
                  ]
                })}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-sky-950 hover:border-sky-700/60 hover:bg-sky-950/20 transition-all cursor-pointer flex items-start gap-3"
              >
                <div className="p-2 rounded-lg bg-sky-950/50 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">{item.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center text-slate-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* 3. AI & VIDEO ANALYTIKA MODULI (Kamera orqali monitoring) */}
        <div className={`p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-purple-900/50 shadow-sm transition-opacity duration-300 ${
          isHighlighted('ai') ? 'opacity-100 ring-1 ring-purple-500/20' : 'opacity-30'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <Camera className="w-4 h-4 text-purple-400" />
              <span>3. AI & VIDEO ANALYTIKA MODULI (Kamera orqali monitoring)</span>
            </div>
            <button
              onClick={() => onNavigate('video-monitoring')}
              className="text-xs px-3 py-1 bg-purple-950/60 border border-purple-800/50 hover:bg-purple-900/60 text-purple-300 rounded-md flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>Jonli kamerani ko'rish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { icon: <ScanFace className="w-5 h-5 text-purple-400" />, title: 'Davomat aniqlash', sub: 'Yuzni tanish (Face ID)', desc: 'Talabalar sinfxonaga kirganda 0.2 soniyada avto-aniqlanadi' },
              { icon: <BrainCircuit className="w-5 h-5 text-purple-400" />, title: 'Diqqat darajasi', sub: 'E\'tibor va nigoh tahlili', desc: 'Doskaga qarash, konspekt yozish va chalg\'ish dinamikasi' },
              { icon: <PhoneOff className="w-5 h-5 text-purple-400" />, title: 'Telefon ishlatish', sub: 'Smartfon detektori', desc: 'Dars paytida ruxsatsiz telefon qo\'llashni qayd etish' },
              { icon: <Activity className="w-5 h-5 text-purple-400" />, title: 'O\'qituvchi faolligi', sub: 'Pedagogik harakat', desc: 'Auditoriya bo\'ylab harakat, doskadan foydalanish tahlili' },
              { icon: <Sparkles className="w-5 h-5 text-purple-400" />, title: 'Dars sifati tahlili', sub: 'Akustik & interfaol tahlil', desc: 'Savol-javob chastotasi, talabalar qiziqish ko\'rsatkichi' }
            ].map((module, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedNode({
                  title: module.title,
                  description: module.desc,
                  targetTab: 'video-monitoring',
                  status: 'AI Neyron tarmoqlari 30 FPS bilan ishlayapti',
                  metrics: [
                    { label: 'Aniqlik darajasi', value: '98.6%' },
                    { label: 'Qayta ishlash kechikishi', value: '45 ms' }
                  ]
                })}
                className="p-3 rounded-xl bg-slate-950/70 border border-purple-950 hover:border-purple-700/60 hover:bg-purple-950/20 text-center flex flex-col items-center gap-1.5 transition-all group cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-purple-950/50 group-hover:scale-110 transition-transform">
                  {module.icon}
                </div>
                <div className="text-sm font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">
                  {module.title}
                </div>
                <div className="text-[11px] text-purple-300 font-medium">
                  {module.sub}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-2">
                  {module.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center text-slate-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* 4. MARKAZIY SERVER (EduVision Core System) */}
        <div className={`p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/30 border border-amber-800/40 shadow-sm transition-opacity duration-300 ${
          isHighlighted('server') ? 'opacity-100 ring-1 ring-amber-500/20' : 'opacity-30'
        }`}>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Server className="w-4 h-4" /> 4. MARKAZIY SERVER (EduVision Core System)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Microservices & Edge AI Clusters</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { icon: <Database className="w-5 h-5 text-amber-400" />, title: 'Ma\'lumotlarni yig\'ish', desc: 'Kameralar va datchiklardan uzluksiz oqim' },
              { icon: <Cpu className="w-5 h-5 text-amber-400" />, title: 'AI qayta ishlash', desc: 'GPU klasterlarda tensor hisoblashlari' },
              { icon: <Clock className="w-5 h-5 text-amber-400" />, title: 'Real-time monitoring', desc: 'Vaqt kechikishisiz telemetriya oqimi' },
              { icon: <Server className="w-5 h-5 text-amber-400" />, title: 'Ma\'lumotlar saqlash', desc: 'Shifrlangan xavfsiz ma\'lumotlar ombori' },
              { icon: <Cable className="w-5 h-5 text-amber-400" />, title: 'API integratsiya', desc: 'Tashqi HEMIS va LMS bilan shlyuz' }
            ].map((srv, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-amber-950/80 text-center flex flex-col items-center gap-1.5"
              >
                <div className="p-2 rounded-lg bg-amber-950/40">{srv.icon}</div>
                <div className="text-sm font-semibold text-slate-200">{srv.title}</div>
                <div className="text-[11px] text-slate-400">{srv.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center text-slate-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* 5. TO'RT ASOSIY SUBSYSTEMS (KPI, Talaba Analitika, Fakultet, Integratsiya) */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-300 ${
          isHighlighted('subsystem') ? 'opacity-100' : 'opacity-30'
        }`}>
          
          {/* KPI TIZIMI */}
          <div 
            onClick={() => onNavigate('kpi')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-900/50 hover:border-emerald-700/60 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> KPI TIZIMI
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>O'qituvchi reytingi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Dars sifati</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Darsga kelish intizomi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Talaba ishtiroki</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Feedback va baholar</span>
              </li>
            </ul>
          </div>

          {/* TALABA ANALITIKA */}
          <div 
            onClick={() => onNavigate('talaba-analitika')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-sky-900/50 hover:border-sky-700/60 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <Users className="w-4 h-4" /> TALABA ANALITIKA
              </div>
              <ArrowRight className="w-4 h-4 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Davomat tahlili</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Faollik darajasi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                <span className="text-rose-300 font-medium">Risk talabalar (Xavf guruhi)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Imtihon prognozi (AI)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Akademik ko'rsatkichlar</span>
              </li>
            </ul>
          </div>

          {/* FAKULTET / BO'LIMLAR */}
          <div 
            onClick={() => onNavigate('fakultetlar')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-amber-900/50 hover:border-amber-700/60 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> FAKULTET / BO'LIMLAR
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Kompyuter injiniringi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Axborot xavfsizligi</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Dasturiy injiniring</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Raqamli iqtisodiyot</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Barcha kafedralar audit</span>
              </li>
            </ul>
          </div>

          {/* INTEGRATSIYA */}
          <div 
            onClick={() => onNavigate('integratsiya')}
            className="p-4 rounded-2xl bg-slate-900/60 border border-purple-900/50 hover:border-purple-700/60 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> INTEGRATSIYA
              </div>
              <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>LMS (Moodle / Canvas)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>HR va kadrlar tizimlari</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>CRM tizimlari</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>HEMIS elektron jurnali</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Boshqa xizmatlar (API)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center text-slate-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* 6. ADMINLAR (Bo'lim xodimlari) */}
        <div className={`p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 transition-opacity duration-300 ${
          isHighlighted('admin') ? 'opacity-100 ring-1 ring-rose-500/20' : 'opacity-30'
        }`}>
          <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" /> 6. ADMINLAR (Bo'lim xodimlari)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-rose-950 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
              <span><strong>Nazorat qiladi:</strong> Dars jarayonlari, kameralar va signallarni kuzatadi</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-rose-950 text-xs text-slate-300">
              <Send className="w-4 h-4 text-rose-400 shrink-0" />
              <span><strong>Javob beradi:</strong> Murojaat va ogohlantirishlarga zudlik bilan munosabat bildiradi</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-rose-950 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
              <span><strong>Muammolarni hal qiladi:</strong> Texnik uzilishlar va intizom buzilishlarini yopadi</span>
            </div>
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center text-slate-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* 7. ADMIN PANEL (Web Dashboard) */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-cyan-900/50">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> 7. ADMIN PANEL (Web Dashboard)
            </span>
            <span className="text-[11px] text-slate-400">Yagona boshqaruv pulti</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { title: 'Statistikalar', desc: 'Kunlik, haftalik umumiy ko\'rsatkichlar' },
              { title: 'Grafiklar', desc: 'Dars sifati va davomat dinamikasi' },
              { title: 'Hisobotlar', desc: 'PDF va Excel formatida avto-generatsiya' },
              { title: 'Real-time kuzatuv', desc: 'Barcha auditoriyalar jonli kamerasi' },
              { title: 'Bildirishnomalar', desc: 'Tezkor hodisalar va push-xabarnomalar' }
            ].map((panel, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-cyan-950 text-center">
                <div className="text-sm font-semibold text-slate-200">{panel.title}</div>
                <div className="text-[11px] text-slate-400 mt-1">{panel.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center text-slate-600">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* 8. REKTOR / PROREKTOR / DEKAN (Executive Suite) */}
        <div 
          onClick={() => onNavigate('rektorat')}
          className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-700/50 hover:border-emerald-500/80 transition-all cursor-pointer group shadow-lg ${
            isHighlighted('rector') ? 'opacity-100 ring-1 ring-emerald-500/20' : 'opacity-30'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Crown className="w-4 h-4 text-emerald-400" />
              <span>8. REKTOR / PROREKTOR / DEKAN (Yuqori Rahbariyat)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <span>Rektorat Tahlil Markaziga O'tish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { title: 'Umumiy nazorat', desc: 'Barcha fakultetlar va kafedralar ustidan yagona ko\'rish' },
              { title: 'Qaror qabul qilish', desc: 'Tasdiqlangan AI xulosalari va faktlar asosida buyruqlar' },
              { title: 'Universitet reytingi', desc: 'Milliy va xalqaro reyting indikatorlari dinamikasi' },
              { title: 'Dars sifati monitoringi', desc: 'Professor-o\'qituvchilarning dars berish darajasi' },
              { title: 'Strategik rivojlanish', desc: 'Kelgusi semestrlar uchun resurslarni rejalashtirish' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-emerald-950 text-center">
                <div className="text-sm font-semibold text-slate-200">{item.title}</div>
                <div className="text-[11px] text-slate-400 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 9. TIZIM POYDEVORI (Bottom Pillars) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="flex justify-center mb-1 text-cyan-400"><ShieldCheck className="w-5 h-5" /></div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">XAVFSIZLIK</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Ma'lumotlar himoyasi (SSL, Encryption)</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="flex justify-center mb-1 text-cyan-400"><RefreshCcw className="w-5 h-5" /></div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">ZAXIRA VA TIKLASH</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Avtomatik backup va tiklash tizimi</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="flex justify-center mb-1 text-cyan-400"><Zap className="w-5 h-5" /></div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">REAL-TIME</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Real vaqt rejimida ma'lumotlar yangilanadi</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="flex justify-center mb-1 text-cyan-400"><TrendingUp className="w-5 h-5" /></div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">MASSHTABLASH</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Ko'p universitetlar uchun moslashuvchan tizim</div>
          </div>
        </div>

      </div>
      </>
      )}

      {/* Selected Node Details Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">{selectedNode.title}</h3>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-slate-300">{selectedNode.description}</p>
            
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <div className="text-slate-400 font-medium">Holati: <span className="text-emerald-400 font-semibold">{selectedNode.status}</span></div>
              {selectedNode.metrics?.map((m, i) => (
                <div key={i} className="flex justify-between text-slate-300">
                  <span className="text-slate-400">{m.label}:</span>
                  <span className="font-mono">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
              >
                Yopish
              </button>
              {selectedNode.targetTab && (
                <button
                  onClick={() => {
                    const tab = selectedNode.targetTab!;
                    setSelectedNode(null);
                    onNavigate(tab);
                  }}
                  className="px-4 py-2 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Bo'limga o'tish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
