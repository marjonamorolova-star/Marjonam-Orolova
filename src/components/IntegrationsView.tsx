import React, { useState } from 'react';
import { 
  Network, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink, 
  Code2, 
  ShieldCheck, 
  Clock, 
  Send, 
  Server,
  Zap,
  Play,
  Terminal
} from 'lucide-react';
import { IntegrationSystem } from '../types';
import { INTEGRATIONS_DATA } from '../data/mockData';

export const IntegrationsView: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationSystem[]>(INTEGRATIONS_DATA);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [activePayloadId, setActivePayloadId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTestingApi, setIsTestingApi] = useState<boolean>(false);
  const [apiTestResponse, setApiTestResponse] = useState<any | null>(null);

  const handleSyncNow = (id: string, name: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      setIntegrations(prev => prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            lastSync: 'Hozirgina sinxronlandi',
            recordsTransferredToday: item.recordsTransferredToday + 45
          };
        }
        return item;
      }));
      setToastMessage(`${name} bilan ma'lumotlar to'liq sinxronlandi!`);
      setTimeout(() => setToastMessage(null), 3000);
    }, 1200);
  };

  const handleRunApiTest = () => {
    setIsTestingApi(true);
    setApiTestResponse(null);
    setTimeout(() => {
      setIsTestingApi(false);
      setApiTestResponse({
        status: 200,
        statusText: "OK",
        responseTime: "38ms",
        gateway: "EduVision HEMIS Enterprise Bridge v2.4",
        recordsProcessed: 29,
        verifiedStudents: [
          { id: "ST-2023-0055", name: "Jasur Saidov", status: "present", confidence: 0.99 },
          { id: "ST-2023-0841", name: "Dilshod Rasulov", status: "present_with_warning", confidence: 0.94 }
        ],
        signature: "SHA256_RSA_VERIFIED"
      });
      setToastMessage("HEMIS API POST testi 200 OK kodi bilan muvaffaqiyatli yakunlandi!");
      setTimeout(() => setToastMessage(null), 3500);
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Network className="w-4 h-4" />
            <span>Tashqi Integratsiyalar Moduli</span>
            <span>·</span>
            <span>HEMIS, LMS, HR va Botlar Shlyuzi</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Markaziy Server Integratsiya Markazi
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSyncNow('all', 'Barcha tizimlar')}
            disabled={syncingId !== null}
            className="px-3.5 py-2 text-xs font-medium bg-purple-950/60 border border-purple-800/60 hover:bg-purple-900/60 text-purple-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncingId ? 'animate-spin' : ''}`} />
            <span>Barchasini Sinxronlash</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-xl bg-purple-950/80 border border-purple-800 text-purple-200 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive HEMIS API Testing Console Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-800/50 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Jonli HEMIS API Davomat Test Konsoli</h3>
              <p className="text-xs text-slate-400">Yuzni tanish orqali aniqlangan davomatni vazirlik HEMIS serveriga yuborishni sinash</p>
            </div>
          </div>

          <button
            onClick={handleRunApiTest}
            disabled={isTestingApi}
            className="px-4 py-2 text-xs font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shadow"
          >
            <Play className={`w-3.5 h-3.5 ${isTestingApi ? 'animate-spin' : ''}`} />
            <span>{isTestingApi ? "Uzatilmoqda..." : "POST Test So'rovini Yuborish"}</span>
          </button>
        </div>

        {apiTestResponse && (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300 space-y-1 animate-fade-in">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-900 pb-1">
              <span>HTTP/2 {apiTestResponse.status} {apiTestResponse.statusText} · Kechikish: {apiTestResponse.responseTime}</span>
              <span className="text-emerald-400 font-bold">● SIGNED & VERIFIED</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto pt-1">{JSON.stringify(apiTestResponse, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((sys) => {
          const isSyncing = syncingId === sys.id || syncingId === 'all';
          const isPayloadOpen = activePayloadId === sys.id;

          return (
            <div
              key={sys.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">{sys.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 inline-block mt-1">
                      {sys.category}
                    </span>
                  </div>

                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Aktiv</span>
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {sys.description}
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Oxirgi yangilanish:</span>
                    <span className="text-slate-200 font-mono">{sys.lastSync}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Oraliq davr:</span>
                    <span className="text-slate-200">{sys.syncFrequency}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Bugungi uzatilgan:</span>
                    <span className="text-cyan-400 font-mono font-bold tabular-nums">
                      {sys.recordsTransferredToday.toLocaleString()} yozuv
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActivePayloadId(isPayloadOpen ? null : sys.id)}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{isPayloadOpen ? "Yopish" : "API Payload"}</span>
                </button>

                <button
                  onClick={() => handleSyncNow(sys.id, sys.name)}
                  disabled={isSyncing}
                  className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
                  <span>{isSyncing ? "Sinxronlanmoqda..." : "Sinxronlash"}</span>
                </button>
              </div>

              {/* Sample API Payload JSON view */}
              {isPayloadOpen && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300/90 overflow-x-auto space-y-1">
                  <div className="text-[10px] text-slate-500">// Real-time Webhook Payload</div>
                  <pre>{JSON.stringify({
                    service: sys.name,
                    status: "200_OK",
                    endpoint: sys.endpoint,
                    timestamp: new Date().toISOString(),
                    data_schema: "v2.4_standard_education",
                    encryption: "AES_256_GCM"
                  }, null, 2)}</pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
