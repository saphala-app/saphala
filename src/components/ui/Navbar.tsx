import React from 'react';
import { ModeToggle } from '../common/mode-toggle';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';
import { ImExit } from 'react-icons/im';

export default function Navbar() {
  const user = useSession();

  return (
    <div className="fixed top-0 z-50 m-5 flex w-full justify-between px-12">
      <h1 className="text-xl">Saphala App</h1>

      <div className="menu-right flex items-center gap-4">
        {user.data?.user ? (
          <div className="flex items-center gap-4">
            <Image
              src={user.data.user.image || '/next.svg'}
              className="rounded-full"
              width={40}
              height={40}
              alt="Picture of the author"
            />

            <Button variant="ghost" onClick={() => signOut()} className="flex items-center gap-4">
              Logout <ImExit className="size-6" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/signin">Login</Link>
            <Link href="/signup">
              <Button>Signup</Button>
            </Link>
          </div>
        )}

        <ModeToggle />
      </div>
    </div>
  );
}
