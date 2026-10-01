import React, { useState } from 'react';
import { UserRole, NavigationTab, InterfaceMode, SystemAuditLog, UserProfile } from './types';
import { Header } from './components/Header';
import { SystemArchitectureView } from './components/SystemArchitectureView';
import { AIVideoMonitoring } from './components/AIVideoMonitoring';
import { KPISystem } from './components/KPISystem';
import { StudentAnalytics } from './components/StudentAnalytics';
import { FacultiesDepartments } from './components/FacultiesDepartments';
import { IntegrationsView } from './components/IntegrationsView';
import { RectorDashboard } from './components/RectorDashboard';
import { StudentPortal } from './components/StudentPortal';
import { TeacherPortal } from './components/TeacherPortal';
import { VeoVideoGenerator } from './components/VeoVideoGenerator';
import { AuthModal } from './components/AuthModal';
import { TelegramBotModal } from './components/TelegramBotModal';
import { MobileAppPreview } from './components/MobileAppPreview';
import { NotificationsModal } from './components/NotificationsModal';
import { RoleViewModal } from './components/RoleViewModal';
import { SecurityBackupModal } from './components/SecurityBackupModal';
import { SYSTEM_AUDIT_LOGS, DEFAULT_USER_PROFILES } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('struktura');
  const [userRole, setUserRole] = useState<UserRole>('rektor');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USER_PROFILES.rektor);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [interfaceMode, setInterfaceMode] = useState<InterfaceMode>('web');
  const [isTelegramOpen, setIsTelegramOpen] = useState<boolean>(false);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState<boolean>(false);
  const [logs, setLogs] = useState<SystemAuditLog[]>(SYSTEM_AUDIT_LOGS);
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false);

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    const profile = DEFAULT_USER_PROFILES[role];
    setCurrentUser(profile);

    if (role === 'talaba') {
      setActiveTab('talaba-portali');
    } else if (role === 'oqituvchi') {
      setActiveTab('oqituvchi-portali');
    } else if (role === 'rektor' || role === 'dekanat') {
      setActiveTab('rektorat');
    } else if (role === 'ota-ona') {
      setShowRoleModal(true);
    }
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setUserRole(user.role);

    if (user.role === 'talaba') {
      setActiveTab('talaba-portali');
    } else if (user.role === 'oqituvchi') {
      setActiveTab('oqituvchi-portali');
    } else if (user.role === 'rektor' || user.role === 'dekanat') {
      setActiveTab('rektorat');
    } else if (user.role === 'ota-ona') {
      setShowRoleModal(true);
    }

    const newLog: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toTimeString().slice(0, 8),
      type: 'success',
      module: 'Xavfsizlik',
      message: `${user.name} (${user.roleTitle}) tizimga muvaffaqiyatli autentifikatsiya qilindi.`
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleAddNotification = (message: string) => {
    const newLog: SystemAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toTimeString().slice(0, 8),
      type: message.includes('OGOHLANTIRISH') ? 'alert' : 'info',
      module: 'AI Video',
      message
    };
    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={handleRoleChange}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        interfaceMode={interfaceMode}
        setInterfaceMode={(mode) => {
          setInterfaceMode(mode);
          if (mode === 'telegram') setIsTelegramOpen(true);
          if (mode === 'mobile') setIsMobilePreviewOpen(true);
        }}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSecurity={() => setIsSecurityOpen(true)}
        unreadCount={logs.filter(l => l.type === 'alert' || l.type === 'warning').length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full">
        {/* Dedicated Section 1: Talaba Portali */}
        {activeTab === 'talaba-portali' && (
          <StudentPortal
            currentUser={currentUser.role === 'talaba' ? currentUser : DEFAULT_USER_PROFILES.talaba}
            onOpenTelegram={() => setIsTelegramOpen(true)}
            onOpenMobile={() => setIsMobilePreviewOpen(true)}
          />
        )}

        {/* Dedicated Section 2: O'qituvchi Portali */}
        {activeTab === 'oqituvchi-portali' && (
          <TeacherPortal
            currentUser={currentUser.role === 'oqituvchi' ? currentUser : DEFAULT_USER_PROFILES.oqituvchi}
            onOpenLiveCamera={() => setActiveTab('video-monitoring')}
            onOpenKPI={() => setActiveTab('kpi')}
          />
        )}

        {/* Dedicated Section 3: Rahbariyat Portali */}
        {activeTab === 'rektorat' && (
          <RectorDashboard />
        )}

        {/* Dedicated Veo 3 Video Generator / Animation Studio */}
        {activeTab === 'veo-video' && (
          <VeoVideoGenerator />
        )}

        {/* Additional University Modules */}
        {activeTab === 'struktura' && (
          <SystemArchitectureView onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'video-monitoring' && (
          <AIVideoMonitoring 
            onNotify={handleAddNotification}
            onOpenVeo={() => setActiveTab('veo-video')}
          />
        )}

        {activeTab === 'kpi' && (
          <KPISystem />
        )}

        {activeTab === 'talaba-analitika' && (
          <StudentAnalytics />
        )}

        {activeTab === 'fakultetlar' && (
          <FacultiesDepartments />
        )}

        {activeTab === 'integratsiya' && (
          <IntegrationsView />
        )}
      </main>

      {/* System Modals and Previews */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentRole={userRole}
        onLoginSuccess={handleLoginSuccess}
      />

      <TelegramBotModal
        isOpen={isTelegramOpen}
        onClose={() => {
          setIsTelegramOpen(false);
          setInterfaceMode('web');
        }}
      />

      <MobileAppPreview
        isOpen={isMobilePreviewOpen}
        onClose={() => {
          setIsMobilePreviewOpen(false);
          setInterfaceMode('web');
        }}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        logs={logs}
      />

      <SecurityBackupModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />

      {showRoleModal && (
        <RoleViewModal
          role={userRole}
          onClose={() => setShowRoleModal(false)}
          onOpenTelegram={() => setIsTelegramOpen(true)}
        />
      )}

      {/* Quiet Corporate Academic Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">EduVision Pro</span>
            <span>·</span>
            <span>SamDU Denov tadbirkorlik va pedagogika instituti intellektual monitoring platformasi</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>HEMIS API v2.4</span>
            <span>·</span>
            <span>Moodle Webhook</span>
            <span>·</span>
            <span>Telegram Bot Gateway</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
