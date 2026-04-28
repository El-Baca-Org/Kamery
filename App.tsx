import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { 
  Person, AppSettings, Language, Theme, CalendarType, Translation, HijriDateParts 
} from './types';
import { translations, isRTL } from './utils/translations';
import { gregorianToHijri, hijriToGregorian, getNextGregorianBirthday, getNextHijriBirthday, getDaysUntil, formatHijriDisplay, formatDate, getHijriMonthNames } from './utils/dateUtils';
import { 
  Settings as SettingsIcon, 
  Plus, 
  Trash2, 
  Calendar, 
  Moon, 
  Sun, 
  User, 
  ChevronRight,
  X,
  Languages,
  Edit2
} from 'lucide-react';

// --- Contexts ---

interface AppContextType {
  settings: AppSettings;
  updateSettings: (s: Partial<AppSettings>) => void;
  people: Person[];
  addPerson: (p: Person) => void;
  updatePerson: (p: Person) => void;
  deletePerson: (id: string) => void;
  t: Translation;
  lang: Language;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// --- Components ---

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20 dark:border-slate-700/50 ring-1 ring-black/5">
        <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100 tracking-tight">{title}</h2>
          <button onClick={onClose} aria-label={useApp().t.close} title={useApp().t.close} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const PersonCard: React.FC<{ person: Person }> = ({ person }) => {
  const { t, lang, deletePerson, updatePerson } = useApp();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Math
  const gDate = new Date(person.gregorianDate);
  const nextG = getNextGregorianBirthday(gDate);
  const daysG = getDaysUntil(nextG.date);

  const hDateParts = person.hijriDate || gregorianToHijri(gDate);
  const nextH = getNextHijriBirthday(hDateParts);
  const daysH = getDaysUntil(nextH.date);

  return (
    <>
    <div className="bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-white dark:border-slate-700/50 hover:scale-[1.01] transition-all duration-300 relative group overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">{person.name}</h3>
          {person.relationship && (
            <span className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase inline-block bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-md mt-1.5">
              {person.relationship}
            </span>
          )}
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
                onClick={() => setIsEditing(true)}
                aria-label={t.editPerson}
                title={t.editPerson}
                className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-xl transition-colors"
            >
                <Edit2 size={18} />
            </button>
            {showDeleteConfirm ? (
                <button 
                onClick={() => deletePerson(person.id)}
                aria-label={t.delete}
                className="p-2 text-red-600 bg-red-50 dark:bg-red-900/30 rounded-xl font-bold text-xs"
                >
                {t.delete}?
                </button>
            ) : (
                <button 
                onClick={() => setShowDeleteConfirm(true)}
                onBlur={() => setTimeout(() => setShowDeleteConfirm(false), 2000)}
                aria-label={t.delete}
                title={t.delete}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                >
                <Trash2 size={18} />
                </button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        {/* Gregorian Side */}
        <div className="bg-gradient-to-br from-gregorian-50 to-emerald-50/50 dark:from-gregorian-900/20 dark:to-emerald-900/10 rounded-2xl p-4 border border-gregorian-100 dark:border-gregorian-800/30 flex flex-col justify-between">
            <div>
                <div className="flex items-center space-x-2 text-gregorian-700 dark:text-gregorian-400 mb-3">
                    <Sun size={18} className="stroke-[2.5]" />
                    <span className="text-xs font-extrabold uppercase tracking-widest opacity-80">{t.gregorian}</span>
                </div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {formatDate(nextG.date, lang === Language.OTTOMAN ? 'tr' : lang)}
                </div>
            </div>
            <div className="mt-4">
                <div className={`text-3xl font-serif font-bold ${daysG === 0 ? 'text-red-500 animate-pulse' : 'text-slate-900 dark:text-white'}`}>
                    {daysG === 0 ? t.today : daysG}
                    {daysG !== 0 && <span className="text-xs font-sans font-medium text-slate-500 ml-1.5 uppercase tracking-wide">{t.daysRemaining}</span>}
                </div>
                <div className="mt-2 text-xs font-semibold text-gregorian-600/80 dark:text-gregorian-400/80">
                    {t.turns} {nextG.age}
                </div>
            </div>
        </div>

        {/* Hijri Side */}
        <div className="bg-gradient-to-br from-hijri-50 to-orange-50/50 dark:from-hijri-900/20 dark:to-orange-900/10 rounded-2xl p-4 border border-hijri-100 dark:border-hijri-800/30 flex flex-col justify-between">
            <div>
                <div className="flex items-center space-x-2 text-hijri-700 dark:text-hijri-500 mb-3">
                    <Moon size={18} className="stroke-[2.5]" />
                    <span className="text-xs font-extrabold uppercase tracking-widest opacity-80">{t.hijri}</span>
                </div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {formatHijriDisplay(person.hijriDate || gregorianToHijri(gDate), lang)}
                </div>
            </div>
            <div className="mt-4">
                <div className={`text-3xl font-serif font-bold ${daysH === 0 ? 'text-red-500 animate-pulse' : 'text-slate-900 dark:text-white'}`}>
                    {daysH === 0 ? t.today : daysH}
                    {daysH !== 0 && <span className="text-xs font-sans font-medium text-slate-500 ml-1.5 uppercase tracking-wide">{t.daysRemaining}</span>}
                </div>
                 <div className="mt-2 text-xs font-semibold text-hijri-600/80 dark:text-hijri-400/80">
                    {t.turns} {nextH.age}
                </div>
            </div>
        </div>
      </div>
    </div>

    <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title={t.editPerson}
      >
        <PersonForm
            initialData={person}
            onClose={() => setIsEditing(false)}
            onSubmit={(p) => {
                updatePerson(p);
                setIsEditing(false);
            }}
        />
      </Modal>
    </>
  );
};

const PersonForm = ({ onClose, onSubmit, initialData }: { onClose: () => void, onSubmit: (p: Person) => void, initialData?: Person }) => {
    const { t, lang } = useApp();
    const [name, setName] = useState(initialData?.name || '');
    const [relationship, setRelationship] = useState(initialData?.relationship || '');
    const [gDate, setGDate] = useState(initialData?.gregorianDate || new Date().toISOString().split('T')[0]);
    const [useManualHijri, setUseManualHijri] = useState(false);
    
    // Dynamic Hijri Month Names based on language
    const hijriMonthNames = useMemo(() => getHijriMonthNames(lang), [lang]);

    // Manual Hijri State
    const [hDay, setHDay] = useState(initialData?.hijriDate?.day || 1);
    const [hMonth, setHMonth] = useState(initialData?.hijriDate?.month || 0);
    const [hYear, setHYear] = useState(initialData?.hijriDate?.year || 1400);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let finalHijri: HijriDateParts;
        if (useManualHijri) {
            finalHijri = { day: Number(hDay), month: Number(hMonth), year: Number(hYear) };
        } else {
            finalHijri = gregorianToHijri(new Date(gDate));
        }

        const person: Person = {
            id: initialData?.id || crypto.randomUUID(),
            name,
            relationship,
            gregorianDate: gDate,
            hijriDate: finalHijri
        };
        onSubmit(person);
        onClose();
    };

    useEffect(() => {
        if (useManualHijri) {
           const calculatedG = hijriToGregorian({ day: Number(hDay), month: Number(hMonth), year: Number(hYear) });
           setGDate(calculatedG.toISOString().split('T')[0]);
        }
    }, [hDay, hMonth, hYear, useManualHijri]);

    useEffect(() => {
        if (!useManualHijri) {
            const h = gregorianToHijri(new Date(gDate));
            setHDay(h.day);
            setHMonth(h.month);
            setHYear(h.year);
        }
    }, [gDate, useManualHijri]);


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.name}</label>
                    <input 
                        required
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
                        placeholder={t.namePlaceholder}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.relationship}</label>
                    <input 
                        type="text" 
                        value={relationship} 
                        onChange={e => setRelationship(e.target.value)} 
                        className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
                        placeholder={t.relationshipPlaceholder}
                    />
                </div>
            </div>

            <div className="p-5 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl space-y-6 border border-slate-100 dark:border-slate-700">
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{t.gregorianDob}</label>
                        <Sun size={16} className="text-gregorian-500"/>
                    </div>
                    <input 
                        type="date" 
                        value={gDate}
                        onChange={e => {
                            setGDate(e.target.value);
                            setUseManualHijri(false);
                        }}
                        className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gregorian-500 outline-none font-medium text-slate-700 dark:text-slate-200"
                    />
                </div>

                <div className="relative py-2">
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200 dark:bg-slate-700"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-slate-50 dark:bg-slate-800 px-3 text-xs text-slate-400 font-medium">
                        Synced
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-2 items-center">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{t.hijriDob}</label>
                        <div className="flex items-center space-x-2">
                             <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${useManualHijri ? 'bg-hijri-100 text-hijri-700' : 'bg-slate-200 text-slate-500'}`}>
                                {useManualHijri ? t.manual : t.auto}
                             </span>
                             <Moon size={16} className="text-hijri-500"/>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <input 
                            type="number" min="1" max="30"
                            value={hDay}
                            onChange={e => { setHDay(parseInt(e.target.value)); setUseManualHijri(true); }}
                            className="w-16 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-medium outline-none focus:ring-2 focus:ring-hijri-500"
                        />
                        <select 
                            value={hMonth}
                            onChange={e => { setHMonth(parseInt(e.target.value)); setUseManualHijri(true); }}
                            className="flex-1 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium outline-none focus:ring-2 focus:ring-hijri-500 text-slate-700 dark:text-slate-200"
                        >
                            {hijriMonthNames.map((m, i) => <option key={i} value={i}>{m}</option>)}
                        </select>
                        <input 
                            type="number"
                            value={hYear}
                            onChange={e => { setHYear(parseInt(e.target.value)); setUseManualHijri(true); }}
                            className="w-20 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-medium outline-none focus:ring-2 focus:ring-hijri-500"
                        />
                    </div>
                </div>
            </div>

            <div className="flex space-x-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    {t.cancel}
                </button>
                <button type="submit" className="flex-1 p-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all transform active:scale-95">
                    {t.save}
                </button>
            </div>
        </form>
    );
};

const SettingsView = ({ onClose }: { onClose: () => void }) => {
    const { settings, updateSettings, t } = useApp();

    return (
        <div className="p-4 space-y-8">
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6">{t.settings}</h2>
            
            <section>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t.language}</h3>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { id: Language.OTTOMAN, label: 'اسكيمز توركجه' }, // Eskimez Türkçe in Arabic script
                        { id: Language.TURKISH, label: 'Türkçe' },
                        { id: Language.ENGLISH, label: 'English' },
                        { id: Language.ARABIC, label: 'العربية' },
                        { id: Language.PERSIAN, label: 'فارسی' },
                    ].map(langOption => (
                        <button
                            key={langOption.id}
                            onClick={() => updateSettings({ language: langOption.id })}
                            className={`p-4 rounded-2xl border text-sm font-bold transition-all ${
                                settings.language === langOption.id 
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-sm' 
                                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                        >
                            {langOption.label}
                        </button>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t.theme}</h3>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                    <button 
                        onClick={() => updateSettings({ theme: Theme.LIGHT })}
                        className={`flex-1 flex items-center justify-center p-3 rounded-xl text-sm font-bold transition-all ${settings.theme === Theme.LIGHT ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Sun size={18} className="mr-2" /> {t.light}
                    </button>
                    <button 
                        onClick={() => updateSettings({ theme: Theme.DARK })}
                        className={`flex-1 flex items-center justify-center p-3 rounded-xl text-sm font-bold transition-all ${settings.theme === Theme.DARK ? 'bg-slate-700 shadow-sm text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Moon size={18} className="mr-2" /> {t.dark}
                    </button>
                    <button 
                        onClick={() => updateSettings({ theme: Theme.SYSTEM })}
                        className={`flex-1 flex items-center justify-center p-3 rounded-xl text-sm font-bold transition-all ${settings.theme === Theme.SYSTEM ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                       <SettingsIcon size={18} className="mr-2" /> {t.system}
                    </button>
                </div>
            </section>

            <section>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t.userName}</h3>
                <input 
                    type="text" 
                    value={settings.userName} 
                    onChange={(e) => updateSettings({ userName: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder={t.userNamePlaceholder}
                />
            </section>

             <button onClick={onClose} className="w-full py-4 mt-8 text-center text-primary-600 dark:text-primary-400 font-bold hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-2xl transition-colors">
                {t.dashboard}
            </button>
        </div>
    );
};

// --- Main App Logic ---

const AppContent = () => {
  const { settings, people, addPerson, t } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');

  if (activeTab === 'settings') {
      return <SettingsView onClose={() => setActiveTab('dashboard')} />;
  }

  const sortedPeople = [...people].sort((a, b) => {
      // Sort by nearest birthday (either Gregorian or Hijri)
      const nextAG = getDaysUntil(getNextGregorianBirthday(new Date(a.gregorianDate)).date);
      const nextBG = getDaysUntil(getNextGregorianBirthday(new Date(b.gregorianDate)).date);
      return nextAG - nextBG;
  });

  return (
    <div className="min-h-screen pb-32 bg-slate-50 dark:bg-slate-950 bg-islamic-pattern bg-fixed">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-5 flex justify-between items-center transition-all duration-300">
        <div>
           <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{t.welcome.replace('{name}', settings.userName || 'User')}</div>
           <h1 className="text-3xl font-serif font-black text-slate-900 dark:text-white tracking-tight">
             {t.appTitle}
           </h1>
        </div>
        <button 
            onClick={() => setActiveTab('settings')}
            aria-label={t.settings}
            title={t.settings}
            className="p-3 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors shadow-sm"
        >
          <SettingsIcon size={22} />
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-2xl mx-auto space-y-6">
        {sortedPeople.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center opacity-60">
                <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-6">
                    <Calendar size={48} className="text-slate-400" />
                </div>
                <p className="text-xl font-serif text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed mb-2">{t.emptyState}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">{t.emptyStateSubtitle}</p>
            </div>
        ) : (
            sortedPeople.map(person => (
                <PersonCard key={person.id} person={person} />
            ))
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setIsAddModalOpen(true)}
          aria-label={t.addPerson}
          title={t.addPerson}
          className="bg-slate-900 dark:bg-primary-600 text-white p-5 rounded-2xl shadow-2xl shadow-slate-900/30 hover:scale-110 hover:-rotate-90 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        >
          <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title={t.addPerson}
      >
        <PersonForm onClose={() => setIsAddModalOpen(false)} onSubmit={addPerson} />
      </Modal>
    </div>
  );
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization
  const [settings, setSettingsState] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('qamarsol_settings');
    return saved ? JSON.parse(saved) : {
      language: Language.TURKISH, // Default to Turkish
      theme: Theme.SYSTEM,
      primaryCalendar: CalendarType.GREGORIAN,
      userName: ''
    };
  });

  const [people, setPeople] = useState<Person[]>(() => {
      const saved = localStorage.getItem('qamarsol_people');
      return saved ? JSON.parse(saved) : [];
  });

  // Effects
  useEffect(() => {
    localStorage.setItem('qamarsol_settings', JSON.stringify(settings));
    
    // Theme Application
    const root = window.document.documentElement;
    const isDark = settings.theme === Theme.DARK || 
      (settings.theme === Theme.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');

    // Language Direction
    const rtl = isRTL(settings.language);
    root.dir = rtl ? 'rtl' : 'ltr';
    root.lang = settings.language;

  }, [settings]);

  useEffect(() => {
    localStorage.setItem('qamarsol_people', JSON.stringify(people));
  }, [people]);

  // Actions
  const updateSettings = (s: Partial<AppSettings>) => setSettingsState(prev => ({ ...prev, ...s }));
  const addPerson = (p: Person) => setPeople(prev => [...prev, p]);
  const updatePerson = (p: Person) => setPeople(prev => prev.map(item => item.id === p.id ? p : item));
  const deletePerson = (id: string) => setPeople(prev => prev.filter(p => p.id !== id));

  const t = translations[settings.language];

  return (
    <AppContext.Provider value={{ settings, updateSettings, people, addPerson, updatePerson, deletePerson, t, lang: settings.language }}>
      {children}
    </AppContext.Provider>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;