import React from 'react';
import { View } from '../types';
import { LayoutDashboard, History, Plus, Target, CalendarDays } from 'lucide-react';

interface NavigationProps {
  currentView: View;
  onChange: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onChange }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t-[3px] border-black flex justify-between items-center shadow-hard-reverse z-30 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="w-full flex justify-between items-center px-4 py-1.5">
        <button
          onClick={() => onChange('dashboard')}
          className={`p-1.5 transition-all flex flex-col items-center border-[3px] ${currentView === 'dashboard'
            ? 'bg-primary border-black shadow-hard-sm -translate-y-1'
            : 'border-transparent hover:bg-black/5'
            }`}
        >
          <LayoutDashboard size={20} className={currentView === 'dashboard' ? 'text-black' : 'text-gray-500'} strokeWidth={currentView === 'dashboard' ? 3 : 2} />
        </button>

        <button
          onClick={() => onChange('history')}
          className={`p-1.5 transition-all flex flex-col items-center border-[3px] ${currentView === 'history'
            ? 'bg-primary border-black shadow-hard-sm -translate-y-1'
            : 'border-transparent hover:bg-black/5'
            }`}
        >
          <History size={20} className={currentView === 'history' ? 'text-black' : 'text-gray-500'} strokeWidth={currentView === 'history' ? 3 : 2} />
        </button>

        <button
          onClick={() => onChange('log')}
          className={`p-2 transition-all flex flex-col items-center border-[3px] rounded-full ${currentView === 'log'
            ? 'bg-teal-accent border-black shadow-hard -translate-y-2'
            : 'bg-accent-pink border-black hover:bg-teal-accent shadow-hard-sm'
            }`}
        >
          <Plus size={24} className="text-black" strokeWidth={3} />
        </button>

        <button
          onClick={() => onChange('goal-setup')}
          className={`p-1.5 transition-all flex flex-col items-center border-[3px] ${currentView === 'goal-setup'
            ? 'bg-primary border-black shadow-hard-sm -translate-y-1'
            : 'border-transparent hover:bg-black/5'
            }`}
        >
          <Target size={20} className={currentView === 'goal-setup' ? 'text-black' : 'text-gray-500'} strokeWidth={currentView === 'goal-setup' ? 3 : 2} />
        </button>

        <button
          onClick={() => onChange('yearly-overview')}
          className={`p-1.5 transition-all flex flex-col items-center border-[3px] ${currentView === 'yearly-overview'
            ? 'bg-primary border-black shadow-hard-sm -translate-y-1'
            : 'border-transparent hover:bg-black/5'
            }`}
        >
          <CalendarDays size={20} className={currentView === 'yearly-overview' ? 'text-black' : 'text-gray-500'} strokeWidth={currentView === 'yearly-overview' ? 3 : 2} />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;