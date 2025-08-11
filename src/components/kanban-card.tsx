
'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';

type Job = {
  id: string;
  title: string;
  orderType: string;
  urgency: 'High' | 'Medium' | 'Low';
  status: string;
  stage: 'Pending' | 'WIP' | 'Completed';
};

export function KanbanCard({ job, isOverlay }: { job: Job, isOverlay?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: job.id,
    data: {
      type: 'Job',
      job,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "mb-4 bg-card/80 backdrop-blur-sm",
        isDragging && "opacity-50 ring-2 ring-primary",
        isOverlay && "ring-2 ring-primary shadow-lg"
      )}
    >
      <CardHeader className="p-4 relative">
        <CardTitle className="text-base font-medium pr-6">{job.title}</CardTitle>
        <div 
          {...attributes}
          {...listeners}
          className="absolute right-2 top-2 p-1 text-muted-foreground cursor-grab active:cursor-grabbing"
        >
            <GripVertical className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="text-sm text-muted-foreground">{job.id} &middot; {job.orderType}</div>
        <div className="flex justify-between items-center">
          <Badge
            variant={
              job.urgency === 'High'
                ? 'destructive'
                : job.urgency === 'Medium'
                ? 'secondary'
                : 'outline'
            }
          >
            {job.urgency}
          </Badge>
          <Badge variant="outline">{job.status}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
