'use client';

import { Pen, PlusCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function NoteForm({ note, setNote, onSubmit, themeClasses }) {
  const formRef = useRef(null);

  // Auto-scroll to form when editing a note
  useEffect(() => {
    if (note._id && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [note]);

  return (
    <motion.div
      ref={formRef}
      className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-30 z-0"
        animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>

      <div className="relative z-10">
        <motion.h2
          className="text-2xl font-semibold mb-4 flex items-center gap-2 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {note._id ? (
            <>
              <Pen size={20} /> Edit Note
            </>
          ) : (
            <>
              <PlusCircle size={20} /> Add a New Note
            </>
          )}
        </motion.h2>

        <input
          className="w-full p-3 mb-3 rounded-lg text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Enter note title..."
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />

        <textarea
          className="w-full p-3 mb-4 rounded-lg text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          rows={4}
          placeholder="Write your note here..."
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />

        <button
          onClick={onSubmit}
          className={`${themeClasses.button} px-5 py-2 rounded-xl font-semibold shadow-md transition hover:scale-105`}
        >
          {note._id ? 'Update Note' : 'Save Note'}
        </button>
      </div>
    </motion.div>
  );
}
