import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', ...props }) => {
  return (
    <div 
      className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-md ${className}`} 
      {...props}
    />
  );
};

export default Skeleton;