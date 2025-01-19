import React, { useState } from 'react';
import { Bell, Trophy, Calendar, Horse, Settings } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Dashboard = ({ session }) => {
  const [activeCompetitions] = useState([
    { id: 1, name: 'Melbourne Cup Special', position: '1st' },
    { id: 2, name: 'Sydney Spring Carnival', position: '3rd' }
  ]);
  
  const [upcomingRaces] = useState([
    { id: 1, name: 'Race 1 - Flemington', time: '12:30 PM' },
    { id: 2, name: 'Race 2 - Randwick', time: '1:15 PM' }
  ]);
  
  const navItems = [
    { label: 'Form Guide', icon: <Horse className="w-5 h-5" />, path: '/form-guide' },
    { label: 'Winners Circle', icon: <Trophy className="w-5 h-5" />, path: '/leaderboard' },
    { label: 'Race Card', icon: <Calendar className="w-5 h-5" />, path: '/races' },
    { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' }
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4 fixed w-full top-0 z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Quaddie Challenge</h1>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 cursor-pointer" />
            <button onClick={handleSignOut} className="text-sm">Sign Out</button>
            <div className="w-8 h-8 rounded-full bg-gray-600" />
          </div>
        </div>
      </nav>

      <div className="pt-16 px-4 md:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-400">Active Competitions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-gray-400">Win Rate</p>
              </div>
            </div>
          </div>

          {/* Active Competitions Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Active Competitions</h3>
            <div className="space-y-4">
              {activeCompetitions.map((competition) => (
                <div key={competition.id} className="flex justify-between items-center">
                  <span>{competition.name}</span>
                  <span className="text-sm text-gray-400">{competition.position}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Races Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Races</h3>
            <div className="space-y-4">
              {upcomingRaces.map((race) => (
                <div key={race.id} className="flex justify-between items-center">
                  <span>{race.name}</span>
                  <span className="text-sm text-gray-400">{race.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 md:hidden">
          <div className="flex justify-around py-3">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
