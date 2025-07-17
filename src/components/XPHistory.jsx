'use client';

import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function XPHistory({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!userId) return;
    async function fetchXPHistory() {
      const res = await fetch(`/api/user/${userId}/xp-history`);
      const data = await res.json();
      setHistory(data);
    }
    fetchXPHistory();
  }, [userId]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-yellow-400" />
        XP History
      </h2>

      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl max-h-72 overflow-y-auto shadow-inner">
        {history.length > 0 ? (
          <ul className="divide-y divide-white/10">
            {history
              .slice()
              .reverse()
              .map((entry, idx) => (
                <li key={idx} className="p-4 text-sm md:text-base flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <span
                      className={`font-bold ${
                        entry.amount > 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {entry.amount > 0 ? `+${entry.amount}` : entry.amount} XP
                    </span>{' '}
                    <span className="text-gray-300">
                      – {entry.action.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs mt-1 md:mt-0 md:text-sm">
                    {new Date(entry.timestamp).toLocaleString()}
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center p-4">No XP history yet.</p>
        )}
      </div>
    </div>
  );
}
