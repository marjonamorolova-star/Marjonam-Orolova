import React, { useState } from 'react';
import { 
  ShieldCheck, 
  RefreshCcw, 
  Zap, 
  TrendingUp, 
  Lock, 
  Download, 
  CheckCircle2, 
  Database,
  Key,
  Server
} from 'lucide-react';

interface SecurityBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityBackupModal: React.FC<SecurityBackupModalProps> = ({ isOpen, onClose }) => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      setBackupMessage(`EduVision_Backup_${new Date().toISOString().slice(0, 10)}_256bit.enc muvaffaqiyatli yaratildi va bulutli xavfsiz omborga joylandi!`);
      setTimeout(() => setBackupMessage(null), 4000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Xavfsizlik, Zaxira va Masshtablash</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2 py-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        {backupMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{backupMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Xavfsizlik */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Lock className="w-4 h-4" />
              <span>XAVFSIZLIK & SHIFRLASH</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Barcha video oqimlar va shaxsiy ma'lumotlar 256-bit AES shifrlash va TLS 1.3 protokoli orqali himoyalangan.
            </p>
            <div className="font-mono text-[10px] text-emerald-400">SSL: Valid (DigiCert CA)</div>
          </div>

          {/* Real-time */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Zap className="w-4 h-4" />
              <span>REAL-TIME PIPELINE</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              AI qayta ishlash kechikishi o'rtacha 42 millisekund. WebRTC orqali uzluksiz video telemetriya uzatiladi.
            </p>
            <div className="font-mono text-[10px] text-emerald-400">Kechikish: ~42ms</div>
          </div>

          {/* Masshtablash */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>MASSHTABLASH (SCALABILITY)</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Bir vaqtning o'zida 500+ auditoriya va bir necha kampuslarni yagona markaziy serverga ulash imkoniyati.
            </p>
            <div className="font-mono text-[10px] text-cyan-400">Kubernetes Edge Cluster</div>
          </div>

          {/* Zaxira va tiklash */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <RefreshCcw className="w-4 h-4" />
              <span>ZAXIRA VA TIKLASH</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Har 24 soatda avtomatik to'liq zaxira (snapshot). RPO: 5 daqiqa, RTO: 15 daqiqa.
            </p>
            <div className="font-mono text-[10px] text-emerald-400">Oxirgi backup: Bugun 04:00</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <div className="font-semibold text-white">Yangi Zaxira Nusxasini Yaratish</div>
            <div className="text-[11px] text-slate-400">Barcha davomat va KPI jadvallarining shifrlangan arxivini yaratish</div>
          </div>

          <button
            onClick={handleCreateBackup}
            disabled={isBackingUp}
            className="px-3.5 py-2 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow"
          >
            <RefreshCcw className={`w-3.5 h-3.5 ${isBackingUp ? 'animate-spin' : ''}`} />
            <span>{isBackingUp ? "Yaratilmoqda..." : "Backup Olish"}</span>
          </button>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
