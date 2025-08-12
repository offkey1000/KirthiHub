
'use client';

import { useParams, useRouter } from 'next/navigation';
import { UserForm } from '@/components/user-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteUserById } from '@/lib/user-storage';

type User = {
  id: string;
  name: string;
  role: string;
  status: string;
  code: string;
};

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const userId = params.id as string;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      const foundUser = getUserById(userId);
      setUser(foundUser as User | null);
    }
  }, [userId]);


  const handleUpdateUser = async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (user) {
        const updatedUserData = { ...user, ...data };
        updateUser(updatedUserData);

        toast({
            title: 'User Updated',
            description: `Details for ${data.name} have been updated.`,
        });
        router.push('/dashboard/users');
    }
  };

  const handleDeleteUser = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    deleteUserById(userId);

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
