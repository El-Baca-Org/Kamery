export enum CalendarType {
  GREGORIAN = 'GREGORIAN',
  HIJRI = 'HIJRI',
}

export enum Language {
  ENGLISH = 'en',
  TURKISH = 'tr',
  OTTOMAN = 'os',
  ARABIC = 'ar',
  PERSIAN = 'fa',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export interface HijriDateParts {
  day: number;
  month: number; // 0-11
  year: number;
}

export interface Person {
  id: string;
  name: string;
  relationship?: string;
  gregorianDate: string; // ISO String YYYY-MM-DD
  hijriDate?: HijriDateParts; // Stored calculation
  notes?: string;
}

export interface AppSettings {
  language: Language;
  theme: Theme;
  primaryCalendar: CalendarType;
  userName: string;
}

export interface Translation {
  appTitle: string;
  dashboard: string;
  settings: string;
  addPerson: string;
  editPerson: string;
  name: string;
  relationship: string;
  gregorianDob: string;
  hijriDob: string;
  save: string;
  cancel: string;
  delete: string;
  daysRemaining: string;
  turns: string; // "Turns 30"
  theme: string;
  language: string;
  light: string;
  dark: string;
  system: string;
  gregorian: string;
  hijri: string;
  gregorianOnly: string;
  autoCalculated: string;
  today: string;
  tomorrow: string;
  inDays: string;
  userName: string;
  welcome: string;
  emptyState: string;
  emptyStateSubtitle: string;
  manual: string;
  auto: string;
  searchPlaceholder: string;
  noResults: string;
}