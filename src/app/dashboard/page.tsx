
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
import { ArrowUpRight, PlusCircle, CircleCheck, CircleX, Clock, Cog } from 'lucide-react';
import Link from 'next/link';

const summaryStats = [
  {
    title: 'Total Jobs',
    value: '7',
    icon: Cog,
    color: 'text-blue-500',
  },
  {
    title: 'Pending Approval',
    value: '1',
    icon: Clock,
     color: 'text-orange-500',
  },
  {
    title: 'Work In Progress',
    value: '5',
    icon: Cog,
     color: 'text-yellow-500',
  },
  {
    title: 'Completed',
    value: '1',
    icon: CircleCheck,
     color: 'text-green-500',
  },
];

const recentActivity = [
    { id: 'ACT001', job: 'ORD003', user: 'Artisan (Setting)', action: 'Marked as complete', time: '2h ago' },
    { id: 'ACT002', job: 'STK002', user: 'Artisan (Polishing)', action: 'Marked as complete', time: '5h ago' },
    { id: 'ACT003', job: 'ORD004', user: 'Manufacturing Manager', action: 'Assigned to QC', time: '1d ago' },
    { id: 'ACT004', job: 'ORD001', user: 'Manufacturing Manager', action: 'Approved Job', time: '2d ago' },
    { id: 'ACT005', job: 'STK001', user: 'Artisan (Casting)', action: 'Accepted Job', time: '3d ago' },
];


export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
         <Button asChild>
          <Link href="/dashboard/jobs/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Job
          </Link>
        </Button>
      </div>
      
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
               <p className="text-xs text-muted-foreground">
                in the pipeline
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
          <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>An overview of the latest job updates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job ID</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentActivity.map(activity => (
                             <TableRow key={activity.id}>
                                <TableCell className="font-medium">{activity.job}</TableCell>
                                <TableCell>{activity.user}</TableCell>
                                <TableCell>{activity.action}</TableCell>
                                <TableCell className="text-right text-muted-foreground">{activity.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                 <CardDescription>Navigate to key areas of the application.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                 <Link href="/dashboard/jobs" className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div>
                        <div className="font-semibold">View Job Pipeline</div>
                        <div className="text-sm text-muted-foreground">Manage the end-to-end workflow</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                 </Link>
                 <Link href="/dashboard/users" className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div>
                        <div className="font-semibold">Manage Users</div>
                        <div className="text-sm text-muted-foreground">Add, edit, and view all system users</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                 </Link>
                  <Link href="/dashboard/settings" className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50">
                    <div>
                        <div className="font-semibold">Application Settings</div>
                        <div className="text-sm text-muted-foreground">Configure system parameters</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                 </Link>
              </CardContent>
          </Card>
      </div>

    </main>
  );
}
