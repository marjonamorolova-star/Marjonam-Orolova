export type UserRole = 'rektor' | 'dekanat' | 'oqituvchi' | 'talaba' | 'ota-ona';

export type InterfaceMode = 'web' | 'mobile' | 'telegram';

export type NavigationTab = 
  | 'struktura'
  | 'talaba-portali'
  | 'oqituvchi-portali'
  | 'rektorat'
  | 'veo-video'
  | 'video-monitoring'
  | 'kpi'
  | 'talaba-analitika'
  | 'fakultetlar'
  | 'integratsiya';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  identifier: string; // e.g. HEMIS ID or email
  roleTitle: string;
  departmentOrGroup: string;
  faculty: string;
  phone?: string;
  gpaOrKpi?: string;
  avatarText: string;
  lastLogin: string;
}

export interface BoundingBox {
  id: string;
  type: 'face' | 'attention' | 'phone' | 'teacher';
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  w: number; // percentage (0-100)
  h: number; // percentage (0-100)
  label: string;
  confidence: number;
  status: 'normal' | 'warning' | 'alert';
  detail: string;
}

export interface Auditorium {
  id: string;
  code: string;
  name: string;
  building: string;
  capacity: number;
  currentSubject: string;
  teacher: string;
  group: string;
  studentsPresent: number;
  totalStudents: number;
  focusIndex: number;
  phonesDetected: number;
  qualityScore: number;
  cameraStatus: 'online' | 'warning' | 'offline';
  fps: number;
  imageSrc: string;
  boxes: BoundingBox[];
}

export interface TeacherKPI {
  id: string;
  name: string;
  department: string;
  faculty: string;
  title: string;
  qualityScore: number; // 0-100
  punctuality: number; // %
  studentEngagement: number; // %
  studentFeedbackScore: number; // 0-5
  totalClassesMonitored: number;
  overallRating: number;
  status: 'high' | 'good' | 'needs_attention';
  aiFeedback: string;
}

export interface StudentAnalyticsItem {
  id: string;
  name: string;
  studentId: string;
  group: string;
  faculty: string;
  attendanceRate: number; // %
  focusAverage: number; // %
  phoneDistractionCount: number;
  riskLevel: 'past' | 'orta' | 'yuqori'; // low, medium, high
  examPassPrediction: number; // %
  gpa: number;
  parentContact: string;
  parentName: string;
  recentIncidents: string[];
}

export interface DepartmentSummary {
  id: string;
  name: string;
  dean: string;
  totalStudents: number;
  totalTeachers: number;
  activeAuditoriums: number;
  averageAttendance: number;
  averageFocus: number;
  averageKPI: number;
}

export interface IntegrationSystem {
  id: string;
  name: string;
  description: string;
  category: 'LMS' | 'HR' | 'CRM' | 'Jurnal' | 'Telegram' | 'Boshqa';
  status: 'online' | 'syncing' | 'offline';
  lastSync: string;
  syncFrequency: string;
  recordsTransferredToday: number;
  endpoint: string;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'alert' | 'success';
  module: 'AI Video' | 'HEMIS' | 'KPI' | 'Davomat' | 'Xavfsizlik';
  message: string;
  auditorium?: string;
}
