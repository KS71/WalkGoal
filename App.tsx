import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { AppState, View, WalkLog, Period, UserPreferences } from './types';
import { generateId } from './utils';
import Dashboard from './components/Dashboard';
import History from './components/History';
import LogWalk from './components/LogWalk';
import GoalSetup from './components/GoalSetup';
import Settings from './components/Settings';
import Navigation from './components/Navigation';
import YearlyOverview from './components/YearlyOverview';

// Initial Mock Data
const INITIAL_STATE: AppState = {
  goals: {
    week: 30,
    month: 120,
    year: 1000
  },
  goalHistory: [{
    date: new Date(2000, 0, 1).toISOString(), // A date far in the past as the default goal origin
    goals: { week: 30, month: 120, year: 1000 }
  }],
  activePeriod: 'week',
  logs: [],
  preferences: {
    theme: 'dark',
    notifications: true,
    units: 'km',
    weekStart: 'monday',
    timeFormat: '24h'
  }
};

const STORAGE_KEY = 'walkgoal_tracker_data_v1';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');

  // Initialize state from localStorage or fallback to INITIAL_STATE
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // Merge with INITIAL_STATE to ensure new properties (like preferences) exist if loading old data
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATE,
          ...parsed,
          preferences: { ...INITIAL_STATE.preferences, ...(parsed.preferences || {}) }
        };
      }
    } catch (e) {
      console.error("Failed to load from local storage", e);
    }
    return INITIAL_STATE;
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Effect to apply theme class to html element based on state.preferences.theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (state.preferences.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.preferences.theme]);

  const toggleTheme = () => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme: prev.preferences.theme === 'dark' ? 'light' : 'dark'
      }
    }));
  };

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...updates
      }
    }));
  };

  const handleAddWalk = (distance: number, dateString?: string) => {
    let logDate = new Date().toISOString();

    if (dateString) {
      const now = new Date();
      const selectedDate = new Date(dateString);
      selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
      logDate = selectedDate.toISOString();
    }

    const newLog: WalkLog = {
      id: generateId(),
      date: logDate,
      distance,
      duration: '0m 0s',
      title: 'New Walk',
      steps: Math.floor(distance * 1312)
    };

    setState(prev => ({
      ...prev,
      logs: [newLog, ...prev.logs]
    }));
    setView('dashboard');
  };

  const handleDeleteLog = (id: string) => {
    setState(prev => ({
      ...prev,
      logs: prev.logs.filter(log => log.id !== id)
    }));
  };

  const handleUpdateGoal = (period: Period, distance: number) => {
    setState(prev => {
      const newGoals = {
        ...prev.goals,
        [period]: distance
      };

      const newHistoryEntry = {
        date: new Date().toISOString(),
        goals: newGoals
      };

      return {
        ...prev,
        goals: newGoals,
        goalHistory: prev.goalHistory ? [...prev.goalHistory, newHistoryEntry] : [newHistoryEntry]
      };
    });
  };

  const handleSetPeriod = (period: Period) => {
    setState(prev => ({ ...prev, activePeriod: period }));
  };

  // --- Export / Import Logic ---
  // --- Export / Import Logic ---
  const handleExportData = async () => {
    const dataStr = JSON.stringify(state, null, 2);
    const fileName = `walk-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;

    if (Capacitor.isNativePlatform()) {
      try {
        // Write file to cache directory
        const result = await Filesystem.writeFile({
          path: fileName,
          data: dataStr,
          directory: Directory.Cache,
          encoding: Encoding.UTF8,
        });

        // Share the file
        await Share.share({
          title: 'Backup WalkGoal Data',
          text: 'Here is your backup file.',
          url: result.uri,
          dialogTitle: 'Save Backup'
        });
      } catch (e) {
        console.error('Export failed', e);
        alert('Export failed: ' + (e as any).message);
      }
    } else {
      // Web fallback
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', fileName);
      linkElement.click();
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        if (parsedData.logs && parsedData.goals) {
          // Handle migration if importing old backup without preferences
          const mergedData = {
            ...INITIAL_STATE,
            ...parsedData,
            preferences: { ...INITIAL_STATE.preferences, ...(parsedData.preferences || {}) }
          };
          setState(mergedData);
          setView('dashboard');
          alert('Backup restored successfully!');
        } else {
          alert('Invalid backup file format.');
        }
      } catch (error) {
        alert('Error reading backup file.');
        console.error(error);
      }
    };
    reader.readAsText(fileObj);
    event.target.value = '';
  };

  return (
    <div className="bg-background-light min-h-screen text-black font-display overflow-hidden">
      {/* Main Content Area */}
      <div className="max-w-md mx-auto relative min-h-screen bg-background-light shadow-2xl overflow-y-auto no-scrollbar border-x-4 border-black">

        {view === 'dashboard' && (
          <Dashboard
            state={state}
            setView={setView}
            setPeriod={handleSetPeriod}
            theme={state.preferences.theme}
            units={state.preferences.units}
            weekStart={state.preferences.weekStart}
          />
        )}
        {view === 'history' && (
          <History
            state={state}
            onDeleteLog={handleDeleteLog}
            setView={setView}
            units={state.preferences.units}
            timeFormat={state.preferences.timeFormat || '24h'}
          />
        )}

        {view === 'yearly-overview' && (
          <YearlyOverview
            state={state}
            units={state.preferences.units}
            weekStart={state.preferences.weekStart}
          />
        )}

        {/* Modals / Overlays */}
        {view === 'log' && (
          <LogWalk
            onCancel={() => setView('dashboard')}
            onSave={handleAddWalk}
            units={state.preferences.units}
            currentView={view}
            onChangeView={setView}
          />
        )}

        {view === 'goal-setup' && (
          <GoalSetup
            currentGoals={state.goals}
            defaultPeriod={state.activePeriod}
            onBack={() => setView('dashboard')}
            onSave={handleUpdateGoal}
            units={state.preferences.units}
            currentView={view}
            onChangeView={setView}
          />
        )}

        {view === 'settings' && (
          <Settings
            preferences={state.preferences}
            onToggleTheme={toggleTheme}
            onUpdatePreferences={updatePreferences}
            onExport={handleExportData}
            onImport={handleImportData}
            onBack={() => setView('dashboard')}
          />
        )}

        {/* Navigation Bar */}
        {view !== 'goal-setup' && view !== 'log' && <Navigation currentView={view} onChange={setView} />}
      </div>
    </div>
  );
};

export default App;