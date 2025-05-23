'use client';
import Navbar from '@/components/ui/Navbar';
import Signup from '@/components/ui/Signup';

export default function Home() {
  return (
    <div className="max-w-screen">
      <Navbar />
      <Signup />
    </div>
  );
}
