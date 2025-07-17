'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, CalendarDays, ArrowUpCircle } from 'lucide-react';

export default function UserCard({ user }) {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const prevLevel = useRef(user?.level);

  useEffect(() => {
    if (user && user.level > prevLevel.current) {
      setShowLevelUp(true);
      prevLevel.current = user.level;

      const timeout = setTimeout(() => setShowLevelUp(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [user]);

  if (!user) return <p className="text-white">Loading...</p>;

  // --- ✅ Updated XP progress logic ---
  const currentLevel = user.level;
  const xpForCurrentLevel = 100 * Math.pow(currentLevel - 1, 2);
  const xpForNextLevel = 100 * Math.pow(currentLevel, 2);
  const xpProgress = user.xp - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const xpPercent = Math.min(100, Math.round((xpProgress / xpNeeded) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg text-white overflow-hidden"
    >
      {/* Glow blob */}
      <motion.div
        className="absolute -top-12 -left-12 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 z-0"
        animate={{ x: [0, 10, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Level Up Badge */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="absolute top-2 right-4 bg-green-600 px-3 py-1 rounded-full text-white text-sm font-semibold flex items-center gap-2 shadow-lg z-10"
          >
            <ArrowUpCircle size={16} /> Level Up!
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Info */}
      <div className="relative z-10">
        <p className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Sparkles size={20} /> Welcome, {user.name}
        </p>
        <p>Level: <strong>{user.level}</strong></p>
        <p>
          XP: {user.xp} | <Flame size={16} className="inline" /> Streak: {user.dailyStreak}
        </p>
        <p className="text-sm text-gray-300 mt-1 mb-2">
          <CalendarDays size={14} className="inline mr-1" />
          Last Active: {new Date(user.lastActiveDate).toLocaleDateString()}
        </p>

        {/* XP Progress Bar */}
        <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden">
          <motion.div
            className="bg-green-400 h-4"
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="text-xs text-gray-300 mt-1">
          {xpProgress} / {xpNeeded} XP to next level
        </p>
      </div>
    </motion.div>
  );
}
