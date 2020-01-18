import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import Animation from '../../components/Animation';

export default function Welcome() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.setup}>
        <p>
          Welcome to f
          <sup className={styles.mutedText}>
            a
            <sup>
              s<sup>t</sup>
            </sup>
          </sup>
          ju.mp, first lets enable tab to search.
        </p>
        <p>
          To do that, simply <strong>hit enter.</strong>
        </p>
      </div>
      <form>
        <input
          ref={inputRef}
          name="q"
          className={styles.input}
          value="example command"
        />
      </form>
      <div className={styles.explaination}>
        <h1>What is f-jump</h1>
        <p>f-jump is web app that helps you navigate to sites faster.</p>
        <p>It does so by utilizing Chrome's tab-to-search feature.</p>
        <p>This should explain it:</p>
        <p>
          <Animation />
        </p>
      </div>
    </div>
  );
}
