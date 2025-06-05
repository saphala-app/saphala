import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Welcome, {session.user.name}!</h2>
        <p className="text-gray-600">
          This is your protected dashboard page. Only authenticated users can see this content.
        </p>
      </div>
    </div>
  );
}
