import React, { useState } from 'react';
import { 
  GraduationCap, 
  ScanFace, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  BrainCircuit, 
  AlertTriangle, 
  BookOpen, 
  Award, 
  FileText, 
  Send, 
  Smartphone, 
  Building2, 
  TrendingUp, 
  User, 
  Download,
  Sparkles,
  QrCode
} from 'lucide-react';
import { UserProfile } from '../types';

interface StudentPortalProps {
  currentUser: UserProfile;
  onOpenTelegram: () => void;
  onOpenMobile: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  currentUser,
  onOpenTelegram,
  onOpenMobile
}) => {
  const [activeSubject, setActiveSubject] = useState<string>('tadbirkorlik');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDownloadDigitalID = () => {
    setToastMessage("DTPI Raqamli Talaba Guvohnomasi PDF formatida yuklab olindi!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendQuestion = () => {
    setToastMessage("Dots. Farhod Boboyevga konsultatsiya savolingiz yuborildi!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      
      {/* Banner / Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex-wrap">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Talaba Shaxsiy Kabineti</span>
            <span>·</span>
            <span className="text-emerald-400">SamDU Denov Tadbirkorlik va Pedagogika Instituti</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Xush kelibsiz, {currentUser.name}!
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentUser.roleTitle} · {currentUser.departmentOrGroup} · HEMIS ID: <strong className="text-white font-mono">{currentUser.identifier}</strong>
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleDownloadDigitalID}
            className="px-3.5 py-2 text-xs font-medium bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow"
          >
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span>Raqamli Talaba ID</span>
          </button>

          <button
            onClick={onOpenTelegram}
            className="px-3.5 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Telegram Bot</span>
          </button>

          <button
            onClick={onOpenMobile}
            className="px-3.5 py-2 text-xs font-medium bg-cyan-950/70 border border-cyan-800/80 text-cyan-300 hover:bg-cyan-900/60 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobil Ilova</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Primary Status Card: Live Face ID Attendance & Current Lecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Face ID Status Card (Span 2) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-cyan-800/40 space-y-4 shadow-xl">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-600/60 flex items-center justify-center text-emerald-400 shadow-md">
                <ScanFace className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">
                    ● Yuz orqali davomat qayd etildi
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono">
                    08:30:12
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  104-auditoriya (Tadbirkorlik va Biznes Inkubatori)
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-xs font-bold">
                HEMIS: Tasdiqlangan
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center justify-between text-slate-400 font-medium">
              <span>Hozirgi mashg'ulot:</span>
              <span className="text-cyan-400 font-mono">1-juftlik (08:30 - 09:50)</span>
            </div>
            <div className="text-sm font-bold text-white">
              Tadbirkorlik asoslari va Startap loyihalar
            </div>
            <div className="text-slate-400">
              O'qituvchi: <strong>Dots. Farhod Boboyev</strong> · Mavzu: "Biznes model kanvasi va moliyaviy barqarorlik"
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center font-mono">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400">Diqqat indeksi</div>
              <div className="text-lg font-bold text-cyan-400">92%</div>
              <div className="text-[9px] text-emerald-400">Yuqori konsentratsiya</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400">Semestr davomati</div>
              <div className="text-lg font-bold text-white">98%</div>
              <div className="text-[9px] text-emerald-400">0 soat sababsiz</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400">Smartfon tahlili</div>
              <div className="text-lg font-bold text-emerald-400">0 daqiqa</div>
              <div className="text-[9px] text-slate-400">Chalg'ish aniqlanmadi</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400">Joriy GPA</div>
              <div className="text-lg font-bold text-purple-400">4.90</div>
              <div className="text-[9px] text-purple-300">A'lochi talaba</div>
            </div>
          </div>
        </div>

        {/* Digital Student Passport Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">DTPI Talaba Guvohnomasi</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400">
                FAOL
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-md">
                {currentUser.avatarText}
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-white text-sm">{currentUser.name}</div>
                <div className="text-slate-400 font-mono text-[11px]">{currentUser.identifier}</div>
                <div className="text-emerald-400 text-[11px]">{currentUser.departmentOrGroup}</div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Fakultet:</span>
                <span className="text-slate-200 text-right font-medium">Tadbirkorlik va boshqaruv</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>O'qish shakli:</span>
                <span className="text-slate-200">Kunduzgi (Davlat granti)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Stipendiya:</span>
                <span className="text-emerald-400 font-semibold">Iqtidorli stipendiya</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSendQuestion}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all cursor-pointer shadow flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>O'qituvchiga savol / murojaat</span>
            </button>
          </div>
        </div>

      </div>

      {/* Today's Schedule & Academic Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Timetable */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Bugungi dars jadvali (Payshanba)</span>
            </div>
            <span className="text-xs text-slate-400">DTPI 1-o'quv binosi</span>
          </div>

          <div className="space-y-2">
            {/* Subject 1 (Active) */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-700/60 flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold">
                    08:30 - 09:50 · DAVOM ETMOQDA
                  </span>
                  <span className="text-xs text-cyan-300 font-mono">104-auditoriya</span>
                </div>
                <div className="text-sm font-bold text-white">
                  Tadbirkorlik asoslari va Startap loyihalar (Ma'ruza)
                </div>
                <div className="text-xs text-slate-400">
                  O'qituvchi: Dots. Farhod Boboyev
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Davomat tasdiqlandi
                </span>
              </div>
            </div>

            {/* Subject 2 */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                    10:00 - 11:20 · 2-JUFTLIK
                  </span>
                  <span className="text-xs text-slate-400 font-mono">105-auditoriya</span>
                </div>
                <div className="text-sm font-bold text-white">
                  Moliyaviy tahlil va biznes hisobotlari (Amaliy)
                </div>
                <div className="text-xs text-slate-400">
                  O'qituvchi: Katta o'qituvchi Sh. Xudoyqulov
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-mono">Kutilmoqda</span>
              </div>
            </div>

            {/* Subject 3 */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                    11:30 - 12:50 · 3-JUFTLIK
                  </span>
                  <span className="text-xs text-slate-400 font-mono">305-auditoriya</span>
                </div>
                <div className="text-sm font-bold text-white">
                  Ta'limda raqamli texnologiyalar va sun'iy intellekt (Laboratoriya)
                </div>
                <div className="text-xs text-slate-400">
                  O'qituvchi: Katta o'qituvchi D. Tursunov
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-mono">Kutilmoqda</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations & At-Risk Warning Box */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>EduVision AI Maslahatchisi</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 space-y-1">
              <div className="font-bold text-purple-300">Imtihon tayyorgarligi prognozi: 97%</div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Talabaning darsdagi diqqati va oraliq nazoratlardagi natijalari a'lo darajada. Kutilayotgan yakuniy nazoratdan muvaffaqiyatli o'tish ehtimoli 97%.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-white">Tavsiya etilgan topshiriqlar:</div>
              <div className="space-y-1.5 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-300">
                  <span>Startap loyihasi taqdimotini yuklash</span>
                  <span className="text-emerald-400 font-mono">Topshirildi</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-slate-300">
                  <span>Biznes-reja oraliq keys tahlili</span>
                  <span className="text-cyan-400 font-mono">Bugun 18:00 gacha</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400">Ota-ona bildirishnomasi:</div>
                <div className="text-xs font-semibold text-slate-200">Saidov Akbar aka (Uzatildi)</div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
