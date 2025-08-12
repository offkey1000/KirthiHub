
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  name: string;
  role: string;
  status: string;
};

interface UserFormProps {
    user: User | null;
}

export function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // In a real app, you'd handle form submission to your backend here
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'User Updated',
      description: `Details for ${user?.name} have been updated.`,
    });
    setIsSubmitting(false);
  };
  
  const handleDelete = () => {
    if(confirm(`Are you sure you want to delete user ${user?.name}? This action cannot be undone.`)) {
        toast({
            variant: 'destructive',
            title: 'User Deleted',
            description: `${user?.name} has been deleted.`,
        });
        router.push('/dashboard/users');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user ? 'Edit User' : 'Create User'}</CardTitle>
        <CardDescription>
          {user ? `Manage details for ${user.name}`: 'Fill out the form to create a new user.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user?.name} placeholder="e.g., John Doe" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue={user?.role}>
                    <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Showroom Manager">Showroom Manager</SelectItem>
                        <SelectItem value="Manufacturing Manager">Manufacturing Manager</SelectItem>
                        <SelectItem value="Showroom Staff">Showroom Staff</SelectItem>
                        <SelectItem value="QC Manager">QC Manager</SelectItem>
                        <SelectItem value="Artisan (CAD)">Artisan (CAD)</SelectItem>
                        <SelectItem value="Artisan (Casting)">Artisan (Casting)</SelectItem>
                        <SelectItem value="Artisan (Filing)">Artisan (Filing)</SelectItem>
                        <SelectItem value="Artisan (Setting)">Artisan (Setting)</SelectItem>
                        <SelectItem value="Artisan (Polishing)">Artisan (Polishing)</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={user?.status}>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="unique-code">Unique Login Code</Label>
                    <Input id="unique-code" value="****" readOnly disabled/>
                    <p className="text-xs text-muted-foreground">Login codes are auto-generated and cannot be changed.</p>
                </div>
            </div>
             <div className="flex justify-between pt-4">
                <div>
                     <Button type="button" variant="destructive" onClick={handleDelete}>Delete User</Button>
                </div>
                <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => router.push('/dashboard/users')}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
