
'use client';

import { useParams, useRouter } from 'next/navigation';
import { UserForm } from '@/components/user-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

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

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const userId = params.id;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // In a real app, this would be a fetch call.
    // For now, we simulate fetching from our mock data.
    // We also check session storage for any updates from the user list page.
    const storedUsers = JSON.parse(sessionStorage.getItem('users') || 'null');
    const allUsers = storedUsers || initialUsers;
    const foundUser = allUsers.find((u: User) => u.id === userId) || null;
    setUser(foundUser);
  }, [userId]);


  const handleUpdateUser = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user in session storage to persist across navigation
    const storedUsers = JSON.parse(sessionStorage.getItem('users') || 'null');
    const allUsers = storedUsers || initialUsers;
    const updatedUsers = allUsers.map((u: User) => 
        u.id === userId ? { ...u, ...data } : u
    );
    sessionStorage.setItem('users', JSON.stringify(updatedUsers));

    toast({
      title: 'User Updated',
      description: `Details for ${data.name} have been updated.`,
    });
    router.push('/dashboard/users');
  };

  const handleDeleteUser = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove user from session storage
    const storedUsers = JSON.parse(sessionStorage.getItem('users') || 'null');
    const allUsers = storedUsers || initialUsers;
    const updatedUsers = allUsers.filter((u: User) => u.id !== userId);
    sessionStorage.setItem('users', JSON.stringify(updatedUsers));

    toast({
      variant: 'destructive',
      title: 'User Deleted',
      description: `${user?.name} has been deleted.`,
    });
    router.push('/dashboard/users');
  };

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
      <UserForm user={user} onSubmit={handleUpdateUser} onDelete={handleDeleteUser} />
    </div>
  );
}
