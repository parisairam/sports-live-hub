import React from 'react';
import { SportsColumn } from './components/SportsColumn';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Sports Live Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SportsColumn title="⚽ Soccer" theme="green" sport="soccer" />
        <SportsColumn title="🏏 Cricket" theme="blue" sport="cricket" />
        <SportsColumn title="🏎️ F1 Racing" theme="red" sport="f1" />
      </div>
    </div>
  );
}

export default App;
