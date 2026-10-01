import React, { useState } from 'react';
import { 
  UserRole, 
  UserProfile 
} from '../types';
import { DEFAULT_USER_PROFILES } from '../data/mockData';
import { 
  ShieldCheck, 
  GraduationCap, 
  UserCheck, 
  Crown, 
  HeartHandshake, 
  ScanFace, 
  Key, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Building2,
  Sparkles,
  Phone
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onLoginSuccess
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [loginInput, setLoginInput] = useState<string>(DEFAULT_USER_PROFILES[currentRole].identifier);
  const [passwordInput, setPasswordInput] = useState<string>('••••••••');
  const [isFaceIdScanning, setIsFaceIdScanning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectRoleTab = (role: UserRole) => {
    setSelectedRole(role);
    setLoginInput(DEFAULT_USER_PROFILES[role].identifier);
    setPasswordInput('••••••••');
  };

  const handleDirectDemoLogin = (role: UserRole) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const user = DEFAULT_USER_PROFILES[role];
      setAuthSuccessMsg(`${user.name} (${user.roleTitle}) sifatida muvaffaqiyatli kirildi!`);
      setTimeout(() => {
        setAuthSuccessMsg(null);
        onLoginSuccess(user);
        onClose();
      }, 700);
    }, 500);
  };

  const handleFaceIdAuth = () => {
    setIsFaceIdScanning(true);
    setTimeout(() => {
      setIsFaceIdScanning(false);
      const user = DEFAULT_USER_PROFILES[selectedRole];
      setAuthSuccessMsg(`Face ID biometriyasi tasdiqlandi: ${user.name}`);
      setTimeout(() => {
        setAuthSuccessMsg(null);
        onLoginSuccess(user);
        onClose();
      }, 800);
    }, 1400);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const user = DEFAULT_USER_PROFILES[selectedRole];
      setAuthSuccessMsg(`Tizimga kirish tasdiqlandi: ${user.name}`);
      setTimeout(() => {
        setAuthSuccessMsg(null);
        onLoginSuccess(user);
        onClose();
      }, 700);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[11px] font-mono">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>SamDU Denov tadbirkorlik va pedagogika instituti</span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>EduVision Pro · Tizimga Autentifikatsiya</span>
            </h3>
            <p className="text-xs text-slate-400">
              Har bir foydalanuvchi roli uchun xavfsiz va shaxsiylashtirilgan kirish
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer text-lg leading-none"
            title="Yopish"
          >
            ✕
          </button>
        </div>

        {authSuccessMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{authSuccessMsg}</span>
          </div>
        )}

        {/* Role Selection Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            1. Foydalanuvchi Rolini Tanlang:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            
            {/* Talaba */}
            <button
              type="button"
              onClick={() => handleSelectRoleTab('talaba')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedRole === 'talaba'
                  ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/30'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className={`w-4 h-4 ${selectedRole === 'talaba' ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="font-bold text-xs">Talaba</span>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">Shaxsiy kabinet va davomat</div>
            </button>

            {/* O'qituvchi */}
            <button
              type="button"
              onClick={() => handleSelectRoleTab('oqituvchi')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedRole === 'oqituvchi'
                  ? 'bg-blue-950/70 border-blue-500 text-white shadow-lg shadow-blue-950/30'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className={`w-4 h-4 ${selectedRole === 'oqituvchi' ? 'text-blue-400' : 'text-slate-500'}`} />
                <span className="font-bold text-xs">O'qituvchi</span>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">Dars tahlili va KPI reytingi</div>
            </button>

            {/* Rahbariyat */}
            <button
              type="button"
              onClick={() => handleSelectRoleTab('rektor')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedRole === 'rektor'
                  ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-lg shadow-emerald-950/30'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Crown className={`w-4 h-4 ${selectedRole === 'rektor' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="font-bold text-xs">Rahbariyat</span>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">Rektorat & Dekanat nazorati</div>
            </button>

            {/* Ota-ona */}
            <button
              type="button"
              onClick={() => handleSelectRoleTab('ota-ona')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedRole === 'ota-ona'
                  ? 'bg-purple-950/70 border-purple-500 text-white shadow-lg shadow-purple-950/30'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <HeartHandshake className={`w-4 h-4 ${selectedRole === 'ota-ona' ? 'text-purple-400' : 'text-slate-500'}`} />
                <span className="font-bold text-xs">Ota-ona</span>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">Farzand nazorati & Bot</div>
            </button>

          </div>
        </div>

        {/* Selected Role Profile Preview Card */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-cyan-300">
              {DEFAULT_USER_PROFILES[selectedRole].avatarText}
            </div>
            <div>
              <div className="font-bold text-white text-sm">{DEFAULT_USER_PROFILES[selectedRole].name}</div>
              <div className="text-slate-400 text-[11px]">{DEFAULT_USER_PROFILES[selectedRole].roleTitle}</div>
              <div className="text-slate-500 text-[10px]">{DEFAULT_USER_PROFILES[selectedRole].departmentOrGroup}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleDirectDemoLogin(selectedRole)}
            className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all cursor-pointer flex items-center gap-1.5 text-xs shadow-md shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-bosishda kirish</span>
          </button>
        </div>

        {/* Credential Form */}
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-300 font-medium mb-1 block">
                {selectedRole === 'talaba' 
                  ? "HEMIS Talaba ID raqami:" 
                  : selectedRole === 'oqituvchi' 
                  ? "O'qituvchi HEMIS ID / Login:" 
                  : selectedRole === 'rektor'
                  ? "Rektorat xizmat pochtasi / OneID:" 
                  : "Bog'langan telefon raqam:"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                  placeholder="ID raqam yoki login"
                  required
                />
                <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium mb-1 block">
                Maxfiy Parol:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                  placeholder="Parolni kiriting"
                  required
                />
                <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
              </div>
            </div>
          </div>

          {/* Action Buttons: Password Login & Face ID */}
          <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <Key className="w-4 h-4" />
              <span>{isSubmitting ? "Autentifikatsiya qilinmoqda..." : "Parol bilan kirish"}</span>
            </button>

            <button
              type="button"
              onClick={handleFaceIdAuth}
              disabled={isFaceIdScanning}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-semibold transition-all text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <ScanFace className={`w-4 h-4 text-cyan-400 ${isFaceIdScanning ? 'animate-spin' : ''}`} />
              <span>{isFaceIdScanning ? "Yuz skanerlanmoqda..." : "Face ID orqali kirish"}</span>
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>Surxondaryo viloyati, Denov sh., SamDU DTPI</span>
          <span className="font-mono">SSL 256-bit xavfsiz ulanish</span>
        </div>

      </div>
    </div>
  );
};
