import React from 'react';
import BasicHooks from './components/BasicHooks';
import AdvancedHooks from './components/AdvancedHooks';
import CustomHooks from './components/CustomHooks';
import HooksTests from './components/HooksTests';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Hooks Practice - PR16</h1>
        <p>Mastering React Hooks: Basic, Advanced, Custom Hooks and Testing</p>
      </header>

      <main className="App-main">
        <section className="section">
          <h2>Part 1: Basic Hooks</h2>
          <BasicHooks />
        </section>

        <section className="section">
          <h2>Part 2: Advanced Hooks</h2>
          <AdvancedHooks />
        </section>

        <section className="section">
          <h2>Part 3: Custom Hooks</h2>
          <CustomHooks />
        </section>

        <section className="section">
          <h2>Part 4: Hooks Testing</h2>
          <HooksTests />
        </section>
      </main>

      <footer className="App-footer">
        <p>Practical Work #16 - React Hooks</p>
      </footer>
    </div>
  );
}

export default App;