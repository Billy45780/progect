import React from "react";
import "./App.css";
import { WelcomeMessage, UserCard, Card, Toggle, ConditionalMessage } from "./components/basic/BasicComponents.js";
import { Counter, LoginForm, ColorPicker, TodoList, SearchBox } from "./components/stateful/StatefulComponents.js";
import { CounterWithHooks, ThemeProvider, ThemeToggle, UserProfile, EffectDemo, LocalStorageCounter, FetchDemo } from "./components/hooks/HooksComponents.js";
import { Timer, WindowSizeTracker, DataFetcher } from "./components/lifecycle/LifecycleComponents";

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <header className="app-header">
          <h1>Практическая работа №15 — React</h1>
          <p>Изучение компонентов, состояния и хуков</p>
        </header>

        <main className="app-main">
          <Card title="📋 Функциональные компоненты">
            <WelcomeMessage name="Lama" age={21} />
            <UserCard
              user={{
                name: "Шахзода",
                email: "lamax.wer1@gmail.com",
                avatar: "https://i.pravatar.cc/100",
                isOnline: true
              }}
            />
            <Toggle>
              <ConditionalMessage status="success" />
            </Toggle>
          </Card>

          <Card title="⚡ Классовые компоненты с состоянием">
            <Counter />
            <LoginForm />
            <ColorPicker />
            <TodoList />
            <SearchBox />
          </Card>

          <Card title="⏰ Жизненный цикл компонентов">
            <Timer />
            <WindowSizeTracker />
            <DataFetcher userId={2} />
          </Card>

          <Card title="🎣 React Hooks">
            <CounterWithHooks />
            <UserProfile />
            <EffectDemo />
            <LocalStorageCounter />
            <FetchDemo />
            <ThemeToggle />
          </Card>
        </main>

        <footer className="app-footer">
          <p>Все компоненты работают корректно ✅</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}