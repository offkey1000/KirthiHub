
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpRight, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const jobs = [
  {
    id: 'ORD001',
    orderType: 'Customer',
    urgency: 'High',
    createdBy: 'Showroom Staff',
    status: 'Pending Approval',
    assignedTo: 'N/A',
  },
  {
    id: 'STK001',
    orderType: 'Stock',
    urgency: 'Medium',
    createdBy: 'Admin',
    status: 'In Casting',
    assignedTo: 'Artisan_Cast_01',
  },
  {
    id: 'ORD002',
    orderType: 'Customer',
    urgency: 'Low',
    createdBy: 'Showroom Staff',
    status: 'In Filing',
    assignedTo: 'Artisan_File_02',
  },
  {
    id: 'ORD003',
    orderType: 'Customer',
    urgency: 'High',
    createdBy: 'Manufacturing Mgr',
    status: 'In Setting',
    assignedTo: 'Artisan_Set_01',
  },
  {
    id: 'STK002',
    orderType: 'Stock',
    urgency: 'Medium',
    createdBy: 'Admin',
    status: 'In Polishing',
    assignedTo: 'Artisan_Polish_03',
  },
  {
    id: 'ORD004',
    orderType: 'Customer',
    urgency: 'Low',
    createdBy: 'Showroom Staff',
    status: 'QC Pending',
    assignedTo: 'QC_Mgr_01',
  },
  {
    id: 'STK003',
    orderType: 'Stock',
    urgency: 'Medium',
    createdBy: 'Admin',
    status: 'Completed',
    assignedTo: 'N/A',
  },
];

export default function JobsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Jobs</h1>
        <Button asChild>
          <Link href="/dashboard/jobs/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Job
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Job Orders</CardTitle>
          <CardDescription>
            An overview of all job orders in the manufacturing pipeline.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Created by</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead className="text-right">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="font-medium">{job.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {job.orderType}
                    </div>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{job.createdBy}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{job.status}</Badge>
                  </TableCell>
                  <TableCell>{job.assignedTo}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href="#">
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
