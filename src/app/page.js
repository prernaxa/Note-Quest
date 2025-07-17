'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Swords, LogIn } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: 'easeOut',
    },
  }),
};

export default function LandingPage() {
  const router = useRouter();

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
      }}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 text-white px-4 py-10 flex flex-col items-center justify-between"
    >
      {/* Header */}
      <motion.header
        className="w-full flex justify-center mt-6"
        variants={fadeUp}
        custom={0.2}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center tracking-tight">
          NoteQuest
        </h1>
      </motion.header>

      {/* Tagline */}
      <motion.p
        className="text-base sm:text-lg md:text-xl text-center max-w-2xl mt-6 sm:mt-8 px-4 text-gray-200"
        variants={fadeUp}
        custom={0.4}
      >
        Turn your thoughts into XP. Level up by writing daily notes, editing ideas, and staying consistent. Productivity meets gamification.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-5"
        variants={fadeUp}
        custom={0.6}
      >
        <button
          onClick={() => router.push('/signup')}
          className="bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-xl shadow-xl hover:scale-105 hover:bg-yellow-300 transition-transform duration-300 flex items-center gap-2"
          aria-label="Sign Up and start your note-taking quest"
        >
          <Swords size={20} />
          Start Quest
        </button>

        <button
          onClick={() => router.push('/login')}
          className="bg-gray-800 bg-opacity-10 border border-white text-white font-semibold px-8 py-3 rounded-xl  hover:scale-105 hover:bg-opacity-20 transition duration-300 flex items-center gap-2"
          aria-label="Sign In to continue your progress"
        >
          <LogIn size={20} />
          Sign In
        </button>
      </motion.div>

      {/* XP Pulse Animation */}
      <motion.div
        className="absolute top-8 right-8 w-5 h-5 bg-yellow-400 rounded-full shadow-md"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />

      {/* Footer */}
      <motion.footer
        className="text-xs text-gray-400 mt-16 sm:mt-20 text-center"
        variants={fadeUp}
        custom={0.8}
      >
        © {new Date().getFullYear()} NoteQuest. Level up your mind.
      </motion.footer>
    </motion.main>
  );
}
