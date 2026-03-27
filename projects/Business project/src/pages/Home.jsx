import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { DashHeader } from '../components/DashHeader';
import { useAuth } from '../context/AuthContext';
import { Dashboard } from './Dashboard';

export const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ isLoggedIn,setIsLoggedIn ] = useState(false)


  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000); // update every 1s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative flex bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        {/* Page Content */}
        <div className="flex-1 flex flex-col capitalize items-center p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">{activeTab} Content</h2>
          <p>This is where the main content for the {activeTab} tab will go.</p>
        </div>
        <div className="flex-1">
          <Dashboard/>
        </div>
      </div>
    </div>
  );
};
