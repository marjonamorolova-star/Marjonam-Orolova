import React from 'react';
import { Bell, ShieldCheck, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { SystemAuditLog } from '../types';
import { SYSTEM_AUDIT_LOGS } from '../data/mockData';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: SystemAuditLog[];
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose, logs }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Tizim Bildirishnomalari va Audit Jurnali</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {logs.map((log) => {
            let icon = <Info className="w-4 h-4 text-cyan-400 shrink-0" />;
            let borderColor = 'border-slate-800';

            if (log.type === 'alert') {
              icon = <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />;
              borderColor = 'border-rose-900/60 bg-rose-950/10';
            } else if (log.type === 'warning') {
              icon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
              borderColor = 'border-amber-900/60 bg-amber-950/10';
            } else if (log.type === 'success') {
              icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
              borderColor = 'border-emerald-900/60 bg-emerald-950/10';
            }

            return (
              <div
                key={log.id}
                className={`p-3 rounded-xl bg-slate-950 border ${borderColor} space-y-1 text-xs`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-semibold text-slate-200">{log.module}</span>
                    {log.auditorium && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {log.auditorium}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">{log.timestamp}</span>
                </div>
                <p className="text-slate-300 text-[11px] pl-6 leading-relaxed">
                  {log.message}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
