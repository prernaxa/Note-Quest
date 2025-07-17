'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSignup = async () => {
    if (!name) return;

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const { userId } = await res.json();
      localStorage.setItem('userId', userId);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <input
          className="w-full mb-4 p-3 rounded bg-gray-800 border border-gray-600 text-white"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
