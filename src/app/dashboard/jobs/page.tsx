
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { KanbanBoard } from '@/components/kanban-board';

const jobs = [
  {
    id: 'ORD001',
    title: 'Customer Diamond Ring',
    orderType: 'Customer',
    urgency: 'High',
    status: 'Pending Approval',
    stage: 'Pending',
  },
  {
    id: 'STK001',
    title: 'Stock Gold Chain',
    orderType: 'Stock',
    urgency: 'Medium',
    status: 'In Casting',
    stage: 'WIP',
  },
  {
    id: 'ORD002',
    title: 'Custom Necklace',
    orderType: 'Customer',
    urgency: 'Low',
    status: 'In Filing',
    stage: 'WIP',
  },
  {
    id: 'ORD003',
    title: 'Wedding Band Set',
    orderType: 'Customer',
    urgency: 'High',
    status: 'In Setting',
    stage: 'WIP',
  },
  {
    id: 'STK002',
    title: 'Stock Pearl Earrings',
    orderType: 'Stock',
    urgency: 'Medium',
    status: 'In Polishing',
    stage: 'WIP',
  },
  {
    id: 'ORD004',
    title: 'Engraved Bracelet',
    orderType: 'Customer',
    urgency: 'Low',
    status: 'QC Pending',
    stage: 'WIP',
  },
  {
    id: 'STK003',
    title: 'Stock Ruby Pendant',
    orderType: 'Stock',
    urgency: 'Medium',
    status: 'Completed',
    stage: 'Completed',
  },
];

export default function JobsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 lg:p-6 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Job Pipeline</h1>
        <Button asChild>
          <Link href="/dashboard/jobs/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Job
          </Link>
        </Button>
      </div>
      <KanbanBoard jobs={jobs} />
    </div>
  );
}
