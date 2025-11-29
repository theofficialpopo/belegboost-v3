import React from 'react';
import Skeleton from '../../ui/Skeleton';

interface SubmissionRowSkeletonProps {
  gridClass: string;
}

const SubmissionRowSkeleton: React.FC<SubmissionRowSkeletonProps> = ({ gridClass }) => {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl h-20 ${gridClass}`}>
      {/* Client Info */}
      <div className="flex flex-col justify-center gap-2 min-w-0">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-4 rounded-full" />
            <Skeleton className="h-3 w-12" />
        </div>
      </div>

      {/* Advisor */}
      <div className="hidden md:flex flex-col justify-center">
        <div className="flex items-center gap-2.5">
            <Skeleton className="w-6 h-6 rounded-full shrink-0" />
            <div className="flex flex-col gap-1.5 w-full">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-2.5 w-16" />
            </div>
        </div>
      </div>

      {/* Period */}
      <div className="flex flex-col justify-center">
        <Skeleton className="h-3.5 w-28" />
      </div>

      {/* Balance */}
      <div className="flex flex-col justify-center gap-1.5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>

      {/* Timestamp */}
      <div className="hidden lg:flex flex-col justify-center">
        <Skeleton className="h-3.5 w-24" />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
};

export default SubmissionRowSkeleton;