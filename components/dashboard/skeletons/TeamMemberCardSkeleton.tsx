import React from 'react';
import Skeleton from '../../ui/Skeleton';

const TeamMemberCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-lg" />
        </div>
        
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        
        <Skeleton className="h-6 w-24 rounded-full" />

        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
            <div className="flex items-center gap-2">
                 <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                 <Skeleton className="h-3.5 w-full" />
            </div>
            <div className="flex items-center gap-2">
                 <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                 <Skeleton className="h-3.5 w-2/3" />
            </div>
        </div>

        <div className="mt-6">
            <Skeleton className="h-10 w-full rounded-xl" />
        </div>
    </div>
  );
};

export default TeamMemberCardSkeleton;