import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  BrainCircuit, 
  GraduationCap, 
  PhoneCall, 
  Send, 
  Search, 
  Filter, 
  CheckCircle2, 
  TrendingDown, 
  TrendingUp, 
  ShieldAlert,
  ArrowRight,
  User,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { StudentAnalyticsItem } from '../types';
import { STUDENTS_ANALYTICS_DATA } from '../data/mockData';

export const StudentAnalytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'yuqori' | 'orta' | 'past'>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentAnalyticsItem | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  const [parentModalStudent, setParentModalStudent] = useState<StudentAnalyticsItem | null>(null);
  const [customParentMessage, setCustomParentMessage] = useState<string>('');

  const filteredStudents = STUDENTS_ANALYTICS_DATA.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.group.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || s.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const handleOpenParentModal = (student: StudentAnalyticsItem) => {
    setParentModalStudent(student);
    setCustomParentMessage(
      `Hurmatli ${student.parentName}! EduVision tizimi ma'lumotlariga ko'ra, farzandingiz ${student.name} (${student.group}-guruh) oxirgi paytlarda darslarni sababsiz qoldirmoqda (Davomati: ${student.attendanceRate}%). Iltimos, dars intizomini nazorat qilishingizni so'raymiz.`
    );
  };

  const handleSendCustomTelegram = () => {
    if (!parentModalStudent) return;
    setNotificationMsg(`${parentModalStudent.parentName} (${parentModalStudent.parentContact}) ga Telegram bot orqali shaxsiy xabar jo'natildi!`);
    setParentModalStudent(null);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  const handleSendToDean = (student: StudentAnalyticsItem) => {
    setNotificationMsg(`Talaba ${student.name} bo'yicha ma'lumotnoma Dekanat xizmatiga ko'rib chiqish uchun uzatildi.`);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Talaba Analitika Moduli</span>
            <span>·</span>
            <span>AI Bashorat va Risklar Nazorati</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Davomat, Diqqat va Xavf Guruhi Tahlili
          </h2>
        </div>

        {/* Quick summary stats */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Xavf guruhida: <strong>2 nafar</strong></span>
          </div>
        </div>
      </div>

      {notificationMsg && (
        <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-200 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* 5 Analytical Pillars from diagram */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">Umumiy davomat</div>
          <div className="text-xl font-bold text-white mt-1 font-mono tabular-nums">91.8%</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Me'yordan yuqori</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">O'rtacha faollik</div>
          <div className="text-xl font-bold text-white mt-1 font-mono tabular-nums">84.2%</div>
          <div className="text-[11px] text-cyan-400 mt-0.5">Diqqat darajasi</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-rose-900/50 bg-rose-950/10">
          <div className="text-xs text-rose-300 font-medium">Risk talabalar</div>
          <div className="text-xl font-bold text-rose-400 mt-1 font-mono tabular-nums">4.8%</div>
          <div className="text-[11px] text-rose-400 mt-0.5">Nazorat talab</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">Imtihon prognozi (AI)</div>
          <div className="text-xl font-bold text-white mt-1 font-mono tabular-nums">88.6%</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Muvaffaqiyat ehtimoli</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">O'rtacha GPA</div>
          <div className="text-xl font-bold text-white mt-1 font-mono tabular-nums">3.86</div>
          <div className="text-[11px] text-slate-400 mt-0.5">4.0 shkala bo'yicha</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Talaba ismi, ID yoki guruh (masalan KI-22/04)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Risk segment selector */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs w-full sm:w-auto">
          <button
            onClick={() => setRiskFilter('all')}
            className={`px-3 py-1 rounded transition-colors ${
              riskFilter === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setRiskFilter('yuqori')}
            className={`px-3 py-1 rounded transition-colors ${
              riskFilter === 'yuqori' ? 'bg-rose-950 text-rose-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Yuqori xavf
          </button>
          <button
            onClick={() => setRiskFilter('orta')}
            className={`px-3 py-1 rounded transition-colors ${
              riskFilter === 'orta' ? 'bg-amber-950 text-amber-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            O'rta xavf
          </button>
          <button
            onClick={() => setRiskFilter('past')}
            className={`px-3 py-1 rounded transition-colors ${
              riskFilter === 'past' ? 'bg-emerald-950 text-emerald-300 font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Namunali
          </button>
        </div>
      </div>

      {/* Student List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => {
          const isHighRisk = student.riskLevel === 'yuqori';
          const isMediumRisk = student.riskLevel === 'orta';

          return (
            <div
              key={student.id}
              className={`p-4 rounded-2xl bg-slate-900/70 border transition-all ${
                isHighRisk 
                  ? 'border-rose-900/80 bg-rose-950/10' 
                  : isMediumRisk 
                  ? 'border-amber-900/60' 
                  : 'border-slate-800'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white">{student.name}</h4>
                  <div className="text-[11px] text-slate-400">
                    <span>{student.studentId}</span>
                    <span className="mx-1">·</span>
                    <span className="text-cyan-400 font-medium">{student.group}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  isHighRisk 
                    ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                    : isMediumRisk 
                    ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {isHighRisk ? 'YUQORI XAVF' : isMediumRisk ? 'O\'RTA XAVF' : 'NAMUNALI'}
                </span>
              </div>

              {/* Progress metrics */}
              <div className="grid grid-cols-3 gap-2 my-3 text-xs bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                <div>
                  <div className="text-[10px] text-slate-400">Davomat</div>
                  <div className={`font-mono font-bold ${student.attendanceRate < 70 ? 'text-rose-400' : 'text-slate-200'}`}>
                    {student.attendanceRate}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Diqqat</div>
                  <div className="font-mono font-bold text-cyan-300">
                    {student.focusAverage}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">GPA</div>
                  <div className="font-mono font-bold text-slate-200">
                    {student.gpa}
                  </div>
                </div>
              </div>

              {/* AI Forecast Indicator */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Imtihon topshirish ehtimoli (AI)</span>
                  <span className="font-mono text-slate-200">{student.examPassPrediction}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      student.examPassPrediction > 80 ? 'bg-emerald-500' : student.examPassPrediction > 60 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${student.examPassPrediction}%` }}
                  />
                </div>
              </div>

              {/* Quick Incident Note */}
              {student.recentIncidents.length > 0 && (
                <div className="mt-3 p-2 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300 line-clamp-1">
                  ⚠️ {student.recentIncidents[0]}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedStudent(student)}
                  className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                >
                  To'liq profil
                </button>

                {isHighRisk ? (
                  <button
                    onClick={() => handleOpenParentModal(student)}
                    className="px-2.5 py-1 text-xs text-rose-300 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    title="Ota-onasiga ogohlantirish xabari jo'natish"
                  >
                    <Send className="w-3 h-3" />
                    <span>Ota-onaga xabar</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenParentModal(student)}
                    className="px-2.5 py-1 text-xs text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900 border border-cyan-800/40 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Telegram</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Parent Telegram Message Modal */}
      {parentModalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Ota-onaga Telegram Xabarnoma Yuborish</h3>
              </div>
              <button
                onClick={() => setParentModalStudent(null)}
                className="text-slate-400 hover:text-white px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div>Qabul qiluvchi: <strong className="text-white">{parentModalStudent.parentName}</strong></div>
              <div>Telefon: <span className="text-cyan-400 font-mono">{parentModalStudent.parentContact}</span></div>
              <div>Talaba: <span className="text-slate-300">{parentModalStudent.name} ({parentModalStudent.group})</span></div>
            </div>

            {/* Quick Templates */}
            <div className="space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">Tayyor shablonlar:</div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setCustomParentMessage(
                    `Hurmatli ${parentModalStudent.parentName}! Farzandingiz ${parentModalStudent.name}ning davomati ${parentModalStudent.attendanceRate}% ga tushdi. Darslarga to'liq qatnashishini ta'minlashingizni so'raymiz.`
                  )}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] rounded transition-colors"
                >
                  Davomat ogohlantirishi
                </button>
                <button
                  onClick={() => setCustomParentMessage(
                    `Hurmatli ${parentModalStudent.parentName}! Farzandingiz ${parentModalStudent.name} dars davomida smartfonga haddan tashqari chalg'ishi videokuzatuv orqali qayd etildi. E'tiboringizni qaratishingizni so'raymiz.`
                  )}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] rounded transition-colors"
                >
                  Smartfon chalg'ishi
                </button>
                <button
                  onClick={() => setCustomParentMessage(
                    `Assalomu alaykum, ${parentModalStudent.parentName}! Farzandingiz ${parentModalStudent.name} akademik ko'rsatkichlari (GPA: ${parentModalStudent.gpa}) va darsdagi faolligi uchun fakultet rahbariyati tomonidan e'tirof etildi!`
                  )}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] rounded transition-colors"
                >
                  Tashakkurnoma
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Xabar matni (tahrirlashingiz mumkin):</label>
              <textarea
                rows={4}
                value={customParentMessage}
                onChange={(e) => setCustomParentMessage(e.target.value)}
                className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setParentModalStudent(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSendCustomTelegram}
                className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center gap-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Yuborish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Student Full Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedStudent.name}</h3>
                <p className="text-xs text-slate-400">
                  {selectedStudent.studentId} · Guruh: {selectedStudent.group} · {selectedStudent.faculty}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-white px-2 py-1"
              >
                ✕
              </button>
            </div>

            {/* Attendance Heatmap Strip */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Haftalik davomat xaritasi:</span>
                <span className="text-[10px] text-emerald-400">Yashil: Kelgan, Qizil: Qoldirgan</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 pt-1 text-center font-mono text-[10px]">
                {['Dush', 'Sesh', 'Chor', 'Pay', 'Juma'].map((day, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-slate-500">{day}</span>
                    <div className={`h-6 rounded flex items-center justify-center font-bold ${
                      idx === 2 && selectedStudent.riskLevel === 'yuqori' 
                        ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {idx === 2 && selectedStudent.riskLevel === 'yuqori' ? '✕' : '✓'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parent Contact Box */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <div className="text-slate-400">Ota-ona ma'lumoti:</div>
                <div className="font-semibold text-white mt-0.5">{selectedStudent.parentName}</div>
                <div className="text-slate-400 font-mono">{selectedStudent.parentContact}</div>
              </div>
              <button
                onClick={() => handleOpenParentModal(selectedStudent)}
                className="px-3 py-1.5 text-xs bg-blue-950 border border-blue-800 text-blue-300 rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram xabar</span>
              </button>
            </div>

            {/* Incident History List */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">Oxirgi qayd etilgan holatlar:</div>
              <div className="space-y-1.5">
                {selectedStudent.recentIncidents.map((incident, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-rose-400 shrink-0">•</span>
                    <span>{incident}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleSendToDean(selectedStudent)}
                className="px-3 py-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-950/40 border border-rose-800/40 rounded-lg cursor-pointer"
              >
                Dekanatga yuborish
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
