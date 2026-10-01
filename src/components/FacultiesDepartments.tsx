import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  BarChart3, 
  BrainCircuit, 
  DoorOpen, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  MapPin,
  Thermometer,
  Wind,
  Video,
  Grid
} from 'lucide-react';
import { DepartmentSummary } from '../types';
import { DEPARTMENTS_DATA, FLOOR_ROOMS_DATA, AuditoriumFloorRoom } from '../data/mockData';

export const FacultiesDepartments: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<DepartmentSummary | null>(null);
  const [activeView, setActiveView] = useState<'departments' | 'floorplan'>('departments');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<AuditoriumFloorRoom | null>(null);

  const filteredRooms = FLOOR_ROOMS_DATA.filter(r => {
    return selectedBuilding === 'all' || r.building === selectedBuilding;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Fakultet va Bo'limlar Moduli</span>
            <span>·</span>
            <span>Tarkibiy Bo'linmalar Nazorati</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Fakultetlar va Auditoriyalar Faoliyati
          </h2>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setActiveView('departments')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 font-medium ${
                activeView === 'departments' 
                  ? 'bg-amber-950 text-amber-300 border border-amber-800/60 shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Fakultetlar</span>
            </button>
            <button
              onClick={() => setActiveView('floorplan')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 font-medium ${
                activeView === 'floorplan' 
                  ? 'bg-amber-950 text-amber-300 border border-amber-800/60 shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Bino & Xonalar Xaritasi</span>
            </button>
          </div>
        </div>
      </div>

      {activeView === 'departments' ? (
        /* FACULTIES GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEPARTMENTS_DATA.map((dept) => (
            <div
              key={dept.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-700/60 transition-all space-y-4 shadow-sm"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{dept.name}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">Dekan: {dept.dean}</div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-300 font-mono text-xs font-bold">
                  KPI: {dept.averageKPI}
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <div>
                  <div className="text-slate-400">Talabalar:</div>
                  <div className="font-bold text-white font-mono mt-0.5">{dept.totalStudents}</div>
                </div>
                <div>
                  <div className="text-slate-400">O'qituvchilar:</div>
                  <div className="font-bold text-white font-mono mt-0.5">{dept.totalTeachers}</div>
                </div>
                <div>
                  <div className="text-slate-400">Faol auditoriya:</div>
                  <div className="font-bold text-cyan-400 font-mono mt-0.5">{dept.activeAuditoriums} ta</div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>O'rtacha davomat ko'rsatkichi</span>
                    <span className="font-mono text-emerald-400">{dept.averageAttendance}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${dept.averageAttendance}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Darslarda talabalar diqqati</span>
                    <span className="font-mono text-cyan-400">{dept.averageFocus}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${dept.averageFocus}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Video monitoring 100% qamrab olingan</span>
                <button
                  onClick={() => setSelectedDept(dept)}
                  className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>Batafsil ko'rish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* INTERACTIVE FLOOR PLAN / ROOMS MAP */
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Bino filtri:</span>
              <select
                value={selectedBuilding}
                onChange={(e) => setSelectedBuilding(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none"
              >
                <option value="all">Barcha binolar</option>
                <option value="A-bino">A-bino</option>
                <option value="B-bino">B-bino</option>
              </select>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Dars ketmoqda
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span> Bo'sh
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Texnik xizmat
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredRooms.map((room) => {
              const isOccupied = room.status === 'occupied';
              const isMaintenance = room.status === 'maintenance';

              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                    isOccupied 
                      ? 'bg-slate-900/80 border-emerald-900/60 hover:border-emerald-600' 
                      : isMaintenance 
                      ? 'bg-slate-900/40 border-amber-900/40' 
                      : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-mono">{room.code}</span>
                        <span className="text-xs text-slate-300 font-semibold">{room.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">{room.building} · {room.floor}-qavat</div>
                    </div>

                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                      isOccupied ? 'bg-emerald-950 text-emerald-300' : isMaintenance ? 'bg-amber-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isOccupied ? 'BAND' : isMaintenance ? 'TEXNIK' : 'BO\'SH'}
                    </span>
                  </div>

                  {isOccupied && (
                    <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                      <div className="text-white font-semibold truncate">{room.currentSubject}</div>
                      <div className="text-[11px] text-slate-400">{room.currentTeacher}</div>
                      <div className="flex justify-between text-[10px] text-emerald-400 font-mono">
                        <span>Guruh: {room.currentGroup}</span>
                        <span>{room.studentsCount}/{room.capacity} talaba</span>
                      </div>
                    </div>
                  )}

                  {/* Environment & Sensors */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{room.temperature}°C</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-slate-400" />
                      <span>{room.co2Level} ppm CO₂</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Video className="w-3.5 h-3.5" />
                      <span>Kamera ON</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Room Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedRoom.code} - {selectedRoom.name}</h3>
                <p className="text-xs text-slate-400">{selectedRoom.building} · {selectedRoom.floor}-qavat</p>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="text-slate-400 hover:text-white px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Sig'imi:</span>
                <span className="font-mono text-white">{selectedRoom.capacity} o'rin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mikroiqlim harorati:</span>
                <span className="font-mono text-cyan-400">{selectedRoom.temperature}°C (Optimal)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">CO₂ darajasi:</span>
                <span className="font-mono text-slate-200">{selectedRoom.co2Level} ppm (Ventilyatsiya me'yorda)</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRoom(null)}
                className="px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Dept Modal */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedDept.name}</h3>
                <p className="text-xs text-slate-400">Dekan: {selectedDept.dean}</p>
              </div>
              <button
                onClick={() => setSelectedDept(null)}
                className="text-slate-400 hover:text-white px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 font-semibold mb-1">Fakultet kafedralari:</div>
                {selectedDept.id === 'dept-tb' && (
                  <>
                    <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-900">
                      <span>1. Tadbirkorlik va iqtisodiyot kafedrasi</span>
                      <span className="font-mono text-emerald-400">95.6 KPI</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-900">
                      <span>2. Buxgalteriya hisobi va moliya kafedrasi</span>
                      <span className="font-mono text-emerald-400">93.2 KPI</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 py-1">
                      <span>3. Biznesni boshqarish va marketing kafedrasi</span>
                      <span className="font-mono text-cyan-400">92.6 KPI</span>
                    </div>
                  </>
                )}
                {selectedDept.id === 'dept-ped' && (
                  <>
                    <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-900">
                      <span>1. Boshlang'ich ta'lim metodikasi kafedrasi</span>
                      <span className="font-mono text-emerald-400">96.8 KPI</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-900">
                      <span>2. Umumiy pedagogika va psixologiya kafedrasi</span>
                      <span className="font-mono text-emerald-400">94.8 KPI</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 py-1">
                      <span>3. Jismoniy madaniyat va sport kafedrasi</span>
                      <span className="font-mono text-cyan-400">94.6 KPI</span>
                    </div>
                  </>
                )}
                {selectedDept.id === 'dept-atf' && (
                  <>
                    <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-900">
                      <span>1. Matematika va raqamli texnologiyalar kafedrasi</span>
                      <span className="font-mono text-emerald-400">90.8 KPI</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 py-1">
                      <span>2. Tabiiy fanlar (Fizika, Kimyo, Biologiya) kafedrasi</span>
                      <span className="font-mono text-cyan-400">88.4 KPI</span>
                    </div>
                  </>
                )}
                {selectedDept.id === 'dept-fil' && (
                  <>
                    <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-900">
                      <span>1. O'zbek tili va adabiyoti kafedrasi</span>
                      <span className="font-mono text-emerald-400">93.4 KPI</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 py-1">
                      <span>2. Xorijiy tillar va adabiyoti kafedrasi</span>
                      <span className="font-mono text-cyan-400">90.8 KPI</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedDept(null)}
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
