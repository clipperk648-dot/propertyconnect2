import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password?.length >= 8,
      lowercase: /[a-z]/?.test(password),
      uppercase: /[A-Z]/?.test(password),
      numbers: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    
    score = Object.values(checks)?.filter(Boolean)?.length;
    
    if (score <= 2) return { score, label: 'Weak', color: 'bg-error' };
    if (score <= 3) return { score, label: 'Fair', color: 'bg-warning' };
    if (score <= 4) return { score, label: 'Good', color: 'bg-blue-500' };
    return { score, label: 'Strong', color: 'bg-success' };
  };

  const getRequirements = (password) => [
    { text: 'At least 8 characters', met: password?.length >= 8 },
    { text: 'One lowercase letter', met: /[a-z]/?.test(password) },
    { text: 'One uppercase letter', met: /[A-Z]/?.test(password) },
    { text: 'One number', met: /\d/?.test(password) },
    { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/?.test(password) }
  ];

  if (!password) return null;

  const strength = getPasswordStrength(password);
  const requirements = getRequirements(password);

  return (
    <div className="mt-2 space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Password strength</span>
          <span className={`text-xs font-medium ${
            strength?.score <= 2 ? 'text-error' :
            strength?.score <= 3 ? 'text-warning' :
            strength?.score <= 4 ? 'text-blue-500' : 'text-success'
          }`}>
            {strength?.label}
          </span>
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5]?.map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-full transition-colors ${
                level <= strength?.score ? strength?.color : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Requirements */}
      <div className="space-y-1">
        {requirements?.map((req, index) => (
          <div key={index} className="flex items-center text-xs">
            <Icon 
              name={req?.met ? "Check" : "X"} 
              size={12} 
              className={`mr-2 ${req?.met ? 'text-success' : 'text-muted-foreground'}`}
            />
            <span className={req?.met ? 'text-success' : 'text-muted-foreground'}>
              {req?.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;