'use client';

import { motion } from 'framer-motion';
import { Edit, Trash2, CheckCircle, BookOpen } from 'lucide-react';

export default function NotesGrid({ notes, setNote, onDelete, onReview }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-white">
        <BookOpen size={22} /> Your Notes
      </h2>

      {notes.length === 0 ? (
        <p className="text-gray-300">No notes yet! Add one to earn XP and level up.</p>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {notes.map((n) => (
            <motion.div
              key={n._id}
              className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-xl overflow-hidden"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-20 z-0"
                animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
              />

              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2 text-white">{n.title}</h3>
                <p className="text-sm text-gray-200 mb-4 line-clamp-4">{n.content}</p>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      setNote({ title: n.title, content: n.content, _id: n._id })
                    }
                    className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 text-sm rounded transition"
                  >
                    <Edit size={14} /> Edit
                  </button>

                  <button
                    onClick={() => onDelete(n._id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>

                  <button
                    onClick={() => onReview(n._id)}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded transition"
                  >
                    <CheckCircle size={14} /> Review
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
