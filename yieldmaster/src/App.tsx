import React from 'react';
import Dashboard from './Dashboard';
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to YieldMaster</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;
