import { Auditorium, TeacherKPI, StudentAnalyticsItem, DepartmentSummary, IntegrationSystem, SystemAuditLog, UserProfile, UserRole } from '../types';

export interface AuditoriumFloorRoom {
  id: string;
  code: string;
  name: string;
  floor: number;
  building: string;
  status: 'occupied' | 'empty' | 'maintenance';
  currentTeacher?: string;
  currentSubject?: string;
  currentGroup?: string;
  studentsCount?: number;
  capacity: number;
  temperature: number; // °C
  co2Level: number; // ppm
  cameraActive: boolean;
}

export const AUDITORIUMS_DATA: Auditorium[] = [
  {
    id: 'aud-104',
    code: '104-AUD',
    name: '104-auditoriya (Tadbirkorlik va Biznes Inkubatori)',
    building: 'Bosh bino, 1-qavat',
    capacity: 36,
    currentSubject: 'Tadbirkorlik asoslari va Startap loyihalar',
    teacher: 'Dots. Farhod Boboyev',
    group: 'TB-22/01',
    studentsPresent: 34,
    totalStudents: 36,
    focusIndex: 88,
    phonesDetected: 1,
    qualityScore: 94,
    cameraStatus: 'online',
    fps: 28,
    imageSrc: '/src/assets/images/classroom_cctv_feed_1790839804842.jpg',
    boxes: [
      {
        id: 'box-teacher',
        type: 'teacher',
        x: 18,
        y: 28,
        w: 16,
        h: 46,
        label: 'Dots. F. Boboyev',
        confidence: 0.98,
        status: 'normal',
        detail: 'Pedagogik faollik: 95% · Biznes-reja metodikasini tushuntirmoqda · Ovoz: 71 dB'
      },
      {
        id: 'box-std-1',
        type: 'face',
        x: 42,
        y: 45,
        w: 12,
        h: 22,
        label: 'Jasur Saidov',
        confidence: 0.99,
        status: 'normal',
        detail: 'Davomat: Tasdiqlangan · Diqqat: 92% · Faol tinglovchi'
      },
      {
        id: 'box-std-2',
        type: 'attention',
        x: 58,
        y: 42,
        w: 12,
        h: 24,
        label: 'Shahlo Qosimova',
        confidence: 0.96,
        status: 'normal',
        detail: 'Doskaga qarayapti · Konspekt yozmoqda · Diqqat: 96%'
      },
      {
        id: 'box-std-3',
        type: 'phone',
        x: 74,
        y: 50,
        w: 14,
        h: 26,
        label: 'Dilshod Rasulov',
        confidence: 0.94,
        status: 'alert',
        detail: 'Smartfon ishlatilmoqda (25 daqiqa chalg\'ish) · Ogohlantirildi'
      },
      {
        id: 'box-std-4',
        type: 'face',
        x: 32,
        y: 62,
        w: 14,
        h: 28,
        label: 'Madina Aliyeva',
        confidence: 0.97,
        status: 'normal',
        detail: 'Faol tinglovchi · Savol-javobda muntazam ishtirok'
      }
    ]
  },
  {
    id: 'aud-212',
    code: '212-AUD',
    name: '212-auditoriya (Pedagogik mahorat va STEAM laboratoriyasi)',
    building: 'Pedagogika binosi, 2-qavat',
    capacity: 40,
    currentSubject: 'Boshlang\'ich ta\'lim metodikasi va pedagogik texnologiyalar',
    teacher: 'Prof. Ziyodulla Normatov',
    group: 'BT-21/02',
    studentsPresent: 38,
    totalStudents: 40,
    focusIndex: 91,
    phonesDetected: 0,
    qualityScore: 96,
    cameraStatus: 'online',
    fps: 30,
    imageSrc: '/src/assets/images/smart_lecture_hall_1790839823607.jpg',
    boxes: [
      {
        id: 'box-t2',
        type: 'teacher',
        x: 22,
        y: 24,
        w: 15,
        h: 48,
        label: 'Prof. Z. Normatov',
        confidence: 0.98,
        status: 'normal',
        detail: 'Interfaol pedagogik trening · Ovoz balandligi: 69 dB'
      },
      {
        id: 'box-s2-1',
        type: 'face',
        x: 48,
        y: 40,
        w: 13,
        h: 25,
        label: 'Nargiza Rahmonova',
        confidence: 0.99,
        status: 'normal',
        detail: 'Davomat: Tasdiqlangan · STEAM topshirig\'ini bajarmoqda'
      },
      {
        id: 'box-s2-2',
        type: 'attention',
        x: 66,
        y: 44,
        w: 13,
        h: 24,
        label: 'Nilufar Mamatova',
        confidence: 0.95,
        status: 'normal',
        detail: 'Dars konspektini yuritmoqda · Diqqat: 95%'
      }
    ]
  },
  {
    id: 'aud-305',
    code: '305-AUD',
    name: '305-auditoriya (Raqamli ta\'lim texnologiyalari markazi)',
    building: 'Bosh bino, 3-qavat',
    capacity: 34,
    currentSubject: 'Ta\'limda axborot-kommunikatsiya texnologiyalari (AKT)',
    teacher: 'Katta o\'qituvchi Dilmurod Tursunov',
    group: 'AT-23/01',
    studentsPresent: 32,
    totalStudents: 34,
    focusIndex: 85,
    phonesDetected: 1,
    qualityScore: 89,
    cameraStatus: 'online',
    fps: 26,
    imageSrc: '/src/assets/images/classroom_cctv_feed_1790839804842.jpg',
    boxes: [
      {
        id: 'box-t3',
        type: 'teacher',
        x: 20,
        y: 26,
        w: 16,
        h: 45,
        label: 'D. Tursunov',
        confidence: 0.96,
        status: 'normal',
        detail: 'Elektron doskada dasturiy ta\'lim vositalari namoyishi'
      },
      {
        id: 'box-s3-1',
        type: 'phone',
        x: 52,
        y: 48,
        w: 13,
        h: 24,
        label: 'Otabek Xoliqov',
        confidence: 0.91,
        status: 'alert',
        detail: 'Smartfondan dars mavzusidan tashqari foydalanish (4 daqiqa)'
      }
    ]
  },
  {
    id: 'aud-401',
    code: '401-AUD',
    name: '401-auditoriya (ARM katta ma\'ruzaxonasi)',
    building: 'Axborot-resurs binosi, 4-qavat',
    capacity: 80,
    currentSubject: 'Umumiy pedagogika va psixologiya nazariyasi',
    teacher: 'Dots. Muxsin Mengliyev',
    group: 'PED-22/03',
    studentsPresent: 75,
    totalStudents: 80,
    focusIndex: 90,
    phonesDetected: 0,
    qualityScore: 95,
    cameraStatus: 'online',
    fps: 30,
    imageSrc: '/src/assets/images/smart_lecture_hall_1790839823607.jpg',
    boxes: [
      {
        id: 'box-t4',
        type: 'teacher',
        x: 25,
        y: 20,
        w: 15,
        h: 50,
        label: 'Dots. M. Mengliyev',
        confidence: 0.99,
        status: 'normal',
        detail: 'Leksiya · Talabalar bilan faol muloqot va keys-stadi tahlili'
      }
    ]
  }
];

export const TEACHERS_KPI_DATA: TeacherKPI[] = [
  {
    id: 'prof-1',
    name: 'Dots. Farhod Boboyev',
    department: 'Tadbirkorlik va iqtisodiyot',
    faculty: 'Tadbirkorlik va boshqaruv',
    title: 'Dotsent, PhD',
    qualityScore: 94,
    punctuality: 99,
    studentEngagement: 92,
    studentFeedbackScore: 4.90,
    totalClassesMonitored: 44,
    overallRating: 95.6,
    status: 'high',
    aiFeedback: 'Tadbirkorlik keyslari va amaliy misollar bilan boyitilgan ma\'ruza. Talabalar diqqati barqaror 88% dan yuqori.'
  },
  {
    id: 'prof-2',
    name: 'Prof. Ziyodulla Normatov',
    department: 'Boshlang\'ich ta\'lim metodikasi',
    faculty: 'Pedagogika va jismoniy madaniyat',
    title: 'Professor, DSc',
    qualityScore: 96,
    punctuality: 100,
    studentEngagement: 94,
    studentFeedbackScore: 4.95,
    totalClassesMonitored: 46,
    overallRating: 96.8,
    status: 'high',
    aiFeedback: 'Eng yuqori pedagogik mahorat va STEAM metodikasi ko\'rsatkichi. Akustik tahlil bo\'yicha nutq juda ravon.'
  },
  {
    id: 'prof-3',
    name: 'Dots. Muxsin Mengliyev',
    department: 'Pedagogika va psixologiya',
    faculty: 'Pedagogika va jismoniy madaniyat',
    title: 'Dotsent, PhD',
    qualityScore: 92,
    punctuality: 96,
    studentEngagement: 89,
    studentFeedbackScore: 4.78,
    totalClassesMonitored: 38,
    overallRating: 93.4,
    status: 'high',
    aiFeedback: 'Katta auditoriyani o\'ziga jalb qilish va savol-javob chastotasi a\'lo darajada.'
  },
  {
    id: 'prof-4',
    name: 'Katta o\'qituvchi Dilmurod Tursunov',
    department: 'Matematika va raqamli texnologiyalar',
    faculty: 'Aniq va tabiiy fanlar',
    title: 'Katta o\'qituvchi',
    qualityScore: 84,
    punctuality: 94,
    studentEngagement: 78,
    studentFeedbackScore: 4.30,
    totalClassesMonitored: 34,
    overallRating: 85.2,
    status: 'good',
    aiFeedback: 'Laboratoriya ishlarida ba\'zi talabalar kompyuter orqali boshqa dasturlarga chalg\'iganligi aniqlandi.'
  },
  {
    id: 'prof-5',
    name: 'Dots. Gulnoza Xoliyorova',
    department: 'O\'zbek tili va adabiyoti',
    faculty: 'Filologiya va tillarni o\'qitish',
    title: 'Dotsent',
    qualityScore: 91,
    punctuality: 95,
    studentEngagement: 86,
    studentFeedbackScore: 4.70,
    totalClassesMonitored: 36,
    overallRating: 91.5,
    status: 'high',
    aiFeedback: 'Nutq madaniyati va adabiy tahlil usullari namunali, dars davomati to\'liq.'
  }
];

export const STUDENTS_ANALYTICS_DATA: StudentAnalyticsItem[] = [
  {
    id: 'std-101',
    name: 'Dilshod Rasulov',
    studentId: 'DTPI-2023-0841',
    group: 'TB-22/01',
    faculty: 'Tadbirkorlik va boshqaruv',
    attendanceRate: 67,
    focusAverage: 62,
    phoneDistractionCount: 15,
    riskLevel: 'yuqori',
    examPassPrediction: 46,
    gpa: 2.7,
    parentContact: '+998 90 123 45 67',
    parentName: 'Rasulov Bahrom aka (Denov tumani)',
    recentIncidents: [
      'Tadbirkorlik asoslari darsida 25 daqiqa smartfon ishlatdi',
      'Ketma-ket 3 ta seminar darsiga sababsiz kelmadi',
      'Oraliq nazoratdan qayta topshirish talab qilinadi'
    ]
  },
  {
    id: 'std-102',
    name: 'Kamola Ergasheva',
    studentId: 'DTPI-2023-0192',
    group: 'BT-21/02',
    faculty: 'Pedagogika va jismoniy madaniyat',
    attendanceRate: 73,
    focusAverage: 71,
    phoneDistractionCount: 6,
    riskLevel: 'orta',
    examPassPrediction: 72,
    gpa: 3.3,
    parentContact: '+998 93 987 65 43',
    parentName: 'Ergasheva Nodira opa (Sho\'rchi tumani)',
    recentIncidents: [
      'Davomat chegarasi (73%) xavfli zonada',
      'Ertalabki birinchi juftlikka muntazam 10 daqiqa kechikish'
    ]
  },
  {
    id: 'std-103',
    name: 'Jasur Saidov',
    studentId: 'DTPI-2023-0055',
    group: 'TB-22/01',
    faculty: 'Tadbirkorlik va boshqaruv',
    attendanceRate: 98,
    focusAverage: 93,
    phoneDistractionCount: 1,
    riskLevel: 'past',
    examPassPrediction: 97,
    gpa: 4.9,
    parentContact: '+998 97 555 44 33',
    parentName: 'Saidov Akbar aka (Denov shahri)',
    recentIncidents: [
      'Institutning "Iqtidorli talabalar" stipendiyasi sohibi'
    ]
  },
  {
    id: 'std-104',
    name: 'Madina Aliyeva',
    studentId: 'DTPI-2023-0312',
    group: 'PED-22/03',
    faculty: 'Pedagogika va jismoniy madaniyat',
    attendanceRate: 96,
    focusAverage: 90,
    phoneDistractionCount: 2,
    riskLevel: 'past',
    examPassPrediction: 94,
    gpa: 4.7,
    parentContact: '+998 91 222 33 44',
    parentName: 'Aliyeva Gulnora opa (Sariosiyo tumani)',
    recentIncidents: [
      'STEAM laboratoriyasida mustaqil dars taqdimotini muvaffaqiyatli himoya qildi'
    ]
  },
  {
    id: 'std-105',
    name: 'Bobur Mirzayev',
    studentId: 'DTPI-2023-0974',
    group: 'TB-22/01',
    faculty: 'Tadbirkorlik va boshqaruv',
    attendanceRate: 63,
    focusAverage: 57,
    phoneDistractionCount: 18,
    riskLevel: 'yuqori',
    examPassPrediction: 39,
    gpa: 2.3,
    parentContact: '+998 99 888 77 66',
    parentName: 'Mirzayev Rustam aka (Uzun tumani)',
    recentIncidents: [
      'Oxirgi 1 oyda 20 soat dars qoldirilgan',
      'Telegram bot orqali ota-onaga 3-bor ogohlantirish xati yo\'llandi',
      'Talabalar safidan chetlatish xavfi mavjud'
    ]
  }
];

export const DEPARTMENTS_DATA: DepartmentSummary[] = [
  {
    id: 'dept-tb',
    name: 'Tadbirkorlik va boshqaruv fakulteti',
    dean: 'Dots. Farhod Boboyev',
    totalStudents: 1820,
    totalTeachers: 92,
    activeAuditoriums: 20,
    averageAttendance: 92.6,
    averageFocus: 86.4,
    averageKPI: 93.8
  },
  {
    id: 'dept-ped',
    name: 'Pedagogika va jismoniy madaniyat fakulteti',
    dean: 'Prof. Ziyodulla Normatov',
    totalStudents: 2150,
    totalTeachers: 110,
    activeAuditoriums: 24,
    averageAttendance: 94.8,
    averageFocus: 89.2,
    averageKPI: 95.4
  },
  {
    id: 'dept-atf',
    name: 'Aniq va tabiiy fanlar fakulteti',
    dean: 'Dots. Jasur Eshmurodov',
    totalStudents: 1350,
    totalTeachers: 78,
    activeAuditoriums: 16,
    averageAttendance: 90.2,
    averageFocus: 84.1,
    averageKPI: 89.6
  },
  {
    id: 'dept-fil',
    name: 'Filologiya va tillarni o\'qitish fakulteti',
    dean: 'Dots. Gulnoza Xoliyorova',
    totalStudents: 1100,
    totalTeachers: 60,
    activeAuditoriums: 12,
    averageAttendance: 93.1,
    averageFocus: 87.5,
    averageKPI: 92.1
  }
];

export const FLOOR_ROOMS_DATA: AuditoriumFloorRoom[] = [
  {
    id: 'room-104',
    code: '104',
    name: 'Tadbirkorlik va Biznes Inkubatori',
    floor: 1,
    building: 'Bosh o\'quv bino',
    status: 'occupied',
    currentTeacher: 'Dots. F. Boboyev',
    currentSubject: 'Tadbirkorlik asoslari',
    currentGroup: 'TB-22/01',
    studentsCount: 34,
    capacity: 36,
    temperature: 22.2,
    co2Level: 560,
    cameraActive: true
  },
  {
    id: 'room-105',
    code: '105',
    name: 'Buxgalteriya va Moliya Simulyatsiyasi',
    floor: 1,
    building: 'Bosh o\'quv bino',
    status: 'occupied',
    currentTeacher: 'Katta o\'qituvchi Sh. Xudoyqulov',
    currentSubject: 'Moliyaviy tahlil',
    currentGroup: 'M-22/03',
    studentsCount: 28,
    capacity: 30,
    temperature: 22.8,
    co2Level: 590,
    cameraActive: true
  },
  {
    id: 'room-212',
    code: '212',
    name: 'STEAM va Pedagogik Mahorat Xonasi',
    floor: 2,
    building: 'Pedagogika binosi',
    status: 'occupied',
    currentTeacher: 'Prof. Z. Normatov',
    currentSubject: 'Boshlang\'ich ta\'lim metodikasi',
    currentGroup: 'BT-21/02',
    studentsCount: 38,
    capacity: 40,
    temperature: 22.5,
    co2Level: 575,
    cameraActive: true
  },
  {
    id: 'room-213',
    code: '213',
    name: 'Maktabgacha Ta\'lim Metodikasi',
    floor: 2,
    building: 'Pedagogika binosi',
    status: 'empty',
    capacity: 35,
    temperature: 21.2,
    co2Level: 430,
    cameraActive: true
  },
  {
    id: 'room-305',
    code: '305',
    name: 'Raqamli Ta\'lim Texnologiyalari',
    floor: 3,
    building: 'Bosh o\'quv bino',
    status: 'occupied',
    currentTeacher: 'Katta o\'qituvchi D. Tursunov',
    currentSubject: 'Ta\'limda AKT',
    currentGroup: 'AT-23/01',
    studentsCount: 32,
    capacity: 34,
    temperature: 23.0,
    co2Level: 640,
    cameraActive: true
  },
  {
    id: 'room-401',
    code: '401',
    name: 'ARM Katta Ma\'ruzaxonasi',
    floor: 4,
    building: 'Axborot-resurs binosi',
    status: 'occupied',
    currentTeacher: 'Dots. M. Mengliyev',
    currentSubject: 'Pedagogika nazariyasi',
    currentGroup: 'PED-22/03',
    studentsCount: 75,
    capacity: 80,
    temperature: 22.6,
    co2Level: 680,
    cameraActive: true
  },
  {
    id: 'room-402',
    code: '402',
    name: 'Elektron Kutubxona va Server Xonasi',
    floor: 4,
    building: 'Axborot-resurs binosi',
    status: 'maintenance',
    capacity: 25,
    temperature: 19.8,
    co2Level: 410,
    cameraActive: true
  }
];

export const INTEGRATIONS_DATA: IntegrationSystem[] = [
  {
    id: 'int-hemis',
    name: 'HEMIS Axborot Tizimi (DTPI)',
    description: 'Oliy ta\'lim vazirligi va Denov tadbirkorlik va pedagogika instituti yagona talabalar davomat bazasi bilan ikki tomonlama sinxronizatsiya',
    category: 'Jurnal',
    status: 'online',
    lastSync: 'Hozirgina (8 soniya oldin)',
    syncFrequency: 'Har 5 daqiqada',
    recordsTransferredToday: 17420,
    endpoint: 'https://hemis.dtpi.uz/api/v2/attendance/sync'
  },
  {
    id: 'int-moodle',
    name: 'DTPI Moodle LMS Platformasi',
    description: 'Tadbirkorlik va pedagogika yo\'nalishlari o\'quv-uslubiy majmualari, topshiriqlar va talabalar faolligi tahlili',
    category: 'LMS',
    status: 'online',
    lastSync: '1 daqiqa oldin',
    syncFrequency: 'Real-time Webhook',
    recordsTransferredToday: 9150,
    endpoint: 'https://lms.dtpi.uz/webservice/rest'
  },
  {
    id: 'int-bot',
    name: 'EduVision DTPI Telegram Bot Gateway',
    description: 'Denov instituti ota-onalari, talabalari va dekanatlari uchun avtomatik ogohlantirish boti (@dtpi_eduvision_bot)',
    category: 'Telegram',
    status: 'online',
    lastSync: 'Aktiv (Doimiy ulanish)',
    syncFrequency: 'Instant Push',
    recordsTransferredToday: 3120,
    endpoint: 'https://api.telegram.org/botDtpiEduVisionProBot'
  },
  {
    id: 'int-hr',
    name: '1C & HR Boshqaruv Tizimi (DTPI Kadrlar)',
    description: 'Institut professor-o\'qituvchilari dars soatlari, ishga o\'z vaqtida kelishi va dars jadvali audit integratsiyasi',
    category: 'HR',
    status: 'online',
    lastSync: '5 daqiqa oldin',
    syncFrequency: 'Har soatda',
    recordsTransferredToday: 480,
    endpoint: 'https://hr.dtpi.uz/odata/standard.odata'
  },
  {
    id: 'int-crm',
    name: 'DTPI Talabalar Portali & Yotoqxona Tizimi',
    description: 'Talabalar murojaatlari, to\'lov-shartnoma holati, talabalar turar joyi (TTJ) va dekanat arizalari integratsiyasi',
    category: 'CRM',
    status: 'online',
    lastSync: '12 daqiqa oldin',
    syncFrequency: 'Har 15 daqiqada',
    recordsTransferredToday: 2140,
    endpoint: 'https://crm.dtpi.uz/api/v1/sync'
  }
];

export const SYSTEM_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'log-1',
    timestamp: '11:42:15',
    type: 'alert',
    module: 'AI Video',
    message: '104-auditoriyada (Tadbirkorlik) talaba (D. Rasulov) ketma-ket 25 daqiqa smartfondan foydalandi. Tizim avto-ogohlantirish berdi.',
    auditorium: '104-AUD'
  },
  {
    id: 'log-2',
    timestamp: '11:40:02',
    type: 'success',
    module: 'HEMIS',
    message: '212-auditoriya bo\'yicha 38 nafar talabaning yuz orqali davomati DTPI HEMIS tizimiga muvaffaqiyatli uzatildi.',
    auditorium: '212-AUD'
  },
  {
    id: 'log-3',
    timestamp: '11:35:18',
    type: 'info',
    module: 'KPI',
    message: 'Prof. Ziyodulla Normatovning dars sifati indeksi 96 ball etib belgilandi (STEAM mashg\'ulotida talaba diqqati 91%).',
    auditorium: '212-AUD'
  },
  {
    id: 'log-4',
    timestamp: '11:30:00',
    type: 'warning',
    module: 'Davomat',
    message: '305-auditoriyada rejalashtirilgan 34 talabadan 2 nafari darsga kelmadi (Sababsiz: 1 nafar).',
    auditorium: '305-AUD'
  },
  {
    id: 'log-5',
    timestamp: '11:22:40',
    type: 'success',
    module: 'Xavfsizlik',
    message: 'DTPI serveri 256-bit SSL va ma\'lumotlar shifrlash auditidan muvaffaqiyatli o\'tdi. Zaxira nusxa yaratildi.',
  }
];

export const DEFAULT_USER_PROFILES: Record<UserRole, UserProfile> = {
  talaba: {
    id: 'user-std-1',
    name: 'Jasur Saidov',
    role: 'talaba',
    identifier: 'DTPI-2023-0055',
    roleTitle: 'Talaba (Bakalavr, 3-kurs)',
    departmentOrGroup: 'TB-22/01 guruhi',
    faculty: 'Tadbirkorlik va boshqaruv fakulteti',
    phone: '+998 97 555 44 33',
    gpaOrKpi: 'GPA: 4.90',
    avatarText: 'JS',
    lastLogin: 'Bugun, 08:28 (Face ID orqali)'
  },
  oqituvchi: {
    id: 'user-prof-1',
    name: 'Dots. Farhod Boboyev',
    role: 'oqituvchi',
    identifier: 'DTPI-PROF-104',
    roleTitle: 'Dotsent, PhD · Kafedra mudiri',
    departmentOrGroup: 'Tadbirkorlik va iqtisodiyot kafedrasi',
    faculty: 'Tadbirkorlik va boshqaruv fakulteti',
    phone: '+998 90 321 00 11',
    gpaOrKpi: 'KPI: 95.6 ball',
    avatarText: 'FB',
    lastLogin: 'Bugun, 08:15 (HEMIS orqali)'
  },
  rektor: {
    id: 'user-rek-1',
    name: 'Prof. O. X. Raxmatov',
    role: 'rektor',
    identifier: 'rektor@dtpi.uz',
    roleTitle: 'Institut Rektori / Boshqaruv raisi',
    departmentOrGroup: 'Rektorat & Ilmiy Kengash',
    faculty: 'Samarqand Davlat Universiteti Denov instituti',
    phone: '+998 76 220 01 01',
    gpaOrKpi: 'Samaradorlik: 98.4%',
    avatarText: 'OR',
    lastLogin: 'Bugun, 08:00 (Yagona darcha / OneID)'
  },
  dekanat: {
    id: 'user-dek-1',
    name: 'Dots. Ziyodulla Normatov',
    role: 'dekanat',
    identifier: 'dekanat.ped@dtpi.uz',
    roleTitle: 'Fakultet Dekani, DSc',
    departmentOrGroup: 'Pedagogika dekanati',
    faculty: 'Pedagogika va jismoniy madaniyat fakulteti',
    phone: '+998 91 550 12 34',
    gpaOrKpi: 'Fakultet davomati: 94.8%',
    avatarText: 'ZN',
    lastLogin: 'Bugun, 08:20 (Dekanat tizimi)'
  },
  'ota-ona': {
    id: 'user-parent-1',
    name: 'Saidov Akbar aka',
    role: 'ota-ona',
    identifier: '+998 97 555 44 33',
    roleTitle: 'Ota-ona (Farzand: Jasur Saidov)',
    departmentOrGroup: 'Farzand guruhi: TB-22/01',
    faculty: 'Tadbirkorlik va boshqaruv fakulteti',
    phone: '+998 97 555 44 33',
    gpaOrKpi: 'Farzand davomati: 98%',
    avatarText: 'SA',
    lastLogin: 'Bugun, 08:35 (Telegram Bot orqali)'
  }
};

