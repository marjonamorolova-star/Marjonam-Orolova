import React, { useState } from 'react';
import { 
  Crown, 
  TrendingUp, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Building, 
  ShieldCheck, 
  ArrowUpRight,
  Send,
  Download,
  Printer
} from 'lucide-react';

export const RectorDashboard: React.FC = () => {
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);
  const [activeDecree, setActiveDecree] = useState<{
    title: string;
    number: string;
    date: string;
    body: string[];
    signatory: string;
  } | null>(null);

  const handleCreateDirective = (actionName: string) => {
    setActiveDecree({
      title: `${actionName.toUpperCase()} TO'G'RISIDA`,
      number: `№ ${Math.floor(Math.random() * 80 + 120)}/B`,
      date: new Date().toLocaleDateString('uz-UZ'),
      body: [
        `1. EduVision Pro sun'iy intellekt monitoring tizimi tomonidan taqdim etilgan 2026-yilgi semestr oraliq tahlil xulosalari ma'lumot uchun qabul qilinsin.`,
        `2. Monitoring natijalari bo'yicha eng yuqori pedagogik ko'rsatkichlarga ega bo'lgan (90 balldan yuqori) professor-o'qituvchilar ro'yxati tasdiqlansin va ularga oylik ish haqining 50 foizi miqdorida maxsus rag'batlantiruvchi ustama belgilansin.`,
        `3. Dars davomati 70 foizdan past bo'lgan va xavf guruhiga kiritilgan talabalar bilan ishlash bo'yicha dekanatlar qoshida Maxsus Maslahat Kengashi tashkil etilsin.`,
        `4. Mazkur buyruq ijrosini nazorat qilish O'quv ishlari bo'yicha direktor o'rinbosari zimmasiga yuklatilsin.`
      ],
      signatory: "Samarqand Davlat Universiteti Denov Tadbirkorlik va Pedagogika Instituti Rektori / Direktori"
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Crown className="w-4 h-4 text-emerald-400" />
            <span>Rektorat & Direktorat Boshqaruv Markazi</span>
            <span>·</span>
            <span>SamDU Denov Tadbirkorlik va Pedagogika Instituti</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Institut Strategik Boshqaruvi va Akademik Sifat Nazorati
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono">
            Hududiy Reyting: <strong>#1 Surxondaryo viloyatida</strong>
          </div>
        </div>
      </div>

      {decisionFeedback && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{decisionFeedback}</span>
        </div>
      )}

      {/* Campus Hero Card with image asset */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
        <div className="relative h-52 sm:h-64 w-full">
          <img
            src="/src/assets/images/dtpi_denov_campus_1790843370044.jpg"
            alt="Denov Tadbirkorlik va Pedagogika Instituti Kampusi"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[11px] font-mono mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EduVision Pro · DTPI Denov Kampusi</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Samarqand Davlat Universiteti Denov Tadbirkorlik va Pedagogika Instituti
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Denov shahri, Surxondaryo viloyati · 6,420 nafar talaba · 340 nafar professor-o'qituvchi · 72 ta raqamlashtirilgan auditoriya
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCreateDirective("Yarim yillik akademik rivojlanish buyrug'i")}
                className="px-3 py-1.5 text-xs font-medium bg-white text-slate-950 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Buyruq Loyihasi</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Key Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">Umumiy ta'lim sifati indeksi</div>
          <div className="text-2xl font-bold text-white mt-1 font-mono tabular-nums">92.4 / 100</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>O'tgan semestrdan +4.2%</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">O'rtacha darsga kelish</div>
          <div className="text-2xl font-bold text-white mt-1 font-mono tabular-nums">91.8%</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>HEMIS bilan 100% muvofiq</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">Auditoriya diqqat konsentratsiyasi</div>
          <div className="text-2xl font-bold text-white mt-1 font-mono tabular-nums">84.2%</div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI kamera tahlili</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-xs text-slate-400">Smartfonga chalg'ish hollari</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 font-mono tabular-nums">-38%</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Avtomatik ogohlantirish samarasida
          </div>
        </div>
      </div>

      {/* AI Strategik Tahlil & Qaror Qabul Qilish */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: AI Executive Analysis */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-purple-900/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Strategik Tahliliy Xulosalari</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Bugun, 11:45</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Sun'iy Intellekt kafedrasi faolligi eng yuqori</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Prof. A. Rustamov va Dots. D. Yoqubov darslarida talabalar diqqati barqaror 88% dan yuqori bo'lib, o'quv dasturlarini o'zlashtirish prognozi 94% ni tashkil qilmoqda.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>115-auditoriyadagi amaliy darslar e'tibor talab qiladi</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Algoritmlar fanidan ma'ruza davomida talabalarning smartfonga chalg'ishi o'rtachadan 18% yuqoriligi aniqlandi. Interfaol amaliy mashg'ulotlarni oshirish tavsiya etiladi.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Ota-onalar bilan Telegram orqali aloqa samaradorligi</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Dars qoldiruvchi 14 nafar talabaning ota-onalariga avtomatik xabar jo'natilgach, ularning 11 nafari darslarga qaytdi (82% qaytish konversiyasi).
              </p>
            </div>
          </div>
        </div>

        {/* Right: Qaror Qabul Qilish & Buyruqlar Loyihalari */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Crown className="w-4 h-4 text-emerald-400" />
              <span>Boshqaruv Qarorlari Qabul Qilish</span>
            </div>
            <span className="text-[11px] text-slate-500">Rektorat vakolati</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-white">Top-3 O'qituvchilarni Rag'batlantirish</div>
                <div className="text-[11px] text-slate-400">KPI natijalari yuqori professorlarga oylik 50% ustama belgilash</div>
              </div>
              <button
                onClick={() => handleCreateDirective("Top o'qituvchilarni rag'batlantirish")}
                className="px-3 py-1.5 text-xs bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 rounded-lg cursor-pointer transition-colors shrink-0"
              >
                Buyruq berish
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-white">Xavf Guruhidagi Talabalar Bo'yicha Komissiya</div>
                <div className="text-[11px] text-slate-400">70% dan past davomatli talabalar bilan individual suhbat</div>
              </div>
              <button
                onClick={() => handleCreateDirective("Talabalar intizomi bo'yicha maxsus komissiya tuzish")}
                className="px-3 py-1.5 text-xs bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 rounded-lg cursor-pointer transition-colors shrink-0"
              >
                Komissiya tuzish
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-white">Auditoriyalar Uskunalarini Yangilash</div>
                <div className="text-[11px] text-slate-400">A-bino 1-qavat auditoriyalariga interaktiv sensorli doskalar o'rnatish</div>
              </div>
              <button
                onClick={() => handleCreateDirective("Moddiy-texnik ta'minotni yangilash")}
                className="px-3 py-1.5 text-xs bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 rounded-lg cursor-pointer transition-colors shrink-0"
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Official Rector Decree Modal */}
      {activeDecree && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-emerald-400 font-bold">RASMIY HUJJAT SHAKLI</span>
              <button
                onClick={() => setActiveDecree(null)}
                className="text-slate-400 hover:text-white px-2 py-1"
              >
                ✕
              </button>
            </div>

            {/* Decree Formal Document Sheet */}
            <div className="bg-white text-slate-900 p-8 rounded-2xl space-y-4 shadow font-serif text-sm">
              <div className="text-center space-y-1 border-b-2 border-slate-900 pb-4">
                <div className="text-xs uppercase tracking-widest font-bold">O'zbekiston Respublikasi Oliy Ta'lim, Fan va Innovatsiyalar Vazirligi</div>
                <div className="text-base font-extrabold uppercase">Samarqand Davlat Universiteti Denov Tadbirkorlik va Pedagogika Instituti</div>
                <div className="text-xl font-bold tracking-wider pt-2">BUYRUQ</div>
                <div className="flex justify-between text-xs font-sans text-slate-600 pt-1">
                  <span>Sana: {activeDecree.date}</span>
                  <span>Denov shahri</span>
                  <span>{activeDecree.number}</span>
                </div>
              </div>

              <div className="text-center font-bold font-sans text-xs uppercase pt-2">
                {activeDecree.title}
              </div>

              <div className="space-y-3 font-sans text-xs text-slate-800 leading-relaxed text-justify">
                {activeDecree.body.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-8 flex justify-between items-end font-sans text-xs">
                <div>
                  <div className="font-bold">{activeDecree.signatory}</div>
                  <div className="text-slate-500 text-[10px]">EduVision Raqamli Imzo bilan tasdiqlangan: #EV-2026-991B</div>
                </div>
                <div className="w-24 h-12 border border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400">
                  [MUHR O'RNI]
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  setDecisionFeedback("Buyruq rasmiy tizimga kiritildi va chop etishga yuborildi!");
                  setActiveDecree(null);
                  setTimeout(() => setDecisionFeedback(null), 3000);
                }}
                className="px-4 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Buyruqni Tasdiqlash & Chop Etish</span>
              </button>

              <button
                onClick={() => setActiveDecree(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
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
