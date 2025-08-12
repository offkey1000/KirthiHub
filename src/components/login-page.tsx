
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gem, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


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


export function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const storedUsers = JSON.parse(sessionStorage.getItem('users') || 'null');
    const allUsers: User[] = storedUsers || initialUsers;

    // If session storage was empty, set it with initial users
    if (!storedUsers) {
        sessionStorage.setItem('users', JSON.stringify(allUsers));
    }
    
    const validUser = allUsers.find(user => user.code === code && user.status === 'Active');

    setTimeout(() => {
        if (validUser) {
          sessionStorage.setItem('loggedInUser', JSON.stringify(validUser));
          router.push('/dashboard');
        } else {
          toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: 'The unique code you entered is incorrect or the user is inactive.',
          });
          setIsLoading(false);
        }
    }, 500); // Simulate network delay
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Gem className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">JewelFlow</CardTitle>
          <CardDescription>
            Enter your unique code to access your dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unique-code">Unique Code</Label>
              <Input
                id="unique-code"
                required
                placeholder="Enter your code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <LogIn className="mr-2 h-4 w-4" />
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
