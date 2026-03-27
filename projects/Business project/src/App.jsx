import React from 'react'
import { Header } from './components/Header';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { BottomNav } from './components/BottomNav';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>

      <div className='max-w-8xl mx-auto  px-6 py-4 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700  overflow-hidden'>

        {/* Header */}

        <header className='hidden '>
          <Header/>
        </header>

        {/* Main */}

        <main className="pb-10 min-h-screen ">
          <Outlet/>
        </main>

        {/* Footer */}

        <footer>
          
        </footer>



        {/* Mobile Bottom Navigation */}
        <BottomNav />

        <Toaster/>

      </div>
    </AuthContextProvider>
    
  )
}

export default App;
