import React from 'react';
import styles from './index.module.scss';
import Animation from '../../components/Animation';
import Footer from '../../components/Footer';
import { useIsActiveUser } from '../../hooks';

export default function Welcome() {
  function handleStart() {
    localStorage.setItem('saw-welcome-page', 'true');
    window.location.pathname = '/onboarding';
  }

  const isActiveUser = useIsActiveUser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPane}>
        <h1>
          Welcome to f
          <sup className={styles.mutedText}>
            a
            <sup>
              s<sup>t</sup>
            </sup>
          </sup>
          jump
        </h1>
        <p>fjump is a web app that makes navigating to URLs faster.</p>
        <p>It does so utilizing Chrome's tab-to-search feature.</p>
        <div className={styles.actions}>
          <button className={styles.button} onClick={handleStart}>
            Got It, Let's Go!
          </button>
          <a href="/learn-more">Learn More</a>
        </div>
      </div>
      <div className={styles.rightPaneDesktop}>
        <Animation />
      </div>
      <div className={styles.rightPaneMobile}>
        fjump doesn't work on mobiles though, since there's no tab-to-search,
        but check it out once you get to your desktop!
      </div>
      {isActiveUser && <Footer />}
    </div>
  );
}
