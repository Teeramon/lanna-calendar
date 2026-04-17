'use client';

import React from 'react';
import { getDayAssessment, Activity } from '@/lib/lanna-logic';
import { getHolidays } from '@/lib/holiday-logic';

interface WeeklySummaryProps {
  startDate: Date;
  activity: Activity;
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ startDate, activity }) => {
  const next7Days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    next7Days.push(d);
  }

  return (
    <div className="weekly-summary-v2">
      <h4 className="glance-title">ภาพรวม 7 วันข้างหน้า</h4>
      <div className="days-row-v2">
        {next7Days.map((date, idx) => {
          const assessment = getDayAssessment(date, activity);
          const holidays = getHolidays(date);
          const isHoliday = holidays.length > 0;
          
          return (
            <div key={idx} className={`day-v2 ${assessment.verdict.status}`}>
              <span className="day-name">{date.toLocaleDateString('th-TH', { weekday: 'short' })}</span>
              <span className="day-num">{date.getDate()}</span>
              
              <div className="status-labels">
                 {assessment.flags.P.isActive && <span className="label-p">P</span>}
                 {assessment.flags.X.isActive && <span className="label-x">X</span>}
                 {assessment.flags.K.isActive && <span className="label-k">K</span>}
              </div>
              
              {isHoliday && <div className="holiday-dot-v2" />}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .weekly-summary-v2 {
          margin-bottom: 2rem;
        }
        .glance-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          padding-left: 4px;
        }
        .days-row-v2 {
          display: flex;
          gap: 6px;
        }
        .day-v2 {
          flex: 1;
          background: #fff;
          border-radius: 16px;
          padding: 8px 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid #eee;
          position: relative;
        }
        .day-v2.bad { background: #fff5f5; border-color: #fee2e2; }
        .day-v2.caution { background: #fffcf0; border-color: #fef3c7; }
        
        .day-name { font-size: 0.6rem; opacity: 0.6; font-weight: 600; }
        .day-num { font-size: 0.9rem; font-weight: 800; margin: 2px 0; }
        
        .status-labels {
          display: flex;
          gap: 2px;
          height: 10px;
        }
        .status-labels span {
          font-size: 0.5rem;
          font-weight: 900;
          line-height: 1;
        }
        .label-p { color: var(--color-p); }
        .label-x { color: var(--color-x); }
        .label-k { color: var(--color-k); }
        
        .holiday-dot-v2 {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--color-red);
        }
      `}</style>
    </div>
  );
};

export default WeeklySummary;
