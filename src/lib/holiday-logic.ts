import { getLannaDate, LannaDate } from './lanna-logic';

export interface Holiday {
  nameTh: string;
  nameEn: string;
  isPublicHoliday: boolean;
}

/**
 * Calculates holidays for a given date
 */
export function getHolidays(date: Date): Holiday[] {
  const holidays: Holiday[] = [];
  const gDay = date.getDate();
  const gMonth = date.getMonth(); // 0-11
  const gYear = date.getFullYear();
  
  const lDate = getLannaDate(date);
  
  // 1. Fixed Solar Holidays (Thai National)
  if (gMonth === 0 && gDay === 1) holidays.push({ nameTh: 'วันขึ้นปีใหม่', nameEn: "New Year's Day", isPublicHoliday: true });
  if (gMonth === 3 && gDay === 6) holidays.push({ nameTh: 'วันจักรี', nameEn: 'Chakri Day', isPublicHoliday: true });
  if (gMonth === 4 && gDay === 1) holidays.push({ nameTh: 'วันแรงงานแห่งชาติ', nameEn: 'Labour Day', isPublicHoliday: true });
  if (gMonth === 4 && gDay === 4) holidays.push({ nameTh: 'วันฉัตรมงคล', nameEn: 'Coronation Day', isPublicHoliday: true });
  if (gMonth === 5 && gDay === 3) holidays.push({ nameTh: 'วันเฉลิมพระชนมพรรษา พระราชินี', nameEn: "Queen Suthida's Birthday", isPublicHoliday: true });
  if (gMonth === 6 && gDay === 28) holidays.push({ nameTh: 'วันเฉลิมพระชนมพรรษา ร.10', nameEn: "King Vajiralongkorn's Birthday", isPublicHoliday: true });
  if (gMonth === 7 && gDay === 12) holidays.push({ nameTh: 'วันแม่แห่งชาติ', nameEn: "Mother's Day", isPublicHoliday: true });
  if (gMonth === 9 && gDay === 13) holidays.push({ nameTh: 'วันคล้ายวันสวรรคต ร.9', nameEn: "King Bhumibol Memorial Day", isPublicHoliday: true });
  if (gMonth === 9 && gDay === 23) holidays.push({ nameTh: 'วันปิยมหาราช', nameEn: 'Chulalongkorn Day', isPublicHoliday: true });
  if (gMonth === 11 && gDay === 5) holidays.push({ nameTh: 'วันพ่อแห่งชาติ', nameEn: "Father's Day", isPublicHoliday: true });
  if (gMonth === 11 && gDay === 10) holidays.push({ nameTh: 'วันรัฐธรรมนูญ', nameEn: 'Constitution Day', isPublicHoliday: true });
  if (gMonth === 11 && gDay === 31) holidays.push({ nameTh: 'วันสิ้นปี', nameEn: "New Year's Eve", isPublicHoliday: true });

  // 2. Dynamic Solar Holidays (Songkran)
  // Simplified for demo: April 13-15. 
  // In a full SuriyaYatra impl, these would be calculated.
  if (gMonth === 3 && [13, 14, 15].includes(gDay)) {
    const names = {
        13: { th: 'วันสังขารล่อง', en: 'Songkran (Sangkharn Long)' },
        14: { th: 'วันเนา', en: 'Wan Nao' },
        15: { th: 'วันพญาวัน (ปี๋ใหม่เมือง)', en: 'Phaya Wan (Lanna New Year)' }
    };
    const n = (names as any)[gDay];
    holidays.push({ nameTh: n.th, nameEn: n.en, isPublicHoliday: true });
  }

  // 3. Dynamic Lunar Holidays (Religious)
  // Map Lanna months back to Central Thai for these logic:
  // Lanna 5 Full Moon = Makha Bucha
  // Lanna 8 Full Moon = Visakha Bucha
  // Lanna 10 Full Moon = Asahna Bucha
  if (lDate.lunarDay === 15 && lDate.isWaxing) {
    if (lDate.lannaMonth === 5) holidays.push({ nameTh: 'วันมาฆบูชา', nameEn: 'Makha Bucha Day', isPublicHoliday: true });
    if (lDate.lannaMonth === 8) holidays.push({ nameTh: 'วันวิสาขบูชา', nameEn: 'Visakha Bucha Day', isPublicHoliday: true });
    if (lDate.lannaMonth === 10) holidays.push({ nameTh: 'วันอาสาฬหบูชา', nameEn: 'Asahna Bucha Day', isPublicHoliday: true });
  }
  
  // Khao Phansa: Day after Asahna Bucha
  if (lDate.lannaMonth === 10 && lDate.lunarDay === 1 && !lDate.isWaxing) {
      holidays.push({ nameTh: 'วันเข้าพรรษา', nameEn: 'Khao Phansa Day', isPublicHoliday: true });
  }

  return holidays;
}
