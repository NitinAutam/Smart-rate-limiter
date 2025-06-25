import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Rules from './pages/Rules';
import CreateEditRule from './pages/CreateEditRule.jsx';
import './index.css';
import React from 'react'; 


export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 bg-black-900 text-white p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/create" element={<CreateEditRule />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
