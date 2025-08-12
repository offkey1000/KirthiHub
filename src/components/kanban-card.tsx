
'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Job = {
  id: string;
  title: string;
  orderType: string;
  urgency: 'High' | 'Medium' | 'Low';
  status: string;
  stage: 'Pending' | 'WIP' | 'Completed';
};

export function KanbanCard({ job, isOverlay }: { job: Job, isOverlay?: boolean }) {
    const router = useRouter();
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

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when dragging
    if (isDragging) {
        e.preventDefault();
        return;
    }
    // Prevent click event from firing on the drag handle
    if ((e.target as HTMLElement).closest('[data-dnd-handle]')) {
        return;
    }
    router.push(`/dashboard/jobs/${job.id}`);
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      onClick={handleCardClick}
      className={cn(
        "mb-4 bg-card/80 backdrop-blur-sm cursor-pointer hover:ring-2 hover:ring-primary/50",
        isDragging && "opacity-50 ring-2 ring-primary",
        isOverlay && "ring-2 ring-primary shadow-lg"
      )}
    >
      <div {...attributes} {...listeners} data-dnd-handle className="sr-only">
        Drag Handle
      </div>

      <CardHeader className="p-4 relative flex flex-row items-start justify-between">
        <CardTitle className="text-base font-medium pr-6">{job.title}</CardTitle>
         <div 
          {...attributes}
          {...listeners}
          className="p-1 text-muted-foreground cursor-grab active:cursor-grabbing flex-shrink-0"
           onClick={(e) => e.stopPropagation()} // Prevent card click when grabbing handle
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
