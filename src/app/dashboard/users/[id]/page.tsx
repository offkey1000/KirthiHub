
'use client';

import { useParams, useRouter } from 'next/navigation';
import { UserForm } from '@/components/user-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { getUserById, updateUser, deleteUserById } from '@/lib/user-storage';
import { Skeleton } from '@/components/ui/skeleton';
import type { User } from '@/lib/schema';

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const userId = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getUserById(userId).then(foundUser => {
        setUser(foundUser);
        setLoading(false);
      });
    }
  }, [userId]);


  const handleUpdateUser = async (data: any) => {
    if (user) {
        const updatedUserData = { ...user, ...data };
        try {
            await updateUser(updatedUserData);
            toast({
                title: 'User Updated',
                description: `Details for ${data.name} have been updated.`,
            });
            router.push('/dashboard/users');
            router.refresh();
        } catch(error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to update user.'});
        }
    }
  };

  const handleDeleteUser = async () => {
    try {
        await deleteUserById(userId);
        toast({
          variant: 'destructive',
          title: 'User Deleted',
          description: `${user?.name} has been deleted.`,
        });
        router.push('/dashboard/users');
        router.refresh();
    } catch(error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete user.'});
    }
  };
  
  const FormSkeleton = () => (
    <div className="space-y-6">
        <Skeleton className="h-10 w-1/2" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
        </div>
        <div className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
            </div>
        </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 lg:p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
                <FormSkeleton />
            </CardContent>
        </Card>
      </div>
    );
  }


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
