'use client';

import React from 'react';

interface StepHeaderProps {
  title: string;
  description: string;
}

const StepHeader = ({ title, description }: StepHeaderProps) => {
  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
};

export default StepHeader;
