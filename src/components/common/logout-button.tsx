'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <Button
      variant="default"
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="flex items-center gap-2"
    >
      <LogOut className="size-4" />
      Logout
    </Button>
  );
}
