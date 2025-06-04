'use client';

import { useSession } from 'next-auth/react';
import LoginButton from './login-button';
import LogoutButton from './logout-button';

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-2">
      {session ? (
        <>
          {session.user?.name && (
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Welcome, {session.user.name}
            </span>
          )}
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
