'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '@/components/TopBar';
import UserCard from '@/components/UserCard';
import NoteForm from '@/components/NoteForm';
import NotesGrid from '@/components/NotesGrid';
import XPHistory from '@/components/XPHistory';
import { themes } from '@/lib/themes';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [prevLevel, setPrevLevel] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [note, setNote] = useState({ title: '', content: '' });
  const [notes, setNotes] = useState([]);
  const [theme, setTheme] = useState('violetGlow');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) setTheme(storedTheme);

    if (!userId) {
      router.push('/login');
      return;
    }

    async function fetchUser() {
      const res = await fetch(`/api/user/${userId}`);
      const data = await res.json();
      setUser(data);
      setPrevLevel(data.level);
    }

    async function fetchNotes() {
      const res = await fetch(`/api/notes/${userId}`);
      const data = await res.json();
      setNotes(data);
    }

    fetchUser();
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId || !note.title || !note.content) return;

    const isEditing = !!note._id;
    const res = await fetch(`/api/notes/${isEditing ? 'edit' : 'add'}`, {
      method: 'POST',
      body: JSON.stringify({ ...note, userId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const updatedUser = await res.json();

      if (user && updatedUser.level > user.level) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }

      setUser(updatedUser);
      setPrevLevel(updatedUser.level);
      setNote({ title: '', content: '' });

      const res2 = await fetch(`/api/notes/${userId}`);
      const data2 = await res2.json();
      setNotes(data2);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const res = await fetch(`/api/notes/delete`, {
      method: 'POST',
      body: JSON.stringify({ noteId, userId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);

      const res2 = await fetch(`/api/notes/${userId}`);
      const data2 = await res2.json();
      setNotes(data2);
    }
  };

  const handleReviewNote = async (noteId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const res = await fetch('/api/notes/review', {
      method: 'POST',
      body: JSON.stringify({ noteId, userId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const updatedUser = await res.json();

      if (user && updatedUser.level > user.level) {
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }

      setUser(updatedUser);
      setPrevLevel(updatedUser.level);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const themeClasses = themes?.[theme] ?? themes.violetGlow;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeClasses.background} text-white p-4`}>
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1.05 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg z-50 font-semibold text-lg"
          >
            🎉 Level Up! You're now Level {user?.level}
          </motion.div>
        )}
      </AnimatePresence>

      <TopBar theme={theme} onThemeChange={handleThemeChange} onLogout={handleLogout} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="col-span-1">
          <UserCard user={user} />
          {user && <XPHistory userId={user._id} />}
        </div>
        <div className="col-span-2 space-y-6">
          <NoteForm note={note} setNote={setNote} onSubmit={handleAddNote} themeClasses={themeClasses} />
          <NotesGrid notes={notes} setNote={setNote} onDelete={handleDeleteNote} onReview={handleReviewNote} />
        </div>
      </div>
    </div>
  );
}
