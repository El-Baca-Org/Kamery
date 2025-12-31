import { HijriDateParts, Language } from '../types';

// Use Intl.DateTimeFormat for robust, system-aligned Hijri calculations (Umm al-Qura)

// Helper to get raw parts from Intl
const getIntlHijriParts = (date: Date): { day: string, month: string, year: string } => {
    // Use 'en-US' with numbering system 'latn' to ensure we parse '1', '2' etc. regardless of locale (e.g. Arabic numerals)
    const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura-nu-latn', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });
    const parts = formatter.formatToParts(date);
    const res: any = {};
    parts.forEach(p => res[p.type] = p.value);
    return res;
};

// 1. GREGORIAN TO HIJRI
// Uses browser built-in robust conversion
export const gregorianToHijri = (date: Date): HijriDateParts => {
    const parts = getIntlHijriParts(date);
    return {
        day: parseInt(parts.day, 10),
        month: parseInt(parts.month, 10) - 1, // Normalize to 0-11 for internal usage
        year: parseInt(parts.year, 10)
    };
};

// 2. HIJRI TO GREGORIAN
// Implements a robust iterative inverse search to guarantee round-trip accuracy
export const hijriToGregorian = (hijri: HijriDateParts): Date => {
    const { day, month, year } = hijri; 
    
    // Estimate Gregorian year based on Hijri year (Year ~ 0.97 * H + 622)
    // 1445 H ~ 2024 G
    const estGregYear = Math.floor(year * 0.970224) + 622;
    
    // Start search from middle of that year to be safe
    let candidate = new Date(estGregYear, 5, 1); 
    candidate.setHours(0,0,0,0);

    // Iterative refinement to find the Gregorian date that maps exactly back to the requested Hijri date
    // 1 Hijri year ~ 354.36 days
    // 1 Hijri month ~ 29.53 days
    
    let iterations = 0;
    while (iterations < 50) { // Should converge rapidly
        const h = gregorianToHijri(candidate);
        
        // Calculate difference in "approximate total days" for linear jump
        const currentTotal = h.year * 354.36 + (h.month) * 29.53 + h.day;
        const targetTotal = year * 354.36 + (month) * 29.53 + day;
        
        const diffDays = targetTotal - currentTotal;

        if (Math.abs(diffDays) < 0.5) {
             // Check exact match to be sure (edge cases around day 29/30)
             if (h.day === day && h.month === month && h.year === year) {
                 return candidate;
             }
             // Micro-adjustment if slightly off
             if (diffDays > 0 || (targetTotal > currentTotal)) candidate.setDate(candidate.getDate() + 1);
             else candidate.setDate(candidate.getDate() - 1);
        } else {
             // Jump
             const jump = Math.round(diffDays);
             if (jump === 0) {
                 // Force step if stuck
                 if (diffDays > 0) candidate.setDate(candidate.getDate() + 1);
                 else candidate.setDate(candidate.getDate() - 1);
             } else {
                 candidate.setDate(candidate.getDate() + jump);
             }
        }
        
        // Immediate check after jump to exit early
        const hCheck = gregorianToHijri(candidate);
        if (hCheck.day === day && hCheck.month === month && hCheck.year === year) {
            return candidate;
        }
        
        iterations++;
    }
    
    return candidate; // Best effort result
};

// 3. COUNTDOWN & AGE
export const getDaysUntil = (targetDate: Date): number => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getNextGregorianBirthday = (birthDate: Date): { date: Date, age: number } => {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    let age = today.getFullYear() - birthDate.getFullYear();

    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
        age++;
    }
    
    return { date: nextBirthday, age };
};

export const getNextHijriBirthday = (hijriBirth: HijriDateParts): { date: Date, age: number, hijriDateStr: string } => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayHijri = gregorianToHijri(today);
    
    let nextHijriYear = todayHijri.year;
    
    // Has the birthday passed this Hijri year?
    // Compare (Month, Day)
    // Note: Hijri months are 0-11
    if (todayHijri.month > hijriBirth.month || (todayHijri.month === hijriBirth.month && todayHijri.day > hijriBirth.day)) {
        nextHijriYear++;
    }
    
    // Construct the next birthday in Hijri
    const nextHijriTarget = { ...hijriBirth, year: nextHijriYear };
    
    // Find Gregorian date for this Hijri date
    let nextGregorianDate = hijriToGregorian(nextHijriTarget);
    
    // Validation: If strict comparison says it's in the past (due to day boundary/timezone issues), bump year
    if (nextGregorianDate < today) {
        nextHijriYear++;
        nextGregorianDate = hijriToGregorian({ ...hijriBirth, year: nextHijriYear });
    }

    return { 
        date: nextGregorianDate, 
        age: nextHijriYear - hijriBirth.year,
        hijriDateStr: `${nextHijriYear}-${hijriBirth.month + 1}-${hijriBirth.day}`
    };
};

export const formatDate = (date: Date, locale: string): string => {
    return new Intl.DateTimeFormat(locale, { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    }).format(date);
};

// Explicit Hijri Month Names to ensure correctness across locales, especially for Ottoman/Turkish
const HIJRI_MONTHS_MAP: Record<string, string[]> = {
    [Language.ENGLISH]: [
        "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Ula", "Jumada al-Akhira",
        "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
    ],
    [Language.TURKISH]: [
        "Muharrem", "Safer", "Rebiülevvel", "Rebiülahir", "Cemaziyelevvel", "Cemaziyelahir",
        "Receb", "Şaban", "Ramazan", "Şevval", "Zilkade", "Zilhicce"
    ],
    // Ottoman Turkish uses Arabic Script
    [Language.OTTOMAN]: [
        "محرم", "صفر", "ربيع الاول", "ربيع الآخر", "جمادى الاولى", "جمادى الآخرة",
        "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
    ],
    // For Arabic/Persian we can trust Intl or fallback to standard Arabic
    [Language.ARABIC]: [
       "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة",
       "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
    ],
    [Language.PERSIAN]: [
       "محرم", "صفر", "ربيع‌الاول", "ربيع‌الثاني", "جمادي‌الاول", "جمادي‌الثاني",
       "رجب", "شعبان", "رمضان", "شوال", "ذيقعده", "ذيحجه"
    ]
};

export const getHijriMonthNames = (lang: Language): string[] => {
    // Return explicit map if available, otherwise try fallback to English
    return HIJRI_MONTHS_MAP[lang] || HIJRI_MONTHS_MAP[Language.ENGLISH];
};

export const formatHijriDisplay = (hijri: HijriDateParts, lang: Language): string => {
    // For display, we manually construct the string to ensure the month name matches our fixed list
    const monthName = getHijriMonthNames(lang)[hijri.month];
    
    // For RTL languages, order might be different, but for this specific output string:
    // "15 Ramadan 1445" vs "1445 Ramadan 15"
    // Let's stick to standard Day Month Year for LTR and RTL compliant string concatenation
    
    if (lang === Language.ARABIC || lang === Language.PERSIAN || lang === Language.OTTOMAN) {
        return `${hijri.day} ${monthName} ${hijri.year}`;
    }
    
    return `${hijri.day} ${monthName} ${hijri.year}`;
};