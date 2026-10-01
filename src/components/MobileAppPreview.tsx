import React, { useState } from 'react';
import { 
  Smartphone, 
  ScanFace, 
  Calendar, 
  BrainCircuit, 
  CheckCircle2, 
  Clock, 
  Bell, 
  User, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

interface MobileAppPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileAppPreview: React.FC<MobileAppPreviewProps> = ({ isOpen, onClose }) => {
  const [faceIdVerified, setFaceIdVerified] = useState(true);
  const [checkInDone, setCheckInDone] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-4 space-y-4 shadow-2xl relative">
        {/* Close Button */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-400">
            <Smartphone className="w-4 h-4" />
            <span>EduVision Mobil Ilova</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded"
          >
            Yopish ✕
          </button>
        </div>

        {/* Smartphone Mockup Frame */}
        <div className="rounded-[2.5rem] bg-slate-950 border-4 border-slate-700 p-4 shadow-2xl relative space-y-4 text-white font-sans">
          
          {/* Dynamic Island / Notch */}
          <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></div>
            <div className="w-2 h-2 rounded-full bg-slate-900"></div>
          </div>

          {/* Mobile App Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400">Xush kelibsiz!</div>
              <div className="text-sm font-bold text-white">Jasur Saidov</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-300 text-xs font-bold">
              JS
            </div>
          </div>

          {/* Face ID Status Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-800/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <ScanFace className="w-4 h-4" />
                <span>Face ID Davomat</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Tasdiqlangan</span>
            </div>
            <p className="text-[11px] text-slate-300">
              304-auditoriyaga 08:30 da kirdingiz. Kamera orqali davomat HEMIS ga avtomatik yuborildi.
            </p>
          </div>

          {/* Student Focus & Performance */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Shaxsiy Diqqat</div>
              <div className="text-lg font-bold text-cyan-400 font-mono">92%</div>
              <div className="text-[9px] text-emerald-400">A'lo konsentratsiya</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Haftalik Davomat</div>
              <div className="text-lg font-bold text-white font-mono">98%</div>
              <div className="text-[9px] text-slate-400">0 soat sababsiz</div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300">Bugungi darslar jadvali:</div>
            
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="font-semibold text-white">Mashinali o'rganish</div>
                <div className="text-[10px] text-slate-400">08:30 - 09:50 · 304-auditoriya</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono">
                Davom etmoqda
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-center justify-between text-xs opacity-70">
              <div className="space-y-0.5">
                <div className="font-semibold text-white">Algoritmlar laboratoriyasi</div>
                <div className="text-[10px] text-slate-400">10:00 - 11:20 · 208-auditoriya</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                Kutilmoqda
              </span>
            </div>
          </div>

          {/* Bottom Nav Mockup */}
          <div className="pt-2 border-t border-slate-800 flex justify-around text-slate-500 text-[10px]">
            <span className="text-cyan-400 font-medium">Bosh sahifa</span>
            <span>Jadval</span>
            <span>Reyting</span>
            <span>Profil</span>
          </div>

        </div>
      </div>
    </div>
  );
};
