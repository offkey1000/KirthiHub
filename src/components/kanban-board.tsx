
'use client';

import React, { useState, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KanbanColumn } from '@/components/kanban-column';
import { KanbanCard } from '@/components/kanban-card';

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

const columns: Column[] = [
  { id: 'Pending', title: 'Pending Orders' },
  { id: 'WIP', title: 'Work In Progress' },
  { id: 'Completed', title: 'Completed' },
];

export function KanbanBoard({ jobs: initialJobs }: { jobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const jobsId = useMemo(() => jobs.map((job) => job.id), [jobs]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const job = jobs.find((j) => j.id === active.id);
    if (job) {
      setActiveJob(job);
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    if (active.id === over?.id || !over) return;

    const activeJob = jobs.find((j) => j.id === active.id);
    const overJob = jobs.find((j) => j.id === over.id);

    if (!activeJob || !overJob) return;

    const activeColumn = activeJob.stage;
    const overColumn = overJob.stage;
    
    // This logic handles moving cards between columns
    if (activeColumn !== overColumn) {
        setJobs(prev => {
            const activeIndex = prev.findIndex(j => j.id === active.id);
            if (activeIndex === -1) return prev;
            
            // Create a new job object with the updated stage
            const updatedJob = { ...prev[activeIndex], stage: overColumn };

            // Create a new array with the updated job
            const newJobs = [...prev];
            newJobs[activeIndex] = updatedJob;

            return newJobs;
        });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveJob(null);
      return;
    }

    if (active.id !== over.id) {
       setJobs(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveJob(null);
  };

  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start h-full p-1">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={jobsId}>
              {columns.map((col) => (
                <KanbanColumn
                  key={col.id}
                  column={col}
                  jobs={jobs.filter((job) => job.stage === col.id)}
                />
              ))}
            </SortableContext>

            <DragOverlay>
              {activeJob ? <KanbanCard job={activeJob} isOverlay /> : null}
            </DragOverlay>
          </DndContext>
        </div>
    </div>
  );
}
