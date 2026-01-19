
import React from 'react';
import { LayoutDashboard, Search, User, LogOut, Terminal } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'search' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'search' | 'profile') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="p-1.5 bg-emerald-500/10 rounded-lg">
              <Terminal className="text-emerald-500" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">DevOps<span className="text-emerald-500">Mastery</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-100'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('search')}
              className={`text-sm font-medium transition-colors ${activeTab === 'search' ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-100'}`}
            >
              Search
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all">
              <User size={18} className="text-slate-300" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around items-center h-16 px-4 z-50">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-emerald-500' : 'text-slate-500'}`}
        >
          <LayoutDashboard size={20} />
          <span className="text-[10px]">Home</span>
        </button>
        <button 
           onClick={() => setActiveTab('search')}
           className={`flex flex-col items-center gap-1 ${activeTab === 'search' ? 'text-emerald-500' : 'text-slate-500'}`}
        >
          <Search size={20} />
          <span className="text-[10px]">Search</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-emerald-500' : 'text-slate-500'}`}
        >
          <User size={20} />
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
