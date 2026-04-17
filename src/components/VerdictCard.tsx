'use client';

import React from 'react';

interface VerdictCardProps {
  verdict: {
    status: 'good' | 'caution' | 'bad';
    reasonTh: string;
    reasonEn: string;
  };
}

const VerdictCard: React.FC<VerdictCardProps> = ({ verdict }) => {
  const statusClass = `status-${verdict.status}`;
  
  return (
    <div className={`verdict-box ${statusClass}`}>
      <span className="verdict-status">
        {verdict.status === 'good' ? '✓ ดี' : verdict.status === 'caution' ? '! ระวัง' : '✗ เสีย'}
      </span>
      <p className="verdict-reason">{verdict.reasonTh}</p>
      <span className="verdict-en">{verdict.reasonEn}</span>
    </div>
  );
};

export default VerdictCard;
