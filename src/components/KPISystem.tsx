import React, { useState } from 'react';
import { 
  BarChart3, 
  Award, 
  Clock, 
  Users, 
  Star, 
  TrendingUp, 
  Search, 
  Filter, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { TeacherKPI } from '../types';
import { TEACHERS_KPI_DATA } from '../data/mockData';

export const KPISystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherKPI | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'high' | 'needs_attention'>('all');
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const filteredTeachers = TEACHERS_KPI_DATA.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty = selectedFaculty === 'all' || t.faculty === selectedFaculty;
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'high' && t.status === 'high') || 
                          (statusFilter === 'needs_attention' && t.status === 'needs_attention');
    return matchesSearch && matchesFaculty && matchesStatus;
  });

  const handleExportKPI = () => {
    const csv = `O'qituvchi,Kafedra,Dars Sifati,Intizom,Talaba Ishtiroki,Feedback,Umumiy KPI\n` +
      filteredTeachers.map(t => `"${t.name}","${t.department}",${t.qualityScore}%,${t.punctuality}%,${t.studentEngagement}%,${t.studentFeedbackScore},${t.overallRating}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `EduVision_KPI_Reyting_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExportMessage("O'qituvchilar KPI hisoboti muvaffaqiyatli yuklandi!");
    setTimeout(() => setExportMessage(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex-wrap">
            <BarChart3 className="w-4 h-4" />
            <span>KPI Tizimi</span>
            <span>·</span>
            <span>SamDU Denov Tadbirkorlik va Pedagogika Instituti (DTPI)</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Akademik Sifat va Pedagogik Reyting Markazi
          </h2>
        </div>

        <button
          onClick={handleExportKPI}
          className="px-3.5 py-2 text-xs font-medium bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>KPI Hisobotini Yuklab Olish</span>
        </button>
      </div>

      {exportMessage && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* KPI Overview Pillars (from Infographic) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>O'qituvchi reytingi</span>
          </div>
          <div className="text-xl font-bold text-white mt-1 font-mono tabular-nums">91.4 / 100</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Universitet o'rtacha</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Dars sifati</span>
          </div>
          <div className="text-xl font-bold text-white mt-1 font-mono tabular-nums">89.2%</div>
          <div className="text-[11px] text-purple-400 mt-0.5">Yuqori qoniqish</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Darsga o'z vaqtida kelish</span>
          </div>
          <div className="text-xl font-bold text-white mt-1 font-mono tabular-nums">96.8%</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Intizom namunali</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Talaba ishtiroki</span>
          </div>
          <div className="text-xl font-bold text-white mt-1 font-mono tabular-nums">87.5%</div>
          <div className="text-[11px] text-blue-400 mt-0.5">Interfaol muhit</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span>Talabalar bahosi</span>
          </div>
          <div className="text-xl font-bold text-white mt-1 font-mono tabular-nums">4.73 / 5.0</div>
          <div className="text-[11px] text-amber-400 mt-0.5">Anonim so'rovnoma</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="O'qituvchi yoki kafedra qidiruvi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {/* Segmented status filter */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                statusFilter === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => setStatusFilter('high')}
              className={`px-2.5 py-1 rounded transition-colors ${
                statusFilter === 'high' ? 'bg-emerald-950 text-emerald-300 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Top Reyting
            </button>
            <button
              onClick={() => setStatusFilter('needs_attention')}
              className={`px-2.5 py-1 rounded transition-colors ${
                statusFilter === 'needs_attention' ? 'bg-rose-950 text-rose-300 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              E'tibor talab
            </button>
          </div>

          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="all">Barcha fakultetlar</option>
            <option value="Tadbirkorlik va boshqaruv">Tadbirkorlik va boshqaruv</option>
            <option value="Pedagogika va jismoniy madaniyat">Pedagogika va jismoniy madaniyat</option>
            <option value="Aniq va tabiiy fanlar">Aniq va tabiiy fanlar</option>
            <option value="Filologiya va tillarni o'qitish">Filologiya va tillarni o'qitish</option>
          </select>
        </div>
      </div>

      {/* Teachers Rating Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4 font-semibold">O'qituvchi / Lavozim</th>
              <th className="py-3 px-4 font-semibold">Kafedra</th>
              <th className="py-3 px-4 font-semibold text-right">Dars Sifati</th>
              <th className="py-3 px-4 font-semibold text-right">Darsga Kelish</th>
              <th className="py-3 px-4 font-semibold text-right">Talaba Ishtiroki</th>
              <th className="py-3 px-4 font-semibold text-right">Feedback</th>
              <th className="py-3 px-4 font-semibold text-right">Umumiy KPI</th>
              <th className="py-3 px-4 font-semibold text-center">Batafsil</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredTeachers.map((t) => (
              <tr 
                key={t.id}
                className="hover:bg-slate-800/40 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-[11px] text-slate-400">{t.title}</div>
                </td>
                <td className="py-3 px-4 text-slate-300">
                  <div>{t.department}</div>
                  <div className="text-[10px] text-slate-500">{t.faculty}</div>
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-200">
                  <span className="font-semibold">{t.qualityScore}%</span>
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-emerald-400">
                  {t.punctuality}%
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-blue-400">
                  {t.studentEngagement}%
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-amber-400">
                  ★ {t.studentFeedbackScore}
                </td>
                <td className="py-3 px-4 text-right font-mono tabular-nums">
                  <span className={`inline-block px-2 py-0.5 rounded font-bold text-xs ${
                    t.overallRating >= 90 ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-200'
                  }`}>
                    {t.overallRating}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => setSelectedTeacher(t)}
                    className="px-2.5 py-1 text-[11px] text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 rounded transition-colors cursor-pointer"
                  >
                    Profil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Teacher Details Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedTeacher.name}</h3>
                <p className="text-xs text-slate-400">{selectedTeacher.title} · {selectedTeacher.department}</p>
              </div>
              <button
                onClick={() => setSelectedTeacher(null)}
                className="text-slate-400 hover:text-white px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
                <Sparkles className="w-4 h-4" />
                <span>Sun'iy Intellekt Tahliliy Xulosasi:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedTeacher.aiFeedback}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="text-slate-400">Monitoring qilingan darslar:</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">{selectedTeacher.totalClassesMonitored} ta leksiya</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="text-slate-400">Talabalar bahosi (Anonim):</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-0.5">★ {selectedTeacher.studentFeedbackScore} / 5.0</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
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
