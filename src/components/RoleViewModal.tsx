import React from 'react';
import { UserRole } from '../types';
import { UserCheck, GraduationCap, HeartHandshake, CheckCircle2, Clock, Phone, AlertTriangle, Sparkles, Send } from 'lucide-react';

interface RoleViewModalProps {
  role: UserRole;
  onClose: () => void;
  onOpenTelegram: () => void;
}

export const RoleViewModal: React.FC<RoleViewModalProps> = ({ role, onClose, onOpenTelegram }) => {
  if (role !== 'talaba' && role !== 'ota-ona') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
              {role === 'talaba' ? <GraduationCap className="w-5 h-5" /> : <HeartHandshake className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {role === 'talaba' ? "Talaba Shaxsiy Kabineti" : "Ota-ona Nazorat Portali"}
              </h3>
              <p className="text-xs text-slate-400">
                {role === 'talaba' ? "Jasur Saidov (TB-22/01 - DTPI Denov)" : "Farzand: Dilshod Rasulov (TB-22/01 - DTPI Denov)"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2 py-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        {role === 'talaba' ? (
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Hozirgi Dars:</span>
                <span className="text-emerald-400 font-mono font-semibold">● DAVOM ETMOQDA</span>
              </div>
              <div className="text-sm font-bold text-white">Tadbirkorlik asoslari va Startap loyihalar</div>
              <div className="text-slate-400">Dots. Farhod Boboyev · 104-auditoriya (Biznes inkubator)</div>
              <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Yuzingiz orqali davomat 08:30 da avtomatik qayd etildi (DTPI HEMIS).</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Davomat</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">98%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Diqqat indeksi</div>
                <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">93%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">GPA</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">4.9</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Farzandingiz holati:</span>
                <span className="text-rose-400 font-mono font-semibold">⚠️ DIQQAT TALAB</span>
              </div>
              <div className="text-sm font-bold text-white">Dilshod Rasulov (TB-22/01)</div>
              <div className="text-slate-300">
                Bugun 104-auditoriyadagi darsda ishtirok etmoqda, biroq 25 daqiqa davomida smartfonga chalg'ish holati videokuzatuv orqali qayd etildi.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Semestr davomati</div>
                <div className="text-base font-bold text-rose-400 font-mono mt-0.5">68%</div>
                <div className="text-[10px] text-slate-500">70% dan past - xavfli</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Imtihon prognozi (AI)</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-0.5">48%</div>
                <div className="text-[10px] text-slate-500">Qayta topshirish xavfi</div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenTelegram();
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <Send className="w-4 h-4" />
              <span>Ota-ona Telegram Botini Ochish</span>
            </button>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
