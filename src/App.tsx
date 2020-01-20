import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import Welcome from './pages/Welcome';
import LearnMore from './pages/LearnMore';
import SetupEnd from './pages/SetupEnd';
import AddFirstCommand from './pages/AddFirstCommand';
import MyCommands from './pages/MyCommands';
import Redirecting from './pages/Redirecting';
import SetupStart from './pages/SetupStart';
import Onboarding from './pages/Onboarding';

type TPage =
  | 'welcome'
  | 'welcome-step-2'
  | 'learn-more'
  | 'setup-start'
  | 'setup-end'
  | 'add-first-command'
  | 'my-commands'
  | 'redirecting';

const App: React.FC = () => {
  // const [mode, setMode] = useState<TPage>(
  //   sawWelcomePage
  //       ? 'setup-start'
  //       : 'welcome'
  //     : 'my-commands'
  // );

  // useEffect(() => {
  let mode;
  const params = new window.URLSearchParams(window.location.search);
  if (params.has('q')) {
    const query = params.get('q');
    if (query === 'example command') {
      mode = 'setup-end';
    } else {
      mode = 'redirecting';
    }
  } else {
    if (window.location.pathname === '/add-first-command') {
      mode = 'add-first-command';
    } else if (window.location.pathname === '/home') {
      mode = 'welcome';
    } else if (window.location.pathname === '/setup') {
      mode = 'setup-start';
    } else if (window.location.pathname === '/learn-more') {
      mode = 'learn-more';
    } else if (window.location.pathname === '/my-commands') {
      mode = 'my-commands';
    } else if (window.location.pathname === '/onboarding') {
      mode = 'onboarding';
    } else {
      // const tabCompletionEnabled = !!localStorage.getItem('tab-completion-enabled');
      // const sawWelcomePage = !!localStorage.getItem('saw-welcome-page');
      const skipWelcome = !!localStorage.getItem('skip-welcome');

      if (!skipWelcome) {
        mode = 'welcome';
      } else {
        mode = 'my-commands';
      }
    }
  }
  // }, []);

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        {mode === 'welcome' && <Welcome />}
        {mode === 'onboarding' && <Onboarding />}
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
