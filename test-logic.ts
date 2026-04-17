import { getLannaDate, getDayAssessment } from './src/lib/lanna-logic';

const testCases = [
  { date: new Date(2026, 4, 8), name: 'Case 1: 8 May 2026' },
  { date: new Date(2025, 11, 20), name: 'Case 2: 20 Dec 2025' },
  { date: new Date(2025, 11, 9), name: 'Case 3: 9 Dec 2025' },
  { date: new Date(2025, 9, 6), name: 'Case 4: 6 Oct 2025' },
];

console.log('--- Lanna Calendar Logic Verification ---');

testCases.forEach((tc) => {
  const lDate = getLannaDate(tc.date);
  const assessment = getDayAssessment(tc.date);
  
  const phase = lDate.isWaxing ? 'ขึ้น' : 'แรม';
  console.log(`\nTesting ${tc.name}:`);
  console.log(`Lanna Date: เดือน ${lDate.lannaMonth} ${phase} ${lDate.lunarDay} ค่ำ • จ.ศ. ${lDate.csYear}`);
  console.log(`Flags: P:${assessment.isWanPhra ? 'Y' : 'N'} X:${assessment.isWanSia ? 'Y' : 'N'} K:${assessment.isKaoKong ? 'Y' : 'N'}`);
  console.log(`Verdict: ${assessment.verdict.reasonTh}`);
});
