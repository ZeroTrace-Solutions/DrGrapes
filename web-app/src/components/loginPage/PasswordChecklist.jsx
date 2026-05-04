import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { getPasswordStrength } from '@shared/utils/validation';

const PasswordChecklist = ({ password }) => {
  const strength = getPasswordStrength(password);

  const checks = [
    { key: 'length', label: '8+ characters', met: strength.length },
    { key: 'casing', label: 'Upper & Lowercase', met: strength.casing },
    { key: 'number', label: 'At least one number', met: strength.number },
    { key: 'special', label: 'Special character', met: strength.special },
  ];

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 px-2">
      {checks.map((item) => (
        <div key={item.key} className="flex items-center gap-1.5">
          {item.met ? (
            <CheckCircle2 className="w-3 h-3 text-green-400" />
          ) : (
            <Circle className="w-3 h-3 text-on-surface-variant/20" />
          )}
          <span className={`text-[9px] font-black uppercase tracking-widest ${item.met ? 'text-green-400' : 'text-on-surface-variant/40'}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PasswordChecklist;
