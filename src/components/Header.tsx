import React from 'react';
import { UserRole, NavigationTab, InterfaceMode, UserProfile } from '../types';
import { 
  Eye, 
  Smartphone, 
  Send, 
  ShieldCheck, 
  UserCheck, 
  Layers, 
  Video, 
  BarChart3, 
  Users, 
  Building2, 
  Network, 
  Crown,
  Bell,
  GraduationCap,
  Key,
  Lock,
  LogOut,
  Film
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  interfaceMode: InterfaceMode;
  setInterfaceMode: (mode: InterfaceMode) => void;
  onOpenNotifications: () => void;
  onOpenSecurity: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  currentUser,
  onOpenAuth,
  interfaceMode,
  setInterfaceMode,
  onOpenNotifications,
  onOpenSecurity,
  unreadCount
}) => {
  const roleBadges: Record<UserRole, { label: string; color: string }> = {
    talaba: { label: "Talaba", color: "bg-cyan-950/80 border-cyan-700 text-cyan-300" },
    oqituvchi: { label: "O'qituvchi", color: "bg-blue-950/80 border-blue-700 text-blue-300" },
    rektor: { label: "Rektorat", color: "bg-emerald-950/80 border-emerald-700 text-emerald-300" },
    dekanat: { label: "Dekanat", color: "bg-purple-950/80 border-purple-700 text-purple-300" },
    'ota-ona': { label: "Ota-ona", color: "bg-amber-950/80 border-amber-700 text-amber-300" }
  };

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'veo-video', label: 'Veo Video Animatsiya', icon: <Film className="w-4 h-4 text-purple-400" />, badge: "Veo 3" },
    { id: 'talaba-portali', label: 'Talaba Portali', icon: <GraduationCap className="w-4 h-4 text-cyan-400" />, badge: "Alohida" },
    { id: 'oqituvchi-portali', label: "O'qituvchi Portali", icon: <UserCheck className="w-4 h-4 text-blue-400" />, badge: "Alohida" },
    { id: 'rektorat', label: 'Rahbariyat Portali', icon: <Crown className="w-4 h-4 text-emerald-400" />, badge: "Alohida" },
    { id: 'video-monitoring', label: 'AI Video Monitoring', icon: <Video className="w-4 h-4" /> },
    { id: 'struktura', label: 'Tizim Strukturasi', icon: <Layers className="w-4 h-4" /> },
    { id: 'kpi', label: 'KPI Tizimi', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'talaba-analitika', label: 'Talaba Analitika', icon: <Users className="w-4 h-4" /> },
    { id: 'fakultetlar', label: 'Fakultetlar', icon: <Building2 className="w-4 h-4" /> },
    { id: 'integratsiya', label: 'Integratsiyalar', icon: <Network className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8">
      {/* Main Single-Row Top Bar Contract */}
      <div className="flex items-center justify-between h-16 gap-3">
        
        {/* Zone 1: Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-950/40 text-white shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setActiveTab('struktura')} 
                className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors cursor-pointer block leading-tight text-left"
              >
                EduVision Pro
              </button>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-700/80 text-emerald-300 font-semibold hidden md:inline-block">
                SamDU DTPI
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="text-slate-300 font-medium truncate max-w-[200px] sm:max-w-none">
                SamDU Denov tadbirkorlik va pedagogika instituti
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">AI Core</span>
              <span className="hidden sm:inline">·</span>
              <button 
                onClick={onOpenSecurity}
                className="hover:text-cyan-300 underline underline-offset-2 cursor-pointer hidden sm:inline"
                title="Xavfsizlik va zaxira markazini ko'rish"
              >
                SSL 256-bit
              </button>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden 2xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-800/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Authenticated User Profile & Fast Auth Trigger */}
        <div className="flex items-center gap-2">
          
          {/* Quick Interface Mode Toggles */}
          <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setInterfaceMode('web')}
              title="Web Dashboard"
              className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 transition-colors ${
                interfaceMode === 'web'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Web</span>
            </button>
            <button
              onClick={() => setInterfaceMode('mobile')}
              title="Mobil Ilova Interfeysi"
              className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 transition-colors ${
                interfaceMode === 'mobile'
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobil</span>
            </button>
            <button
              onClick={() => setInterfaceMode('telegram')}
              title="Telegram Botlar Ekotizimi"
              className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 transition-colors ${
                interfaceMode === 'telegram'
                  ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Bot</span>
            </button>
          </div>

          {/* Active User Card & Auth Switcher Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/80 transition-all cursor-pointer shadow-sm text-left group"
            title="Foydalanuvchi autentifikatsiyasi va akkauntni almashtirish"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow">
              {currentUser.avatarText}
            </div>

            <div className="hidden md:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {currentUser.name}
                </span>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${roleBadges[userRole].color}`}>
                  {roleBadges[userRole].label}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {currentUser.identifier} · Kirilgan
              </div>
            </div>

            <div className="p-1 rounded bg-slate-800 group-hover:bg-cyan-900/60 text-cyan-400 transition-colors">
              <Key className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Tizim bildirishnomalari"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Horizontal Navigation Drawer for medium & mobile screens */}
      <div className="flex 2xl:hidden overflow-x-auto py-2 border-t border-slate-800/60 gap-1.5 scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-800/40'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-300">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
