import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* You can add a navigation bar or other layout elements here */}
      <main>{children}</main>
    </div>
  );
}
