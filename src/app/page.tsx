'use client';

import React, { useState, useEffect } from 'react';
import { getLannaDate, getDayAssessment, Activity } from '@/lib/lanna-logic';
import { getHolidays } from '@/lib/holiday-logic';
import CalendarGrid from '@/components/CalendarGrid';
import DimensionGrid from '@/components/DimensionGrid';
import WeeklySummary from '@/components/WeeklySummary';
import ActivitySelector from '@/components/ActivitySelector';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [activity, setActivity] = useState<Activity>('general');
  const [isModalOpen, setModalOpen] = useState(false);
  
  const [lDate, setLDate] = useState<any>(null);
  const [assessment, setAssessment] = useState<any>(null);
  const [holidays, setHolidays] = useState<any[]>([]);

  useEffect(() => {
    setLDate(getLannaDate(selectedDate));
    setAssessment(getDayAssessment(selectedDate, activity));
    setHolidays(getHolidays(selectedDate));
  }, [selectedDate, activity]);

  const toggleModal = (date: Date) => {
    if (date.toDateString() === selectedDate.toDateString()) {
      setModalOpen(!isModalOpen);
    } else {
      setSelectedDate(date);
      setModalOpen(true);
    }
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  if (!lDate || !assessment) return null;

  const phase = lDate.isWaxing ? 'ขึ้น' : 'แรม';
  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  return (
    <main>
      <header>
        <h1>ปฏิทินล้านนา</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
          สะป๊ะวันดี วันเสีย • ฉบับยืนยันตามตำรา
        </p>
      </header>

      <ActivitySelector currentActivity={activity} onChange={setActivity} />

      <div className="calendar-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <button onClick={prevMonth} className="nav-btn">&larr;</button>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            {monthNames[viewDate.getMonth()]} {viewDate.getFullYear() + 543}
          </h2>
          <button onClick={nextMonth} className="nav-btn">&rarr;</button>
        </div>

        <CalendarGrid 
          currentDate={viewDate} 
          selectedDate={selectedDate} 
          onSelectDate={toggleModal} 
          activity={activity}
        />
      </div>

      <WeeklySummary startDate={selectedDate} activity={activity} />

      {/* Centered Modal Backdrop */}
      <div 
        className={`detail-modal-backdrop ${isModalOpen ? 'active' : ''}`}
        onClick={() => setModalOpen(false)}
      />

      {/* Centered Modal Container */}
      <div className={`detail-modal-container ${isModalOpen ? 'active' : ''}`}>
        <div className="modal-handle" />
        
        {holidays.length > 0 && (
            <div className="holiday-badge" style={{ marginBottom: '1.25rem' }}>
                {holidays.map(h => h.nameTh).join(', ')}
            </div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-brown)', textTransform: 'uppercase', opacity: 0.6 }}>
            รายละเอียดวัน
          </span>
          <h3 className="day-header-lanna" style={{ fontSize: '1.4rem' }}>
            เดือน{lDate.lannaMonth} {phase} {lDate.lunarDay} ค่ำ
          </h3>
          <p className="sub-header-lanna">
            จ.ศ. {lDate.csYear} • {selectedDate.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        <DimensionGrid flags={assessment.flags} />

        <div className={`verdict-banner ${assessment.verdict.status}`} data-score={assessment.verdict.totalScore}>
          <span className="verdict-title">
            {assessment.verdict.status === 'good' ? '✿ วันดี' : assessment.verdict.status === 'caution' ? '✧ ระวัง' : '✕ วันเสีย'}
          </span>
          <p className="verdict-desc">{assessment.verdict.reasonTh}</p>
        </div>
      </div>

      <footer style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.7rem', opacity: 0.4, paddingBottom: '2rem' }}>
        ออกแบบตามจารีตล้านนา • {new Date().getFullYear() + 543}
      </footer>

      <style jsx>{`
        .nav-btn {
          background: #fff;
          border: 1px solid #eee;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 12px;
          color: var(--text-main);
          box-shadow: 0 2px 6px rgba(0,0,0,0.03);
          transition: all 0.2s;
        }
        .nav-btn:hover { background: #f9f9f9; transform: translateY(-1px); }
        .holiday-badge {
            background: var(--color-red);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 700;
            display: inline-block;
            margin: 0 auto;
            display: table;
        }
      `}</style>
    </main>
  );
}
