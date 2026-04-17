/**
 * Thai National Holidays & Lanna Religious Logic
 */

export interface Holiday {
  date: Date;
  nameTh: string;
}

export function getHolidays(date: Date): Holiday[] {
  const holidays: Holiday[] = [];
  const day = date.getDate();
  const month = date.getMonth(); // 0-11
  
  // Fixed Dates (Central Thai Holidays)
  if (month === 0 && day === 1) holidays.push({ date, nameTh: 'วันขึ้นปีใหม่' });
  if (month === 3 && day === 6) holidays.push({ date, nameTh: 'วันจักรี' });
  if (month === 3 && day >= 13 && day <= 15) {
      if (day === 13) holidays.push({ date, nameTh: 'วันสงกรานต์ (สังขารล่อง)' });
      if (day === 14) holidays.push({ date, nameTh: 'วันสงกรานต์ (วันเนา)' });
      if (day === 15) holidays.push({ date, nameTh: 'วันสงกรานต์ (พญาวัน)' });
  }
  if (month === 4 && day === 1) holidays.push({ date, nameTh: 'วันแรงงาน' });
  if (month === 4 && day === 4) holidays.push({ date, nameTh: 'วันฉัตรมงคล' });
  if (month === 6 && day === 28) holidays.push({ date, nameTh: 'วันเฉลิมฯ ร.10' });
  if (month === 7 && day === 12) holidays.push({ date, nameTh: 'วันแม่แห่งชาติ' });
  if (month === 9 && day === 13) holidays.push({ date, nameTh: 'วันคล้ายวันสวรรคต ร.9' });
  if (month === 9 && day === 23) holidays.push({ date, nameTh: 'วันปิยมหาราช' });
  if (month === 11 && day === 5) holidays.push({ date, nameTh: 'วันพ่อแห่งชาติ' });
  if (month === 11 && day === 10) holidays.push({ date, nameTh: 'วันรัฐธรรมนูญ' });
  if (month === 11 && day === 31) holidays.push({ date, nameTh: 'วันสิ้นปี' });

  return holidays;
}
