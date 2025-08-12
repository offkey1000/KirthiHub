
'use client';

import { UserForm } from '@/components/user-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { addUser } from '@/lib/user-storage';

export default function CreateUserPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateUser = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser = {
        ...data,
        id: `USR${Math.floor(Math.random() * 900) + 100}`
    };

    addUser(newUser);

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
