"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push("/signin");
        } else {
            router.push("/")
        }
    }, [session, router]);

    return (
        <div className="flex items-center justify-center w-full h-screen">

            {children}

        </div>
    )
}
