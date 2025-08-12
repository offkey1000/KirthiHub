
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
import { Sparkles } from 'lucide-react';

type User = {
  id: string;
  name: string;
  role: string;
  status: string;
  code?: string;
};

interface UserFormProps {
    user: User | null;
}

export function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code, setCode] = useState(user?.code || '');

  const isCreateMode = !user;

  const generateCode = () => {
    const length = Math.floor(Math.random() * 3) + 4; // 4, 5, or 6
    const newCode = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
    setCode(newCode);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCreateMode && (code.length < 4 || code.length > 6 || !/^\d+$/.test(code))) {
        toast({
            variant: 'destructive',
            title: 'Invalid Code',
            description: 'Login code must be a number between 4 and 6 digits.',
        });
        return;
    }

    setIsSubmitting(true);
    // In a real app, you'd handle form submission to your backend here
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: isCreateMode ? 'User Created' : 'User Updated',
      description: isCreateMode ? 'The new user has been created.' : `Details for ${user?.name} have been updated.`,
    });
    router.push('/dashboard/users');
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
        <CardTitle>{isCreateMode ? 'Create User' : 'Edit User'}</CardTitle>
        <CardDescription>
          {isCreateMode ? 'Fill out the form to create a new user.' : `Manage details for ${user.name}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user?.name} placeholder="e.g., John Doe" required />
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
                    <Select defaultValue={user?.status ?? 'Active'}>
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
                    <div className="flex gap-2">
                      <Input 
                        id="unique-code" 
                        value={isCreateMode ? code : '****'} 
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="4-6 digit code"
                        readOnly={!isCreateMode} 
                        disabled={!isCreateMode}
                        required
                        minLength={4}
                        maxLength={6}
                        pattern="\d{4,6}"
                      />
                      {isCreateMode && (
                        <Button type="button" variant="outline" onClick={generateCode}>
                          <Sparkles className="mr-2 h-4 w-4"/>
                          Generate
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {isCreateMode 
                            ? "Enter a 4-6 digit code or generate one." 
                            : "Login codes cannot be changed after creation."}
                    </p>
                </div>
            </div>
             <div className="flex justify-between pt-4">
                <div>
                    {!isCreateMode && (
                        <Button type="button" variant="destructive" onClick={handleDelete}>Delete User</Button>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => router.push('/dashboard/users')}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (isCreateMode ? 'Creating...' : 'Saving...') : (isCreateMode ? 'Create User' : 'Save Changes')}
                    </Button>
                </div>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
