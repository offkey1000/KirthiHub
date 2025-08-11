import { Gem, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Gem className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline text-primary">
              JewelFlow
            </span>
          </Link>
          <Button variant="ghost" size="icon">
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">User menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
