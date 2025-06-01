'use client';
import { LogInIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  return (
    <button
      className="mx-auto flex w-52 cursor-pointer items-center justify-center gap-3 rounded-3xl bg-neutral-900 py-3 text-xs font-bold text-white"
      onClick={() => router.push('/login')}
    >
      <LogInIcon size={20} />
      Login to Saphala
    </button>
  );
}
