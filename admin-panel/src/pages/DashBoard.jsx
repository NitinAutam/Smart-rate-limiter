import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRules: null,
    blockedRequests: null,
    activeServices: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with real backend endpoint
    axios.get('http://localhost:5000/stats')
      .then((res) => setStats(res.data))
      .catch(() => {
        // Fallback values for demo / offline
        setStats({
          totalRules: 8,
          blockedRequests: 1254,
          activeServices: 3,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Rules', key: 'totalRules' },
          { label: 'Blocked Requests', key: 'blockedRequests' },
          { label: 'Active Services', key: 'activeServices' },
        ].map(({ label, key }) => (
          <div key={key} className="bg-gray-800 p-6 rounded-xl shadow-md">
            <div className="text-sm uppercase text-gray-400 tracking-wider">{label}</div>
            <div className="mt-2 text-4xl font-bold text-blue-400">
              {loading ? '...' : stats[key]}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity (Simulated)</h2>
        <ul className="divide-y divide-gray-700">
          {[
            { time: '12:04 PM', action: 'Allowed', color: 'text-green-400' },
            { time: '11:22 AM', action: 'Blocked', color: 'text-red-400' },
            { time: '10:10 AM', action: 'Allowed', color: 'text-green-400' },
          ].map((entry, idx) => (
            <li key={idx} className="py-3 flex justify-between text-sm">
              <span>{entry.time}</span>
              <span className={entry.color}>{entry.action} request</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-500 text-xs mt-4 italic">* This is a placeholder preview. Real activity feed can be added via backend polling or WebSocket.</p>
      </div>
    </div>
  );
}
