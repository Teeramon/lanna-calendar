/**
 * Comprehensive Lanna Lunar & Auspicious Date Logic
 * Includes Wan Phra (P), Wan Sia (X), and Kao Kong (K) calculations
 * with activity context and rule reasoning.
 */

export type Activity = 'general' | 'wedding' | 'ordination' | 'housewarming' | 'store' | 'cremation' | 'merit';

export interface LannaDate {
  lannaMonth: number;
  lunarDay: number;
  isWaxing: boolean;
  csYear: number;
  dayOfWeek: number; // 0=Sun, 6=Sat
}

export interface DimensionStatus {
  isActive: boolean;
  reason: string;
  label: string;
}

export interface DayAssessment {
  flags: {
    P: DimensionStatus;
    X: DimensionStatus;
    K: DimensionStatus;
  };
  verdict: {
    status: 'good' | 'caution' | 'bad';
    reasonTh: string;
    totalScore: number;
  };
}

/**
 * Calculates Gregorian to Julasakarat (CS) and Lanna Lunar Date
 */
export function getLannaDate(date: Date): LannaDate {
  const MS_PER_DAY = 86400000;
  const EPOCH_CS0 = -1356052800000; // AD 638 (Simplified CS anchor)
  const diffDays = Math.floor((date.getTime() - EPOCH_CS0) / MS_PER_DAY);
  
  const SYNODIC_MONTH = 29.530588;
  const SOLAR_YEAR = 365.25875;
  
  const csYear = Math.floor(diffDays / SOLAR_YEAR);
  const dayOfYear = diffDays % SOLAR_YEAR;
  
  // Lanna Month = Thai Month + 2
  // Simplified approximation for demo
  const monthApprox = (Math.floor(dayOfYear / SYNODIC_MONTH) + 1) % 12 || 12;
  const lannaMonth = (monthApprox + 2) % 12 || 12;
  
  const dayOfLunarMonth = Math.floor(dayOfYear % SYNODIC_MONTH) + 1;
  const isWaxing = dayOfLunarMonth <= 15;
  const lunarDay = isWaxing ? dayOfLunarMonth : dayOfLunarMonth - 15;

  return {
    lannaMonth,
    lunarDay: Math.min(lunarDay, 15),
    isWaxing,
    csYear: csYear + 4, // Adjust for CS era
    dayOfWeek: date.getDay(),
  };
}

/**
 * Assessment logic based on Lanna months and user activity
 */
export function getDayAssessment(date: Date, activity: Activity = 'general'): DayAssessment {
  const lDate = getLannaDate(date);
  const { lannaMonth, dayOfWeek, lunarDay, isWaxing } = lDate;

  // 1. [P] Wan Phra Logic
  const isWanPhra = lunarDay === 8 || lunarDay === 14 || lunarDay === 15;
  const pStatus: DimensionStatus = {
    isActive: isWanPhra,
    label: 'วันพระ',
    reason: isWanPhra ? (lunarDay === 15 ? 'วันพระใหญ่ (วันศีลถ้วน)' : 'วันพระวันศีล') : 'ไม่ใช่วันศีล',
  };

  // 2. [X] Wan Sia (Monthly forbidden days)
  // Rules found from research:
  // 1, 5, 9: Sun, Mon
  // 2, 6, 10: Tue
  // 3, 7, 11: Sat, Thu
  // 4, 8, 12: Fri, Wed
  let isWanSia = false;
  let siaReason = 'ไม่ใช่วันท้องถิ่นต้องห้าม';

  const dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

  if ([1, 5, 9].includes(lannaMonth) && [0, 1].includes(dayOfWeek)) isWanSia = true;
  else if ([2, 6, 10].includes(lannaMonth) && dayOfWeek === 2) isWanSia = true;
  else if ([3, 7, 11].includes(lannaMonth) && [4, 6].includes(dayOfWeek)) isWanSia = true;
  else if ([4, 8, 12].includes(lannaMonth) && [3, 5].includes(dayOfWeek)) isWanSia = true;

  if (isWanSia) {
      const forbiddenDays = 
          [1, 5, 9].includes(lannaMonth) ? 'วันอาทิตย์และจันทร์' :
          [2, 6, 10].includes(lannaMonth) ? 'วันอังคาร' :
          [3, 7, 11].includes(lannaMonth) ? 'วันพฤหัสบดีและเสาร์' : 'วันพุธและศุกร์';
      siaReason = `เดือน ${lannaMonth} ห้าม${forbiddenDays}`;
  }
  
  const xStatus: DimensionStatus = {
    isActive: isWanSia,
    label: 'วันเสีย',
    reason: siaReason,
  };

  // 3. [K] Kao Kong (Forbidden for Cremation)
  // Traditional rule: 1, 5, 9, 13 (Waxing/Waning)
  const isKaoKong = [1, 5, 9, 13].includes(lunarDay);
  const kStatus: DimensionStatus = {
    isActive: isKaoKong,
    label: 'เก้ากอง',
    reason: isKaoKong ? `วันเก้ากอง (${lunarDay} ค่ำ) ห้ามงานศพ` : 'ไม่ใช่เก้ากอง',
  };

  // --- Verdict Calculation based on Activity ---
  let score = 100;
  let verdictStatus: 'good' | 'caution' | 'bad' = 'good';
  let reasonTh = 'วันดีมาก — ทำบุญได้ งานมงคลได้ทุกอย่าง';

  if (isWanSia) score -= 60;
  if (isWanPhra && activity !== 'merit') score -= 20; // Some avoid work on Phra
  if (isKaoKong && activity === 'cremation') score -= 100;

  // Contextual reasoning
  if (activity === 'cremation') {
      if (isKaoKong) {
          verdictStatus = 'bad';
          reasonTh = '✕ ห้ามฌาปนกิจ — วันเก้ากอง เป็นอัปมงคลอย่างยิ่งต่อผู้วายชนม์';
      } else if (isWanSia) {
          verdictStatus = 'caution';
          reasonTh = '✧ วันตกเสีย — ไม่แนะนำให้จัดงานศพหรือทำพิธีสำคัญ';
      } else {
          reasonTh = '✓ วันดี — สามารถประกอบพิธีได้ตามปกติ';
      }
  } else {
      // General Auspicious
      if (isWanSia && isKaoKong) {
          verdictStatus = 'bad';
          reasonTh = '✕ วันเสียซ้อน — เป็นทั้งวันเสียและเก้ากอง ห้ามงานมงคลทุกอย่าง';
      } else if (isWanSia) {
          verdictStatus = 'bad';
          reasonTh = `✕ วันเสีย — ${siaReason} ไม่ควรทำการมงคล`;
      } else if (isKaoKong) {
          verdictStatus = 'caution';
          reasonTh = '✧ วันเก้ากอง — แม้จะห้ามงานศพ แต่บางตำราก็เลี่ยงงานมงคลด้วย';
      } else if (isWanPhra) {
          reasonTh = '✿ วันพระ — เหมาะแก่การทำบุญ ฟังธรรม เริ่มต้นสิ่งดีๆ';
      }
  }

  return {
    flags: { P: pStatus, X: xStatus, K: kStatus },
    verdict: { status: verdictStatus, reasonTh, totalScore: score },
  };
}
