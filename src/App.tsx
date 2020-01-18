import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import styles from './App.module.scss';
import Welcome from './pages/Welcome';
import LearnMore from './pages/LearnMore';
import SetupEnd from './pages/SetupEnd';
import AddFirstCommand from './pages/AddFirstCommand';
import MyCommands from './pages/MyCommands';
import Redirecting from './pages/Redirecting';
import SetupStart from './pages/SetupStart';

type TPage =
  | 'welcome'
  | 'learn-more'
  | 'setup-start'
  | 'setup-end'
  | 'add-first-command'
  | 'my-commands'
  | 'redirecting';

const App: React.FC = () => {
  // const [query, setQuery] = useState('');
  const tabCompletionEnabled = !!localStorage.getItem('tab-completion-enabled');
  const sawWelcomePage = !!localStorage.getItem('saw-welcome-page');
  const [mode, setMode] = useState<TPage>(
    !tabCompletionEnabled
      ? sawWelcomePage
        ? 'setup-start'
        : 'welcome'
      : 'my-commands'
  );

  // function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
  //   setQuery(e.target.value);
  // }

  useEffect(() => {
    const params = new window.URLSearchParams(window.location.search);
    if (params.has('q')) {
      const query = params.get('q');
      if (query === 'example command') {
        setMode('setup-end');
      } else {
        setMode('redirecting');
      }
    } else {
      if (window.location.pathname === '/add-first-command') {
        setMode('add-first-command');
      } else if (window.location.pathname === '/setup') {
        setMode('setup-start');
      } else if (window.location.pathname === '/learn-more') {
        setMode('learn-more');
      } else if (window.location.pathname === '/my-commands') {
        setMode('my-commands');
      }
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <form onSubmit={handleSubmit}>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <main className={styles.main}>
        {mode === 'welcome' && <Welcome />}
        {mode === 'learn-more' && <LearnMore />}
        {mode === 'setup-start' && <SetupStart />}
        {mode === 'setup-end' && <SetupEnd />}
        {mode === 'add-first-command' && <AddFirstCommand />}
        {mode === 'my-commands' && <MyCommands />}
        {mode === 'redirecting' && <Redirecting />}
      </main>
    </div>
  );
};

export default App;
