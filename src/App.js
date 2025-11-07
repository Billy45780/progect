import React from 'react';
import UserRegistrationForm from './UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './ContactFormUncontrolled';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Forms Demo</h1>
        <p>Управляемые и неуправляемые компоненты форм</p>
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <h2>Форма регистрации (управляемая)</h2>
          <UserRegistrationForm />
        </section>
        
        <section className="form-section">
          <h2>Форма обратной связи (неуправляемая)</h2>
          <ContactFormUncontrolled />
        </section>
      </main>
    </div>
  );
}

export default App;