import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import Animation from '../../components/Animation';

export default function Welcome() {
  function handleStart() {
    localStorage.setItem('saw-welcome-page', 'true');
    window.location.pathname = '/setup';
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.explaination}>
        <h1>
          What is f
          <sup className={styles.mutedText}>
            a
            <sup>
              s<sup>t</sup>
            </sup>
          </sup>
          jump
        </h1>
        <p>fjump is web app that makes navigating to URLs faster.</p>
        <p>It does so by utilizing Chrome's tab-to-search feature.</p>
        <p>This should explain it:</p>
        <p>
          <Animation />
        </p>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleStart}>
          Got It, Lets Go!
        </button>
        <p>or</p>
        <a href="/learn-more">Learn More</a>
      </div>
    </div>
  );
}
