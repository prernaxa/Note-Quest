'use client';

import { LogOut, NotebookPen } from 'lucide-react';
import { motion } from 'framer-motion';
import { themes } from '@/lib/themes';

export default function TopBar({ theme, onThemeChange, onLogout }) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 text-3xl font-bold text-white">
        <NotebookPen size={28} />
        <span>NoteQuest</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {/* Theme Swatches */}
        <div className="flex items-center gap-2">
          {Object.entries(themes).map(([key, value]) => (
            
            <button
              key={key}
              title={value.label}
              onClick={() => onThemeChange(key)}
              className={`w-6 h-6 rounded-full border-2 border-white hover:scale-110 transition ${
                theme === key ? 'ring-2 ring-white' : ''
              }`}
              style={{
                background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                '--tw-gradient-from': value.background.split(' ')[0],
                '--tw-gradient-to': value.background.split(' ').slice(-1)[0],
                '--tw-gradient-stops': value.background.replace(/from-|via-|to-/g, '')
              }}
            />
            
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md shadow transition"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </motion.div>
  );
}
