import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import styles from './App.module.scss';
import Welcome from './pages/Welcome';
import TabCompletion from './pages/TabCompletion';
import AddFirstCommand from './pages/AddFirstCommand';
import MyCommands from './pages/MyCommands';
import Redirecting from './pages/Redirecting';

type TPage =
  | 'welcome'
  | 'tab-completion'
  | 'add-first-command'
  | 'my-commands'
  | 'redirecting';

const App: React.FC = () => {
  // const [query, setQuery] = useState('');
  const tabCompletionEnabled = !!localStorage.getItem('tab-completion-enabled');
  const [mode, setMode] = useState<TPage>(
    !tabCompletionEnabled ? 'welcome' : 'my-commands'
  );

  // function handleChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
  //   setQuery(e.target.value);
  // }

  useEffect(() => {
    const params = new window.URLSearchParams(window.location.search);
    if (params.has('q')) {
      const query = params.get('q');
      if (query === 'example command') {
        setMode('tab-completion');
      } else {
        setMode('redirecting');
      }
    } else {
      if (window.location.pathname === '/add-first-command') {
        setMode('add-first-command');
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
        {mode === 'tab-completion' && <TabCompletion />}
        {mode === 'add-first-command' && <AddFirstCommand />}
        {mode === 'my-commands' && <MyCommands />}
        {mode === 'redirecting' && <Redirecting />}
      </main>
    </div>
  );
};

export default App;
