'use client';

import React from 'react';
import { Activity } from '@/lib/lanna-logic';

interface ActivitySelectorProps {
  currentActivity: Activity;
  onChange: (activity: Activity) => void;
}

const activities: { id: Activity; label: string; icon: string }[] = [
  { id: 'general', label: 'มงคลทั่วไป', icon: '✦' },
  { id: 'wedding', label: 'แต่งงาน', icon: '💍' },
  { id: 'ordination', label: 'บวช', icon: '🕯️' },
  { id: 'housewarming', label: 'ขึ้นบ้านใหม่', icon: '🏠' },
  { id: 'cremation', label: 'งานศพ', icon: '⚓' },
  { id: 'merit', label: 'ทำบุญ', icon: '✿' },
];

const ActivitySelector: React.FC<ActivitySelectorProps> = ({ currentActivity, onChange }) => {
  return (
    <div className="activity-selector">
      <h4 className="selector-title">เลือกประเภทงาน</h4>
      <div className="activity-scroll">
        {activities.map((act) => (
          <button
            key={act.id}
            className={`activity-btn ${currentActivity === act.id ? 'active' : ''}`}
            onClick={() => onChange(act.id)}
          >
            <span className="act-icon">{act.icon}</span>
            <span className="act-label">{act.label}</span>
          </button>
        ))}
      </div>
      <style jsx>{`
        .activity-selector {
          margin-bottom: 2rem;
        }
        .selector-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          padding-left: 4px;
        }
        .activity-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 4px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .activity-scroll::-webkit-scrollbar { display: none; }
        
        .activity-btn {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid #eee;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          color: var(--text-main);
          font-size: 0.85rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        
        .activity-btn.active {
          background: var(--text-main);
          border-color: var(--text-main);
          color: #fff;
          box-shadow: 0 4px 12px rgba(74, 55, 40, 0.2);
        }
        
        .act-icon { font-size: 0.9rem; }
      `}</style>
    </div>
  );
};

export default ActivitySelector;
