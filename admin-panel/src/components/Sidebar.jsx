import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Rules', path: '/rules' },
  { name: 'Create/Edit Rule', path: '/create' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 text-white flex flex-col p-6">
      <h2 className="text-xl font-bold mb-6">RATE LIMITING SDK</h2>
      <nav className="flex flex-col gap-4">
        {navItems.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className={`hover:text-blue-400 ${
              location.pathname === path ? 'text-blue-500 font-semibold' : ''
            }`}
          >
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
