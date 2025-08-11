
'use client';

import React from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useDndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { KanbanCard } from './kanban-card';
import { cn } from '@/lib/utils';

type Job = {
  id: string;
  title: string;
  orderType: string;
  urgency: 'High' | 'Medium' | 'Low';
  status: string;
  stage: 'Pending' | 'WIP' | 'Completed';
};

type Column = {
  id: 'Pending' | 'WIP' | 'Completed';
  title: string;
};

export function KanbanColumn({
  column,
  jobs,
}: {
  column: Column;
  jobs: Job[];
}) {
  const { setNodeRef, isOver, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex flex-col h-full',
      )}
    >
      <div className="bg-muted/50 p-4 rounded-lg rounded-b-none border border-b-0 flex justify-between items-center">
        <h3 className="font-semibold">{column.title}</h3>
        <span className="text-sm font-medium bg-primary/20 text-primary rounded-full px-2 py-0.5">
          {jobs.length}
        </span>
      </div>
      <div className={cn(
        "flex-1 bg-muted/50 p-4 rounded-lg rounded-t-none border transition-colors",
        isOver && "ring-2 ring-primary"
      )}>
        <SortableContext items={jobs.map(j => j.id)}>
            <div className="space-y-4">
                {jobs.map((job) => (
                    <KanbanCard key={job.id} job={job} />
                ))}
            </div>
        </SortableContext>
      </div>
    </div>
  );
}
