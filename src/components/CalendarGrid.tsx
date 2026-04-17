'use client';

import React from 'react';
import { getDayAssessment, Activity } from '@/lib/lanna-logic';
import { getHolidays } from '@/lib/holiday-logic';

interface CalendarGridProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
  activity: Activity;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, onSelectDate, selectedDate, activity }) => {
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysCount = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const days = [];
  // Padding for start day
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day-empty" />);
  }

  for (let d = 1; d <= daysCount; d++) {
    const date = new Date(year, month, d);
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const isToday = date.toDateString() === new Date().toDateString();
    
    const assessment = getDayAssessment(date, activity);
    const holidays = getHolidays(date);
    const isHoliday = holidays.length > 0;

    days.push(
      <div 
        key={d} 
        className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${assessment.verdict.status}`}
        onClick={() => onSelectDate(date)}
      >
        <span className={isHoliday ? 'text-holiday' : ''}>{d}</span>
        
        <div className="status-dots">
           {assessment.flags.P.isActive && <div className="dot dot-p" />}
           {assessment.flags.X.isActive && <div className="dot dot-x" />}
           {assessment.flags.K.isActive && <div className="dot dot-k" />}
        </div>
      </div>
    );
  }

  const weekHeaders = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  return (
    <div className="calendar-grid">
      {weekHeaders.map(h => (
        <div key={h} className="calendar-day-header">{h}</div>
      ))}
      {days}
      <style jsx>{`
        .status-dots {
          position: absolute;
          bottom: 4px;
          display: flex;
          gap: 2px;
          justify-content: center;
          width: 100%;
        }
        .dot { width: 3px; height: 3px; border-radius: 50%; }
        .dot-p { background-color: var(--color-p); }
        .dot-x { background-color: var(--color-x); }
        .dot-k { background-color: var(--color-k); }
        
        .text-holiday { color: var(--color-red); font-weight: 700; }
        .selected .text-holiday { color: #fff; }
        
        .calendar-day.bad:not(.selected) { background: #fff8f8; }
        .calendar-day.caution:not(.selected) { background: #fffdf0; }
      `}</style>
    </div>
  );
};

export default CalendarGrid;
