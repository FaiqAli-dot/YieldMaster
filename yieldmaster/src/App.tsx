import React from 'react';
import Dashboard from './Dashboard';
import './App.css';  // Ensure this points to the correct path

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to YieldMaster</h1>
      </header>
      <main className="App-main">
        <Dashboard />
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 YieldMaster. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
