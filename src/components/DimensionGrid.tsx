'use client';

import React from 'react';
import { DimensionStatus } from '@/lib/lanna-logic';

interface DimensionGridProps {
  flags: {
    P: DimensionStatus;
    X: DimensionStatus;
    K: DimensionStatus;
  };
}

const DimensionGrid: React.FC<DimensionGridProps> = ({ flags }) => {
  const items = [
    { key: 'P' as const, status: flags.P, color: 'var(--color-p)' },
    { key: 'X' as const, status: flags.X, color: 'var(--color-x)' },
    { key: 'K' as const, status: flags.K, color: 'var(--color-k)' },
  ];

  return (
    <div className="dimension-grid-classic">
      {items.map(({ key, status, color }) => (
        <div 
          key={key} 
          className={`dim-box-classic ${status.isActive ? 'active' : 'inactive'}`}
          style={{ '--accent': color } as any}
        >
          <div className="dim-head">
            <span className="dim-letter">{key}</span>
            <span className="dim-label-text">{status.label}</span>
          </div>
          <div className="dim-status-pill">
            {status.isActive ? 'ใช่' : 'ไม่ใช่'}
          </div>
          <p className="dim-reason-text">{status.reason}</p>
        </div>
      ))}
      <style jsx>{`
        .dimension-grid-classic {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        .dim-box-classic {
          background: #fdfdfd;
          border: 1px solid #eee;
          padding: 12px 8px;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .dim-box-classic.active {
          border-color: var(--accent);
          background: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .dim-box-classic.inactive {
          opacity: 0.5;
        }
        .dim-head {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
        }
        .dim-letter {
          font-weight: 800;
          font-size: 0.9rem;
          color: var(--accent);
        }
        .dim-label-text {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .dim-status-pill {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 10px;
          border-radius: 100px;
          margin-bottom: 6px;
          background: #f0f0f0;
        }
        .active .dim-status-pill {
          background: var(--accent);
          color: #fff;
        }
        .dim-reason-text {
          font-size: 0.6rem;
          color: var(--text-muted);
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
};

export default DimensionGrid;
