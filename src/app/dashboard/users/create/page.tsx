
'use client';

import { UserForm } from '@/components/user-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const initialUsers = [
  {
    id: 'USR001',
    name: 'Admin User',
    role: 'Admin',
    status: 'Active',
    code: '4243',
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

export default function CreateUserPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateUser = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you'd get the ID from the backend. Here we generate one.
    const newUser = {
        ...data,
        id: `USR${Math.floor(Math.random() * 900) + 100}`
    };

    // Add user to session storage to persist across navigation
    const storedUsers = JSON.parse(sessionStorage.getItem('users') || '[]');
    const allUsers = storedUsers.length > 0 ? storedUsers : initialUsers;
    sessionStorage.setItem('users', JSON.stringify([...allUsers, newUser]));

    toast({
      title: 'User Created',
      description: `The user ${data.name} has been created.`,
    });
    router.push('/dashboard/users');
  };

  return (
    <div className="flex-1 space-y-4 p-4 lg:p-6">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold md:text-2xl">Create New User</h1>
      </div>
      <UserForm user={null} onSubmit={handleCreateUser} />
    </div>
  );
}
