import React, { useState } from 'react';
import { 
  UserCheck, 
  BarChart3, 
  Video, 
  ScanFace, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Users, 
  Award, 
  Sparkles, 
  Volume2, 
  FileText, 
  Send, 
  Activity, 
  Star, 
  Calendar,
  Building2,
  Mic,
  RefreshCw,
  PhoneOff
} from 'lucide-react';
import { UserProfile } from '../types';
import { AUDITORIUMS_DATA, TEACHERS_KPI_DATA } from '../data/mockData';

interface TeacherPortalProps {
  currentUser: UserProfile;
  onOpenLiveCamera: () => void;
  onOpenKPI: () => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  currentUser,
  onOpenLiveCamera,
  onOpenKPI
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSyncingHemis, setIsSyncingHemis] = useState<boolean>(false);
  const [phoneAlertSent, setPhoneAlertSent] = useState<boolean>(false);

  // Active auditorium for this teacher (104-auditoriya)
  const currentClass = AUDITORIUMS_DATA[0];
  const teacherKPI = TEACHERS_KPI_DATA[0];

  const handleConfirmAttendanceToHemis = () => {
    setIsSyncingHemis(true);
    setTimeout(() => {
      setIsSyncingHemis(false);
      setToastMessage("104-auditoriya bo'yicha 34 nafar talaba davomati elektron raqamli imzo bilan HEMIS jurnaliga tasdiqlandi!");
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  const handleSendPhoneWarning = () => {
    setPhoneAlertSent(true);
    setToastMessage("Talaba Dilshod Rasulovga (TB-22/01) smartfondan chalg'ish bo'yicha ogohlantirish yuborildi!");
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      
      {/* Banner / Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1 flex-wrap">
            <UserCheck className="w-4 h-4 text-blue-400" />
            <span>O'qituvchi Shaxsiy Kabineti</span>
            <span>·</span>
            <span className="text-emerald-400">SamDU Denov Tadbirkorlik va Pedagogika Instituti</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Xush kelibsiz, {currentUser.name}!
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentUser.roleTitle} · {currentUser.departmentOrGroup} · ID: <strong className="text-white font-mono">{currentUser.identifier}</strong>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenLiveCamera}
            className="px-3.5 py-2 text-xs font-medium bg-purple-950/60 border border-purple-800/80 hover:bg-purple-900/60 text-purple-200 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow"
          >
            <Video className="w-4 h-4 text-purple-400" />
            <span>Kamera Kuzatuvi</span>
          </button>

          <button
            onClick={onOpenKPI}
            className="px-3.5 py-2 text-xs font-medium bg-emerald-950/60 border border-emerald-800/80 hover:bg-emerald-900/60 text-emerald-200 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Institut KPI Reytingi</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Section: Current Active Class Telemetry & Video Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Class Live Telemetry (Span 2) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950/30 border border-blue-800/40 space-y-4 shadow-xl">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                  JONLI DARS MASHG'ULOTI
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  1-juftlik (08:30 - 09:50)
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {currentClass.name}
              </h3>
              <p className="text-xs text-slate-300">
                Fan: <strong>{currentClass.currentSubject}</strong> · Guruh: <strong className="text-cyan-300">{currentClass.group}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleConfirmAttendanceToHemis}
                disabled={isSyncingHemis}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all cursor-pointer shadow-lg shadow-emerald-950/40 flex items-center gap-2"
              >
                <CheckCircle2 className={`w-4 h-4 ${isSyncingHemis ? 'animate-spin' : ''}`} />
                <span>{isSyncingHemis ? "HEMIS ga yozilmoqda..." : "Davomatni HEMIS ga tasdiqlash"}</span>
              </button>
            </div>
          </div>

          {/* Live Lecture Acoustic and Teacher Engagement Meter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-center font-mono">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Qatnashuvchilar</span>
              </div>
              <div className="text-lg font-bold text-white mt-1">34 / 36</div>
              <div className="text-[9px] text-emerald-400">94.4% davomat</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Talaba Diqqati</span>
              </div>
              <div className="text-lg font-bold text-emerald-400 mt-1">88%</div>
              <div className="text-[9px] text-emerald-400">Yuqori faollik</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Mic className="w-3.5 h-3.5 text-blue-400" />
                <span>O'qituvchi Nutqi</span>
              </div>
              <div className="text-lg font-bold text-blue-400 mt-1">71 dB</div>
              <div className="text-[9px] text-slate-400">Optimal akustika</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>Pedagogik Faollik</span>
              </div>
              <div className="text-lg font-bold text-purple-400 mt-1">95%</div>
              <div className="text-[9px] text-purple-300">Doska & Savol-javob</div>
            </div>
          </div>

          {/* Attention and In-Class Students Table */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Darsdagi talabalar holati (AI video tahlili):</span>
              <span className="text-[11px] text-slate-400">Kamera: 104-AUD (28 FPS)</span>
            </div>

            <div className="space-y-1.5 text-xs">
              {/* Dilshod Rasulov (Distracted) */}
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <div>
                    <span className="font-bold text-white">Dilshod Rasulov</span>
                    <span className="text-[11px] text-slate-400 ml-2">Smartfon ishlatmoqda (25 daqiqa chalg'ish)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-rose-400 font-bold">Diqqat: 61%</span>
                  <button
                    onClick={handleSendPhoneWarning}
                    disabled={phoneAlertSent}
                    className="px-2.5 py-1 rounded bg-rose-900/60 hover:bg-rose-800/80 border border-rose-700/60 text-rose-200 text-[11px] transition-colors cursor-pointer"
                  >
                    {phoneAlertSent ? "Ogohlantirildi ✓" : "AI Ogohlantirish"}
                  </button>
                </div>
              </div>

              {/* Jasur Saidov (Attentive) */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <div>
                    <span className="font-bold text-white">Jasur Saidov</span>
                    <span className="text-[11px] text-slate-400 ml-2">Konspekt yozmoqda, faol tinglovchi</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">Diqqat: 92%</span>
              </div>

              {/* Shahlo Qosimova */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <div>
                    <span className="font-bold text-white">Shahlo Qosimova</span>
                    <span className="text-[11px] text-slate-400 ml-2">Doskadagi keys tahlilida qatnashmoqda</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">Diqqat: 96%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Teacher KPI & Pedagogical Profile Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Shaxsiy KPI Reytingi</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">
                #1 Kafedrada
              </span>
            </div>

            <div className="text-center py-2">
              <div className="text-4xl font-extrabold text-emerald-400 font-mono">
                {teacherKPI.overallRating}
              </div>
              <div className="text-xs text-slate-400 mt-1">Umumiy reyting balli (100 dan)</div>
              <div className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[11px] font-medium">
                Oylik 50% ustama tavsiya etilgan
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Dars sifati ko'rsatkichi:</span>
                <span className="text-white font-mono font-bold">{teacherKPI.qualityScore}%</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Darsga o'z vaqtida kirish:</span>
                <span className="text-emerald-400 font-mono font-bold">{teacherKPI.punctuality}%</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Talaba qanoatlanish bahosi:</span>
                <span className="text-amber-400 font-mono font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {teacherKPI.studentFeedbackScore} / 5.0
                </span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Monitoring qilingan darslar:</span>
                <span className="text-cyan-400 font-mono font-bold">{teacherKPI.totalClassesMonitored} ta juftlik</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs space-y-1">
              <div className="font-semibold text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Pedagogik Xulosasi:</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {teacherKPI.aiFeedback}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenLiveCamera}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer shadow flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Dars videokamerasini ko'rish</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
