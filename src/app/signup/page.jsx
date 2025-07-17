'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const { userId } = await res.json();
      localStorage.setItem('userId', userId);
      router.push('/dashboard');
    } else {
      const err = await res.json();
      alert(err.error || 'Signup failed');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 bg-white bg-opacity-5 p-8 rounded-2xl shadow-2xl backdrop-blur">
        <h1 className="text-4xl font-extrabold text-center tracking-tight bg-gradient-to-r from-purple-800 to-pink-500 text-transparent bg-clip-text">
          Create Your Account
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded-xl border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-3 pr-12 rounded-xl border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-700 hover:text-purple-900"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-purple-800 text-white font-bold py-3 rounded-xl shadow-xl hover:scale-105 hover:bg-purple-900 transition-transform duration-300 flex items-center justify-center gap-2"
        >
          <UserPlus size={20} />
          Sign Up
        </button>
      </div>

      <footer className="text-sm text-gray-400 mt-10 text-center">
        Already have an account?{' '}
        <span
          className="underline cursor-pointer text-white hover:text-gray-300"
          onClick={() => router.push('/login')}
        >
          Sign In
        </span>
      </footer>
    </main>
  );
}
