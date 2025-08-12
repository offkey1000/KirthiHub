
'use client';

import { useEffect, useState } from 'react';
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

const initialUsers = [
  {
    id: 'USR001',
    name: 'Admin User',
    role: 'Admin',
    status: 'Active',
    code: '4243',
  },
];

type User = typeof initialUsers[0];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // On component mount, check if there's user data in session storage.
    const storedUsers = sessionStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // If no data in storage, initialize with mock data and save it.
      setUsers(initialUsers);
      sessionStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
        <Button asChild>
          <Link href="/dashboard/users/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New User
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>
            A list of all users in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === 'Active' ? 'secondary' : 'destructive'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/dashboard/users/${user.id}`}>
                        <ArrowUpRight className="h-4 w-4" />
                         <span className="sr-only">View User</span>
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
