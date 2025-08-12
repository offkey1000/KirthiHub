
'use client';

import { useParams, useRouter } from 'next/navigation';
import { UserForm } from '@/components/user-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const users = [
  {
    id: 'USR001',
    name: 'Admin User',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 'USR002',
    name: 'Showroom Manager',
    role: 'Showroom Manager',
    status: 'Active',
  },
  {
    id: 'USR003',
    name: 'Manufacturing Manager',
    role: 'Manufacturing Manager',
    status: 'Active',
  },
  {
    id: 'USR004',
    name: 'Showroom Staff',
    role: 'Showroom Staff',
    status: 'Active',
  },
  {
    id: 'USR005',
    name: 'QC Manager',
    role: 'QC Manager',
    status: 'Active',
  },
  {
    id: 'USR006',
    name: 'CAD Artisan',
    role: 'Artisan (CAD)',
    status: 'Inactive',
  },
  {
    id: 'USR007',
    name: 'Casting Artisan',
    role: 'Artisan (Casting)',
    status: 'Active',
  },
];

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="flex-1 space-y-4 p-4 lg:p-6 flex flex-col items-center justify-center">
        <p>User not found.</p>
        <Button onClick={() => router.push('/dashboard/users')}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 lg:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold md:text-2xl">User Details</h1>
      </div>
      <UserForm user={user} />
    </div>
  );
}
